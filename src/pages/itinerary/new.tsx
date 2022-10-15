import {
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { useTrip } from "../../services/trips";

const TripData = () => {
  const { items } = useTrip();

  return <div>{JSON.stringify(items)}</div>;
};

export interface AddItemProps {
  icon: typeof BuildingOfficeIcon;
  name: string;
}

const AddItem: FC<AddItemProps> = ({ icon: Icon, name }) => (
  <div className="mt-8 bg-base-100 shadow-xl w-full px-6 py-4">
    <div className="flex items-center">
      <div className="pr-6 flex items-center">
        <Icon
          className="flex-shrink-0 w-6 h-6 text-sky-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="grow flex justify-end">
        <Link href="/itinerary/flight">
          <a className="btn btn-primary">Add</a>
        </Link>
      </div>
    </div>
  </div>
);

const Itinerary: NextPage = () => (
  <div className="container px-8 py-4">
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href="/itinerary">
            <a>Your Trips</a>
          </Link>
        </li>
        <li>New Trip</li>
      </ul>
    </div>
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      New Trip
    </h1>
    <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
      Nothing here yet. Start by adding your first trip item.
      <TripData />
    </div>
    <div className="mt-8">
      <AddItem icon={PaperAirplaneIcon} name="Flight" />
      <AddItem icon={BuildingOfficeIcon} name="Accommodation" />
      <AddItem icon={TruckIcon} name="Ground Transport" />
    </div>
  </div>
);

export default Itinerary;
