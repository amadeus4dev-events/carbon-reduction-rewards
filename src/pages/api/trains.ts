import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const AUTH_URL =
  "https://login.microsoftonline.com/04300fc2-8f04-4555-9a5d-c6fac7f23d0c/oauth2/token";
const CLIENT_ID = "77d144e8-d0d9-4d33-a20a-c0a86be8ca37";
const CLIENT_SECRET = "4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5";

const API_URL = "https://partner-test.api.chooose.today/v1";

const SUPPORTED_LOCATIONS = {
  AMSTERDAM: { lat: 52.3676, lng: 4.9041 },
  BARCELONA: { lat: 41.3874, lng: 2.1686 },
  MUNICH: { lat: 48.1351, lng: 11.5820 },
  LONDON: { lat: 51.5072, lng: 0.1276 },
};

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
      kilosCo2: Number | null;
      kilosCo2e: Number | null;
    }
  | ErrorData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let { origin = '', destination = '' } = req.query;
  origin = (origin as string).toUpperCase();
  destination = (destination as string).toUpperCase();

  if (!SUPPORTED_LOCATIONS[origin] || !SUPPORTED_LOCATIONS[destination]) {
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

  res.status(200).json(data);
}
