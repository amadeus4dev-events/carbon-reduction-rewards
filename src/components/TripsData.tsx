import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import formatPercentage from "../lib/formatPercentage";
import { relativePerformance } from "../lib/mocks";
import {
  getAverageTripEmissions,
  getTripEmissions,
  getTripName,
  getTripSummary,
  Trip,
  useTrips,
} from "../services/trips";

interface TripRowProps {
  trip: Trip;
  removeTrip: (id: string) => void;
}

const TripRow: FC<TripRowProps> = ({ trip: { id, items }, removeTrip }) => {
  const tripEmissions = getTripEmissions(items);
  const averageTripEmissions = getAverageTripEmissions(items);
  const performance = relativePerformance(tripEmissions, averageTripEmissions);

  return (
    <tr key={id}>
      <th>{getTripName(items)}</th>
      <td>{getTripSummary(items)}</td>
      <td className="text-right">{tripEmissions.toFixed(0)}</td>
      <td className="text-right">
        <div
          className={`badge ${
            performance && performance < 0
              ? "badge-outline badge-primary"
              : "badge-error"
          }`}
        >
          {performance && performance > 0 ? "+" : ""}
          {formatPercentage(performance)} CO<sub>2</sub>
        </div>
      </td>
      <td className="text-right">
        <button
          onClick={() => removeTrip(id)}
          className="ml-4 btn btn-sm btn-square btn-error"
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
  );
};

const TripsData = () => {
  const { trips, removeTrip } = useTrips();
  if (trips.length === 0) {
    return (
      <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
        <div>Nothing here yet. Start by creating your first trip.</div>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto border">
      <table className="table min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Summary</th>
            <th className="text-right">
              CO<sub>2</sub> Emissions (kg)
            </th>
            <th className="text-right">
              <div className="flex align-center justify-end">
                Comparison
                <div
                  className="tooltip tooltip-bottom"
                  data-tip="Comparison is calculated based on global trip data"
                >
                  <InformationCircleIcon className="ml-2 flex-shrink-0 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </th>
            <th className="badge-outline badge-primary badge-error"></th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, i) => (
            <TripRow key={i} trip={trip} removeTrip={removeTrip} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsData;
