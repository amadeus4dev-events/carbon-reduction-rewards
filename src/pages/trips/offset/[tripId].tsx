import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTrips } from "../../../services/trips";

const Offset: NextPage = () => {
  const router = useRouter();
  const tripId = String(router.query.tripId);
  const { selectTrip } = useTrips();
  const trip = selectTrip(tripId);

  return (
    <div className="container px-8 py-4">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/trips">
              <a>Your Trips</a>
            </Link>
          </li>
          <li>Offset Trip</li>
        </ul>
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Offset Trip
      </h1>
      {!trip && <>Loading...</>}
      {trip && <>{JSON.stringify(trip)}</>}
    </div>
  );
};

export default Offset;
