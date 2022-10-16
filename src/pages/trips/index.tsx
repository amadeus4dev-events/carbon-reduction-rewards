import { NextPage } from "next";
import Link from "next/link";
import TripsData from "../../components/TripsData";

const Trips: NextPage = () => (
  <div className="px-8 py-4">
    <div className="text-sm breadcrumbs">
      <ul>
        <li>Your Trips</li>
      </ul>
    </div>

    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Your Trips
    </h1>
    <TripsData />
    <div className="mt-8 flex justify-end">
      <Link href="/trips/new">
        <a className="mt-6 btn btn-primary">New Trip</a>
      </Link>
    </div>
  </div>
);

export default Trips;
