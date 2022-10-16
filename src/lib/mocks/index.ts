import { mean } from "simple-statistics";

import baseFlights from "./flights.json";
import baseStays from "./stays.json";
import baseTrainRides from "./trainRides.json";
import baseTrips from "./trips.json";
import basePeers from "./peers.json";

import {
  Flight,
  getNormalizedFlightEmissions,
  getNormalizedStayEmissions,
  getNormalizedTrainRideEmissions,
  getTripsEmissions,
  isFlightItem,
  Stay,
  TrainRide,
  Trip,
} from "../../services/trips";

export const flights: Flight[] = baseFlights;
export const stays: Stay[] = baseStays;
export const trainRides: TrainRide[] = baseTrainRides;

const samples = {
  FLIGHT: flights,
  STAY: stays,
  TRAIN_RIDE: trainRides,
};

// @ts-ignore
export const trips: Trip[] = baseTrips.map((trip) => ({
  ...trip,
  items: trip.items.map(({ index, ...item }) => ({
    ...item,
    // @ts-ignore
    data: samples[item.type][index],
  })),
}));

export const peers: Trip[][] = basePeers.map((indices) =>
  indices.map((index) => trips[index])
);

const averageEmissions = mean(peers.map((trips) => getTripsEmissions(trips)));
const averageNumTrips = mean(peers.map((trips) => trips.length));

const isNumber = (val: number | null): val is number => val !== null;
const aggregateMean = (values: number[]) =>
  values.length > 0 ? mean(values) : null;

const normalizedFlightEmissions = aggregateMean(
  peers.map((trips) => getNormalizedFlightEmissions(trips)).filter(isNumber)
);

const normalizedStayEmissions = aggregateMean(
  peers.map((trips) => getNormalizedStayEmissions(trips)).filter(isNumber)
);

const normalizedTrainRideEmissions = aggregateMean(
  peers.map((trips) => getNormalizedTrainRideEmissions(trips)).filter(isNumber)
);

export const peerStatistics = {
  averageEmissions,
  averageNumTrips,
  normalizedFlightEmissions,
  normalizedStayEmissions,
  normalizedTrainRideEmissions,
};
