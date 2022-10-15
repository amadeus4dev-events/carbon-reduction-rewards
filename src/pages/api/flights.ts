import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const AUTH_URL =
  "https://login.microsoftonline.com/04300fc2-8f04-4555-9a5d-c6fac7f23d0c/oauth2/token";
const CLIENT_ID = "77d144e8-d0d9-4d33-a20a-c0a86be8ca37";
const CLIENT_SECRET = "4~RT84Bbj4q~RQ0tL.hE_DXUGDaj1DdWb5";

const API_URL = "https://partner-test.api.chooose.today/v1";

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
      kilosCo2: Number;
      kilosCo2e: Number;
    }
  | ErrorData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    origin,
    destination,
    flightNumber,
    travelClass = "business",
    passengers = 1,
    roundTrip = false,
  } = req.query;
  if (!origin || !destination) {
    res
      .status(400)
      .json({ msg: "Please specify origin and destination iata codes" });
    return;
  }

  const token = await authenticate();

  let endpoint = `${API_URL}/footprint/flights/route/${origin}/${destination}`;
  if (flightNumber) {
    endpoint = `${API_URL}/footprint/flights/${origin}/${destination}/${flightNumber}`;
  }

  const { data } = await axios.get(endpoint, {
    params: {
      travelClass,
      passengers,
      roundTrip,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  res.status(200).json(data);
}
