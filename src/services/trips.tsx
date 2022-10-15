import { createContext, FC, ReactNode, useContext, useState } from "react";

export interface Airport {
  name: string;
  iataCode: string;
}

export interface Flight {
  id: string;
  origin: Airport;
  destination: Airport;
  flightNumber: string | null;
  travelClass: string;
  isReturn: boolean;
  kilosCo2: number;
}

export interface Accommodation {
  name: string;
  isSustainable: boolean;
}

export interface Stay {
  id: string;
  name: Accommodation;
}

export type TripItem = Flight | Stay;

export type ContextProps = {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  removeItem: (id: string) => void;
};

const TripContext = createContext<ContextProps>({
  items: [],
  addItem: (item: TripItem) => {},
  removeItem: (id: string) => {},
});

export const useTrip = () => useContext(TripContext);
export const TripConsumer = TripContext.Consumer;
export const TripProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TripItem[]>([]);

  const addItem = (item: TripItem) => setItems([...items, item]);

  const removeItem = (id: string) =>
    setItems(items.filter((item) => item.id !== id));

  return (
    <TripContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </TripContext.Provider>
  );
};
