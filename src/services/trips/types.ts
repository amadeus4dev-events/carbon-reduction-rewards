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
  city: string;
  country: string;
  isSustainable: boolean;
}

export interface Stay {
  accommodation: Accommodation;
  nights: number;
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

export type Trip = {
  id: string;
  items: TripItem[];
};
