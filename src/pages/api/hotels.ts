import type { NextApiRequest, NextApiResponse } from 'next'
import Amadeus from 'amadeus'

const API_URL = 'https://test.api.amadeus.com/v1'
const CLIENT_ID = 'GWu6sdFyyykYZWs53yTHu8icwwJiCOHe'
const CLIENT_SECRET = '0UmFdNLUHlTHLJUa'

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

type SearchResult = {
  name: string,
  iataCode: string,
  cityName: string,
  countryCode: string,
}

type SustainabilityResult = {}

type ResponseData = Array<SearchResult> | SustainabilityResult

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { keyword } = req.query

  // if a search term is present we are searching for a hotel
  if (keyword) {
    const { data }: { data: Array<SearchResult> } = await amadeus.referenceData.locations.hotel.get({ keyword, subType: 'HOTEL_LEISURE' })
    res.status(200).json(data)
    return
  // otherwise we have a hotel, so pull hotel sustainability score
  } else {

  }

  res.status(200).json({})
}
