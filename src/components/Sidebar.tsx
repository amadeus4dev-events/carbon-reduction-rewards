import {
  ChartPieIcon,
  PaperAirplaneIcon,
  UsersIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Sidebar = () => (
  <aside className="w-64 min-h-[90vh]" aria-label="Sidebar">
    <div className="min-h-[90vh] py-4 px-3 bg-gray-50 dark:bg-gray-900">
      <ul className="space-y-2">
        <li>
          <Link href="/itinerary">
            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <PaperAirplaneIcon
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              />
              <span className="flex-1 ml-3 whitespace-nowrap">Trips</span>
              {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
              Pro
            </span> */}
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                2
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/individual">
            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChartPieIcon
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              />
              <span className="ml-3">Your Statistics</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/company">
            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <UsersIcon
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Company Statistics
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <UserIcon
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Your Profile
              </span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <WrenchScrewdriverIcon
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              />
              <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftOnRectangleIcon
              className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
            />
            <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;
