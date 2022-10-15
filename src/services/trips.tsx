import { createContext, FC, ReactNode, useContext, useState } from "react";
import { nanoid } from "nanoid";

export enum TripItemType {
  FLIGHT = "FLIGHT",
  STAY = "STAY",
}

export interface Airport {
  name: string;
  iataCode: string;
}

export interface Flight {
  origin: Airport;
  destination: Airport;
  flightNumber: string | null;
  travelClass: string;
  isReturn: boolean;
  kilosCo2: number;
}

export interface FlightItem {
  id: string;
  type: TripItemType.FLIGHT;
  data: Flight;
}

export interface Accommodation {
  name: string;
  isSustainable: boolean;
}

export interface Stay {
  name: Accommodation;
  kilosCo2: number;
}

export interface StayItem {
  id: string;
  type: TripItemType.STAY;
  data: Stay;
}

export type Service = Flight | Stay;
export type TripItem = FlightItem | StayItem;

export const isFlightItem = (item: TripItem): item is FlightItem =>
  item.type === TripItemType.FLIGHT;

export const isStayItem = (item: TripItem): item is StayItem =>
  item.type === TripItemType.STAY;

export type ContextProps = {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  addFlight: (flight: Flight) => void;
  addStay: (stay: Stay) => void;
  removeItem: (id: string) => void;
};

const TripContext = createContext<ContextProps>({
  items: [],
  addItem: (item: TripItem) => {},
  addFlight: (flight: Flight) => {},
  addStay: (stay: Stay) => {},
  removeItem: (id: string) => {},
});

export const useTrip = () => useContext(TripContext);
export const TripConsumer = TripContext.Consumer;
export const TripProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TripItem[]>([]);

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

  return (
    <TripContext.Provider
      value={{ items, addItem, addFlight, addStay, removeItem }}
    >
      {children}
    </TripContext.Provider>
  );
};
