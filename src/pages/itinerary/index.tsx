import Link from "next/link";

const Itinerary = () => (
  <div className="container px-8 py-4">
    <div className="text-sm breadcrumbs">
      <ul>
        <li>Your Trips</li>
      </ul>
    </div>

    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Your Trips
    </h1>
    <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
      <div>Nothing here yet. Start by creating your first trip.</div>
      <Link href="/itinerary/new">
        <a className="mt-6 btn btn-primary">New Trip</a>
      </Link>
    </div>
  </div>
);

export default Itinerary;
