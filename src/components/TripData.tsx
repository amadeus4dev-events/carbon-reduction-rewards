import {
  BuildingOfficeIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

import {
  Flight,
  isFlightItem,
  isStayItem,
  isTrainRideItem,
  Stay,
  TrainRide,
  TripItem,
  TripItemType,
  useTrip,
  useTrips,
} from "../services/trips";

const TRIP_ITEM_TYPE_COMPONENT = {
  [TripItemType.FLIGHT]: (
    <div className="flex items-center">
      <PaperAirplaneIcon
        className="flex-shrink-0 w-6 h-6 text-sky-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
      />
      <div className="ml-4">Flight</div>
    </div>
  ),
  [TripItemType.STAY]: (
    <div className="flex items-center">
      <BuildingOfficeIcon
        className="flex-shrink-0 w-6 h-6 text-sky-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
      />
      <div className="ml-4">Stay</div>
    </div>
  ),
  [TripItemType.TRAIN_RIDE]: (
    <div className="flex items-center">
      <ChevronDoubleRightIcon
        className="flex-shrink-0 w-6 h-6 text-sky-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
      />
      <div className="ml-4">Train Ride</div>
    </div>
  ),
};

const TRAVEL_CLASS_LABELS = {
  economy: "Economy",
  premium: "Premium Economy",
  business: "Business",
  first: "First",
};

const FlightSummary = ({
  origin,
  destination,
  travelClass,
  isReturn,
  distance,
  flightNumber,
}: Flight) => (
  <div>
    <div className="font-bold">
      {origin.cityName} ({origin.iataCode}) — {destination.cityName} (
      {destination.iataCode})
    </div>
    <div className="text-gray-600">
      {flightNumber ? `${flightNumber} · ` : ""}
      {isReturn ? "Return" : "One-way"} · {/* @ts-ignore */}
      {TRAVEL_CLASS_LABELS[travelClass]} · {distance.toFixed(2)} km
    </div>
  </div>
);

const StaySummary = ({ accommodation, nights }: Stay) => (
  <div>
    <div className="font-bold">{accommodation.name}</div>
    <div className="text-gray-600">
      {accommodation.cityName} · {accommodation.countryName} · {nights} Nights{" "}
      {accommodation.isSustainable ? " · Sustainable" : ""}
    </div>
  </div>
);

const TrainRideSummary = ({ origin, destination, distance }: TrainRide) => (
  <div>
    <div className="font-bold">
      {origin.cityName} — {destination.cityName}
    </div>
    <div className="text-gray-600">{distance.toFixed(2)} km</div>
  </div>
);

interface TripItemSummaryProps {
  item: TripItem;
}

const TripItemSummary = ({ item }: TripItemSummaryProps) => {
  if (isFlightItem(item)) {
    return <FlightSummary {...item.data} />;
  } else if (isStayItem(item)) {
    return <StaySummary {...item.data} />;
  } else if (isTrainRideItem(item)) {
    return <TrainRideSummary {...item.data} />;
  }

  return null;
};

const FlightRecommendation = ({
  origin,
  destination,
  distance,
  kilosCo2,
}: Flight) => {
  if (origin.countryIsoCode === destination.countryIsoCode) {
    const trainRideEstimate = 0.016 * distance;
    const reduction = ((1 - trainRideEstimate / kilosCo2) * 100).toFixed(2);

    return (
      <div className="break-all">
        Going by train would save approx. {reduction}% in carbon emissions
      </div>
    );
  }

  return <></>;
};

interface TripItemRecommendation {
  item: TripItem;
}

const TripItemRecommendation = ({ item }: TripItemRecommendation) => {
  if (isFlightItem(item)) {
    return <FlightRecommendation {...item.data} />;
  } else if (isStayItem(item)) {
    return <></>;
  } else if (isTrainRideItem(item)) {
    return <></>;
  }

  return null;
};

const TripData = () => {
  const router = useRouter();
  const { addTrip } = useTrips();
  const { items, removeItem, clear: clearTrip } = useTrip();

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
        Nothing here yet. Start by adding your first trip item.
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 overflow-x-auto border">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Type</th>
              <th>Summary</th>
              <th>Recommendation</th>
              <th className="text-right">
                CO<sub>2</sub> Emissions (kg)
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th>{TRIP_ITEM_TYPE_COMPONENT[item.type]}</th>
                <td>
                  <TripItemSummary item={item} />
                </td>
                <td className="max-w-[3em]">
                  <TripItemRecommendation item={item} />
                </td>
                <td className="text-right">{item.data.kilosCo2.toFixed(2)}</td>
                <td className="text-right">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn btn-sm btn-square btn-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            addTrip(items);
            clearTrip();
            router.push("/trips");
          }}
        >
          Save Trip
        </button>
      </div>
    </>
  );
};

export default TripData;
