import { mean } from "simple-statistics";

import baseFlights from "./flights.json";
import baseStays from "./stays.json";
import baseTrainRides from "./trainRides.json";
import baseTrips from "./trips.json";
import basePeers from "./peers.json";

import {
  Flight,
  getMeanFlightEmissions,
  getMeanStayEmissions,
  getMeanTrainRideEmissions,
  getMeanTransportEmissions,
  getTripsEmissions,
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

const meanTransportEmissionsList = peers
  .map((trips) => getMeanTransportEmissions(trips))
  .filter(isNumber);
const meanTransportEmissions = aggregateMean(meanTransportEmissionsList);

const meanFlightEmissionsList = peers
  .map((trips) => getMeanFlightEmissions(trips))
  .filter(isNumber);
const meanFlightEmissions = aggregateMean(meanFlightEmissionsList);

const meanStayEmissionsList = peers
  .map((trips) => getMeanStayEmissions(trips))
  .filter(isNumber);
const meanStayEmissions = aggregateMean(meanStayEmissionsList);

const meanTrainRideEmissionsList = peers
  .map((trips) => getMeanTrainRideEmissions(trips))
  .filter(isNumber);

const meanTrainRideEmissions = aggregateMean(meanTrainRideEmissionsList);

const normalizeValue = (value: number | null, values: number[]) => {
  if (value === null || values.length === 0) {
    return 0;
  }

  const min = Math.min(value, ...values);
  const max = Math.max(value, ...values);

  return (value - min) / (max - min);
};

export const getSustainabilityScore = (
  meanFlightEmissions: number | null,
  meanStayEmissions: number | null,
  meanTrainRideEmissions: number | null
) => {
  const normalizeFlightEmissions = normalizeValue(
    meanFlightEmissions,
    meanFlightEmissionsList
  );
  const normalizeStayEmissions = normalizeValue(
    meanStayEmissions,
    meanStayEmissionsList
  );
  const normalizeTrainRideEmissions = normalizeValue(
    meanTrainRideEmissions,
    meanTrainRideEmissionsList
  );

  const score =
    (normalizeFlightEmissions || 0.5) * 0.5 +
    (normalizeStayEmissions || 0.5) * 0.3 +
    (normalizeTrainRideEmissions || 0.5) * 0.2;
  return Math.trunc(score * 100);
};

const meanSustainabilityScoreList = peers.map((trips) =>
  getSustainabilityScore(
    getMeanFlightEmissions(trips),
    getMeanStayEmissions(trips),
    getMeanTrainRideEmissions(trips)
  )
);
const meanSustainabilityScore = aggregateMean(meanSustainabilityScoreList);

export const peerStatistics = {
  averageEmissions,
  averageNumTrips,
  meanFlightEmissions,
  meanStayEmissions,
  meanTrainRideEmissions,
  meanSustainabilityScore,
  meanTransportEmissions,
};

export const getTravelerTier = (relativePerformance: number | null) => {
  if (relativePerformance === null) {
    return {
      name: "n/a",
      color: "inherit",
      description: "Start adding your trips",
      reward: "0 €",
    };
  }

  if (relativePerformance < -0.8) {
    return {
      name: "Greta",
      color: "green-500",
      description: "You are basically Greta Thunberg",
      reward: "250 €",
    };
  }

  if (relativePerformance < -0.6) {
    return {
      name: "Platinum",
      color: "stone-500",
      description: "You are one of the most green travelers",
      reward: "150 €",
    };
  }

  if (relativePerformance < -0.4) {
    return {
      name: "Gold",
      color: "yellow-500",
      description: "You lead by example",
      reward: "100 €",
    };
  }

  if (relativePerformance < -0.2) {
    return {
      name: "Silver",
      color: "stone-700",
      description: "You are making an effort",
      reward: "50 €",
    };
  }

  if (relativePerformance < -0.0) {
    return {
      name: "Bronze",
      color: "orange-700",
      description: "You are a concious traveler",
      reward: "25 €",
    };
  }

  return {
    name: "Participant",
    color: "inherit",
    description: "Hey, at least your tracking your emissions",
    reward: "0 €",
  };
};

export const relativePerformance = (
  value: number | null,
  average: number | null
) => (value && average ? value / average - 1 : null);

export const getTravelerStatistics = (trips: Trip[]) => {
  const meanTransportEmissions = getMeanTransportEmissions(trips);
  const relativeTransportPerformance = relativePerformance(
    meanTransportEmissions,
    peerStatistics.meanTransportEmissions
  );
  const relativeTier = getTravelerTier(relativeTransportPerformance);
  const emissions = getTripsEmissions(trips);
  const numTrips = trips.length;
  const relativeEmissionsPerformance = relativePerformance(
    emissions,
    peerStatistics.averageEmissions
  );
  const relativeNumTripsPerformance = relativePerformance(
    numTrips,
    peerStatistics.averageNumTrips
  );
  const absoluteTier = getTravelerTier(relativeEmissionsPerformance);

  return {
    meanTransportEmissions,
    relativeTransportPerformance,
    relativeTier,
    emissions,
    numTrips,
    relativeEmissionsPerformance,
    relativeNumTripsPerformance,
    absoluteTier,
  };
};
