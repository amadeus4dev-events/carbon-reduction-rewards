import distances from "./distances";

type Distances = typeof distances;
type DistancesKeys = keyof Distances;

const isLookup = (lookup: string): lookup is DistancesKeys =>
  lookup in distances;

const getDistance = (firstIataCode: string, secondIataCode: string) => {
  const pair = [firstIataCode, secondIataCode];
  pair.sort();

  const lookup = `${pair[0]}${pair[1]}`;

  if (isLookup(lookup)) {
    return distances[lookup];
  }

  return 0.0;
};

export default getDistance;
