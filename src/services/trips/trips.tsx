import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import createPersistedState from "use-persisted-state";
import { nanoid } from "nanoid";
import { mean } from "simple-statistics";
import {
  TripItem,
  Trip,
  isFlightItem,
  isStayItem,
  isTrainRideItem,
} from "./types";
import { getTripEmissions } from "./trip";

export type TripsContextProps = {
  trips: Trip[];
  addTrip: (items: TripItem[]) => void;
  removeTrip: (id: string) => void;
  clear: () => void;
};

const TripsContext = createContext<TripsContextProps>({
  trips: [],
  addTrip: (items: TripItem[]) => {},
  removeTrip: (id: string) => {},
  clear: () => {},
});

const useTripsState = createPersistedState<Trip[]>("trips");
export const useTrips = () => useContext(TripsContext);

export const TripsConsumer = TripsContext.Consumer;
export const TripsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [baseTrips, setTrips] = useTripsState([]);

  // Prevent Hydration Issues
  const [isReady, setIsReady] = useState(false);
  const trips = isReady ? baseTrips : [];
  useEffect(() => {
    setIsReady(true);
  }, []);

  const addTrip = (items: TripItem[]) =>
    setTrips([...trips, { id: nanoid(), items }]);

  const removeTrip = (id: string) =>
    setTrips(trips.filter((trip) => trip.id !== id));

  const clear = () => setTrips([]);

  return (
    <TripsContext.Provider value={{ trips, addTrip, removeTrip, clear }}>
      {children}
    </TripsContext.Provider>
  );
};

export const getTripsEmissions = (trips: Trip[]) =>
  trips.reduce((sum, trip) => sum + getTripEmissions(trip.items), 0);

const selectTripItems = (trips: Trip[]) => trips.flatMap((trip) => trip.items);

export const getNormalizedFlightEmissions = (trips: Trip[]) => {
  const flightItems = selectTripItems(trips).filter(isFlightItem);
  return flightItems.length === 0
    ? null
    : mean(
        flightItems.map(({ data: flight }) => flight.kilosCo2 / flight.distance)
      );
};

export const getNormalizedStayEmissions = (trips: Trip[]) => {
  const stayItems = selectTripItems(trips).filter(isStayItem);
  return stayItems.length === 0
    ? null
    : mean(stayItems.map(({ data: stay }) => stay.kilosCo2 / stay.nights));
};

export const getNormalizedTrainRideEmissions = (trips: Trip[]) => {
  const trainRideItems = selectTripItems(trips).filter(isTrainRideItem);
  return trainRideItems.length === 0
    ? null
    : mean(
        trainRideItems.map(
          ({ data: trainRide }) => trainRide.kilosCo2 / trainRide.distance
        )
      );
};
