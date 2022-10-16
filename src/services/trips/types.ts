export enum TripItemType {
  FLIGHT = "FLIGHT",
  STAY = "STAY",
  TRAIN_RIDE = "TRAIN_RIDE",
}

export interface Airport {
  name: string;
  iataCode: string;
  cityName: string;
  countryName: string;
  countryIsoCode: string;
  latitude: number;
  longitude: number;
}

export interface Flight {
  origin: Airport;
  destination: Airport;
  flightNumber: string | null;
  travelClass: string;
  isReturn: boolean;
  distance: number;
  kilosCo2: number;
}

export interface FlightItem {
  id: string;
  type: TripItemType.FLIGHT;
  data: Flight;
}

export interface Accommodation {
  name: string;
  cityName: string;
  countryName: string;
  countryIsoCode: string;
  isSustainable: boolean;
  kilosCo2PerNight: number;
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

export interface TrainRide {
  origin: Airport;
  destination: Airport;
  isReturn: boolean;
  distance: number;
  kilosCo2: number;
}

export interface TrainRideItem {
  id: string;
  type: TripItemType.TRAIN_RIDE;
  data: TrainRide;
}

export type Service = Flight | Stay | TrainRide;
export type TripItem = FlightItem | StayItem | TrainRideItem;

export const isFlightItem = (item: TripItem): item is FlightItem =>
  item.type === TripItemType.FLIGHT;

export const isStayItem = (item: TripItem): item is StayItem =>
  item.type === TripItemType.STAY;

export const isTrainRideItem = (item: TripItem): item is TrainRideItem =>
  item.type === TripItemType.TRAIN_RIDE;

export type Trip = {
  id: string;
  items: TripItem[];
};
