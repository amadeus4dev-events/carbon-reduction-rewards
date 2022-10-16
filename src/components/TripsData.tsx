import {
  getTripEmissions,
  getTripName,
  getTripSummary,
  useTrips,
} from "../services/trips";

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
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Summary</th>
            <th className="text-right">
              CO<sub>2</sub> Emissions (kg)
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trips.map(({ id, items }) => (
            <tr key={id}>
              <th>{getTripName(items)}</th>
              <td>{getTripSummary(items)}</td>
              <td className="text-right">
                {getTripEmissions(items).toFixed(2)}
              </td>
              <td className="text-right">
                <button
                  onClick={() => removeTrip(id)}
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

export default TripsData;
