import {
  ChartPieIcon,
  PaperAirplaneIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ArrowLeftOnRectangleIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTrips } from "../services/trips";

const Sidebar = () => {
  const router = useRouter();
  const activeClassNames = "bg-gray-100 dark:bg-gray-700";
  const linkClassNames =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";

  const { trips } = useTrips();
  const isActive = (routeName: string) => router.pathname.startsWith(routeName);

  return (
    <aside className="w-64 min-h-[90vh] h-full" aria-label="Sidebar">
      <div className="min-h-[90vh] h-full py-4 px-3 bg-gray-50 dark:bg-gray-900">
        <ul className="space-y-2">
          <li>
            <Link href="/trips">
              <a
                className={
                  linkClassNames +
                  (isActive("/trips") ? ` ${activeClassNames}` : "")
                }
              >
                <PaperAirplaneIcon
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Trips</span>
                {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span> */}
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {trips.length}
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/statistics">
              <a
                className={
                  linkClassNames +
                  (isActive("/statistics") ? ` ${activeClassNames}` : "")
                }
              >
                <ChartPieIcon
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                />
                <span className="ml-3">Sustainability Review</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/guide">
              <a
                className={
                  linkClassNames +
                  (isActive("/guide") ? ` ${activeClassNames}` : "")
                }
              >
                <GlobeEuropeAfricaIcon
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Sustainability Guide
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a
                className={
                  linkClassNames +
                  (isActive("/profile") ? ` ${activeClassNames}` : "")
                }
              >
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
              <a
                className={
                  linkClassNames +
                  (isActive("/settings") ? ` ${activeClassNames}` : "")
                }
              >
                <WrenchScrewdriverIcon
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </Link>
          </li>
          <li>
            <a href="#" className={linkClassNames}>
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
};

export default Sidebar;
