import type { NextApiRequest, NextApiResponse } from "next";
import Amadeus from "amadeus";
import puppeteer from "puppeteer";
import baseHotelsDataset from "../../../data/M1HotelSustainabilityBenchmarkingIndex2021.json";
import { InferenceSession, Tensor } from "onnxruntime-node";

interface HotelDatasetItem {
  Location: string;
  ["All HotelsMedian"]: string | number;
}

const hotelsDataset: HotelDatasetItem[] = baseHotelsDataset;

const AVERAGE_EMISSIONS = 27.88;

const API_URL = "https://test.api.amadeus.com/v1";
const CLIENT_ID = "GWu6sdFyyykYZWs53yTHu8icwwJiCOHe";
const CLIENT_SECRET = "0UmFdNLUHlTHLJUa";

const TRIPADVISOR_SEARCH_URL = "https://www.tripadvisor.com/Search?q=";

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

export type SearchResult = {
  id: number;
  name: string;
  iataCode: string;
  address: {
    cityName: string;
    countryCode: string;
  };
};

export type SustainabilityResult = {
  isSustainable: boolean;
  kilosCo2PerNight: number;
};

type ErrorResponse = {
  msg: string;
};

type ResponseData = Array<SearchResult> | SustainabilityResult | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { keyword, hotelName, cityName } = req.query;

  // If a search term is present we are searching for a hotel
  if (keyword) {
    try {
      const { data }: { data: Array<SearchResult> } =
        await amadeus.referenceData.locations.hotel.get({
          keyword,
          subType: "HOTEL_LEISURE",
        });

      res.status(200).json(data);
      return;
    } catch {
      res.status(404).json({ msg: "Unable to find hotels for this city" });
      return;
    }
  }

  if (typeof cityName !== "string") {
    res.status(400).json({ msg: "location parameter not provided" });
    return;
  }

  // Get carbon footprint for city from Cornell dataset
  const entry = hotelsDataset.find(
    (hotel) => hotel.Location.toUpperCase() === cityName.toUpperCase()
  );
  const kilosCo2PerNight =
    entry && typeof entry["All HotelsMedian"] === "number"
      ? entry["All HotelsMedian"]
      : AVERAGE_EMISSIONS;

  // Scrape TripAdvisor

  // FRED: Commented out for now, since this part of the code requires a headless chrome installation. Maybe we can use an API for this?

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // // Get first result from search results page

  // await page.goto(`${TRIPADVISOR_SEARCH_URL}${hotelName}${location}`);
  // await page.waitForSelector(".result-card");

  // const reviewUrl = await page.evaluate((resultsSelector) => {
  //   const el = [...document.querySelectorAll(resultsSelector)][0];
  //   const onClickAttr = el.getAttribute("onClick");
  //   const url = onClickAttr.match(/\/Hotel_Review-.+\.html/)[0];
  //   return url;
  // }, ".result-card .result-title");

  // Get data from hotel review page

  // TODO scrape hotel from review page
  // The process is as follows:
  //     1) const page = await browser.newPage();
  //     2) await page.goto(`https://tripadvisor.com${reviewUrl}`);
  //     3) Use selectors in order to get the correct data. There are a total of
  //        102 datapoints to collect! The full scraping code is available in
  //        Python here: https://github.com/felixjhoffmann/SustainableTourism/blob/main/Code/Scraping_Listings.ipynb

  // Infer hotel label if not present on review page

  const ortSession = await InferenceSession.create("./data/model.onnx");
  // TODO the data array should be replaced with scraped TripAdvisor data
  const data = [
    2.0, 3.5, 19.0, 73.0, 0, 1, 14.0, 36, 0.0, 0.0, 4.0, 19.0, 0.0, 66, 32, 10,
    6, 5, 13, 3, 3, 45.0, 40.0, 40.0, 40.0, 61.0, 23.0, 3.0, 149.0, 0.0, 0.0, 5,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 162, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 67, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.7012987012987013,
    0.6212121212121212, 0.0,
  ];
  const feeds = { float_input: new Tensor("float32", data, [1, 102]) };
  const results = await ortSession.run(feeds);

  const isSustainable = results.label.data[0] == 1;

  res.status(200).json({ isSustainable, kilosCo2PerNight });
}
