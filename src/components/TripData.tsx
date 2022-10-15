import {
  BuildingOfficeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

import {
  Flight,
  isFlightItem,
  Stay,
  TripItemType,
  useTrip,
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
  flightNumber,
}: Flight) => (
  <div>
    <div className="font-bold">
      {origin.name} ({origin.iataCode}) — {destination.name} (
      {destination.iataCode})
    </div>
    <div className="text-gray-600">
      {flightNumber ? `${flightNumber} · ` : ""}
      {isReturn ? "Return" : "One-way"} · {/* @ts-ignore */}
      {TRAVEL_CLASS_LABELS[travelClass]}
    </div>
  </div>
);

const StaySummary = (stay: Stay) => <div>Nothing here yet</div>;

const TripData = () => {
  const { items, removeItem } = useTrip();

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
        Nothing here yet. Start by adding your first trip item.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto border">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Summary</th>
            <th className="text-right">
              CO<sub>2</sub> Emissions (kg)
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <th>{TRIP_ITEM_TYPE_COMPONENT[item.type]}</th>
              <td>
                {isFlightItem(item) ? (
                  <FlightSummary {...item.data} />
                ) : (
                  <div>Nothing</div>
                )}
              </td>
              <td className="text-right">{item.data.kilosCo2}</td>
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
  );
};

export default TripData;
