import {
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { FC } from "react";

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
        <button className="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
);

const Itinerary = () => (
  <div className="container px-8 py-4">
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Your Trip
    </h1>
    <div className="mt-8 rounded border-sky-800 border-2 border-dashed text-center px-8 py-16 text-xl">
      Nothing here yet. Start by adding your first trip item.
    </div>
    <div className="mt-8">
      <AddItem icon={PaperAirplaneIcon} name="Flight" />
      <AddItem icon={BuildingOfficeIcon} name="Accommodation" />
      <AddItem icon={TruckIcon} name="Ground Transport" />
    </div>
  </div>
);

export default Itinerary;
