import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import airports from "../../lib/airports";

const AUTH_URL =
  "https://login.microsoftonline.com/04300fc2-8f04-4555-9a5d-c6fac7f23d0c/oauth2/token";
const CLIENT_ID = "77d144e8-d0d9-4d33-a20a-c0a86be8ca37";
const CLIENT_SECRET = "4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5";

const API_URL = "https://partner-test.api.chooose.today/v1";

const AVERAGE_KG_PER_KM = 0.016065;
// const SUPPORTED_LOCATIONS = {
//   AMSTERDAM: { lat: 52.3676, lng: 4.9041 },
//   BARCELONA: { lat: 41.3874, lng: 2.1686 },
//   MUNICH: { lat: 48.1351, lng: 11.582 },
//   LONDON: { lat: 51.5072, lng: 0.1276 },
// };

type Locations = { [k: string]: { lat: number; lng: number } };

const SUPPORTED_LOCATIONS = airports.reduce<Locations>(
  (acc, { cityName, latitude, longitude }) => {
    acc[cityName] = { lat: latitude, lng: longitude };
    return acc;
  },
  {}
);

async function authenticate() {
  const {
    data: { access_token: token },
  } = await axios.post(
    AUTH_URL,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      resource: "https://partner-test.api.chooose.today",
    })
  );

  return token;
}

type ErrorData = {
  msg: string;
};

type ResponseData =
  | {
      distance: number;
      kilosCo2: number;
    }
  | ErrorData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let { origin = "", destination = "", isReturn = false } = req.query;
  // origin = (origin as string).toUpperCase();
  // destination = (destination as string).toUpperCase();

  if (
    typeof origin !== "string" ||
    typeof destination !== "string" ||
    !SUPPORTED_LOCATIONS[origin] ||
    !SUPPORTED_LOCATIONS[destination]
  ) {
    res
      .status(400)
      .json({ msg: "Please specify origin and destination stations" });
    return;
  }

  const token = await authenticate();

  const endpoint = `${API_URL}/footprint/trains/specific/VYNO1S35`;

  const { data } = await axios.get(endpoint, {
    params: {
      fromLat: SUPPORTED_LOCATIONS[origin].lat,
      fromLong: SUPPORTED_LOCATIONS[origin].lng,
      toLat: SUPPORTED_LOCATIONS[destination].lat,
      toLong: SUPPORTED_LOCATIONS[destination].lng,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const multiplier = Number(isReturn) + 1;
  let kilosCo2 = data.kilosCo2 ?? data.kilosCo2e ?? data.km * AVERAGE_KG_PER_KM;
  kilosCo2 = kilosCo2 * multiplier;

  res.status(200).json({ ...data, kilosCo2: kilosCo2, distance: data.km });
}
