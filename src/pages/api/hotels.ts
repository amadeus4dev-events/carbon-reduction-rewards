import type { NextApiRequest, NextApiResponse } from 'next'
import Amadeus from 'amadeus'
import cheerio from 'cheerio'
import axios from 'axios'
import puppeteer from 'puppeteer'

const API_URL = 'https://test.api.amadeus.com/v1'
const CLIENT_ID = 'GWu6sdFyyykYZWs53yTHu8icwwJiCOHe'
const CLIENT_SECRET = '0UmFdNLUHlTHLJUa'

const TRIPADVISOR_SEARCH_URL = 'https://www.tripadvisor.com/Search?q='

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

function makeid (length = 64) {
  var result           = ''
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

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
  const { keyword, hotelName, location } = req.query

  // if a search term is present we are searching for a hotel
  if (keyword) {
    const { data }: { data: Array<SearchResult> } = await amadeus.referenceData.locations.hotel.get({ keyword, subType: 'HOTEL_LEISURE' })
    res.status(200).json(data)
    return
  }

  // Scrape TripAdvisor

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Get first result from search results page

  await page.goto(`${TRIPADVISOR_SEARCH_URL}${hotelName}${location}`)
  await page.waitForSelector('.result-card')

  const reviewUrl = await page.evaluate(resultsSelector => {
    const el = [...document.querySelectorAll(resultsSelector)][0]
    const onClickAttr = el.getAttribute('onClick')
    const url = onClickAttr.match(/\/Hotel_Review-.+\.html/)[0]
    return url
  }, '.result-card .result-title')

  // Get data from hotel review page

  res.status(200).json({})
}
