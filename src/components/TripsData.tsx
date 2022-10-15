import {
  getTripEmissions,
  getTripName,
  getTripSummary,
  useTrips,
} from "../services/trips";

const TripsData = () => {
  const { trips } = useTrips();

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
              <td className="text-right">{getTripEmissions(items)}</td>
              <td className="text-right">
                <button onClick={() => {}} className="btn btn-sm">
                  View
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
