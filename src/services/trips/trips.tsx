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
import { TripItem, Trip } from "./types";

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
