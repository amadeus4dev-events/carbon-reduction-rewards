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
import {
  Flight,
  isFlightItem,
  isStayItem,
  Stay,
  StayItem,
  TripItem,
  TripItemType,
} from "./types";

export type TripContextProps = {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  addFlight: (flight: Flight) => void;
  addStay: (stay: Stay) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const TripContext = createContext<TripContextProps>({
  items: [],
  addItem: (item: TripItem) => {},
  addFlight: (flight: Flight) => {},
  addStay: (stay: Stay) => {},
  removeItem: (id: string) => {},
  clear: () => {},
});

const useTripState = createPersistedState<TripItem[]>("trip");
export const useTrip = () => useContext(TripContext);

export const TripConsumer = TripContext.Consumer;
export const TripProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [baseItems, setItems] = useTripState([]);

  // Prevent Hydration Issues
  const [isReady, setIsReady] = useState(false);
  const items = isReady ? baseItems : [];
  useEffect(() => {
    setIsReady(true);
  }, []);

  const addItem = (item: TripItem) => setItems([...items, item]);
  const addFlight = (flight: Flight) =>
    setItems([
      ...items,
      { id: nanoid(), type: TripItemType.FLIGHT, data: flight },
    ]);
  const addStay = (stay: Stay) =>
    setItems([...items, { id: nanoid(), type: TripItemType.STAY, data: stay }]);

  const removeItem = (id: string) =>
    setItems(items.filter((item) => item.id !== id));

  const clear = () => setItems([]);

  return (
    <TripContext.Provider
      value={{ items, addItem, addFlight, addStay, removeItem, clear }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const getTripName = (items: TripItem[]) => {
  if (items.length === 0) {
    return "Empty Trip";
  }

  const item = items[0];

  if (isFlightItem(item)) {
    return `From ${item.data.origin.name} to ${item.data.destination.name}`;
  } else {
    return `Trip to ${item.data.accommodation.city}`;
  }
};

export const getTripSummary = (items: TripItem[]) => {
  if (items.length === 0) {
    return "Empty Trip";
  }

  const numFlights = items.filter((item) => isFlightItem(item)).length;
  const stayItems = items.filter((item) => isStayItem(item)) as StayItem[];
  const numNights = stayItems.reduce(
    (numNights, item) => numNights + item.data.nights,
    0
  );

  const summaryItems = [];

  if (numFlights === 1) {
    summaryItems.push("1 flight");
  } else if (numFlights > 1) {
    summaryItems.push(`${numFlights} flights`);
  }

  if (numNights === 1) {
    summaryItems.push("1 night");
  } else if (numNights > 1) {
    summaryItems.push(`${numNights} nights`);
  }

  return summaryItems.join(" · ");
};

export const getTripEmissions = (items: TripItem[]) =>
  items.reduce((kilos, item) => kilos + item.data.kilosCo2, 0);
