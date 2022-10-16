import AwardIcon from "../components/icons/AwardIcon";
import AirplaneIcon from "../components/icons/AirplaneIcon";

const Guide = () => (
    <div className="container px-8 py-4">
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Sustainability Guide
      </h1>

        <h2 className="text-l dark:text-gray-900">
            <span className="text-gray-900 dark:text-gery-400">Choose trains whenever possible for domestic and short-haul flights. For long-haul flights,
            choose direct flights over flights with connections. Once you arrive at your destination, consider bike-shares
            and public transportation before booking cabs. Let's reduce our emissions together!</span>
        </h2>

      <h2 className="text-2xl font-bold dark:text-gray-900">
        Sustainability Tiers
      </h2>
      
        <ul className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-1 text-orange-700">
                <AwardIcon />
                <span>Bronze Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-1 text-stone-700">
                <AwardIcon />
                <span>Silver Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit 20% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-1 text-yellow-500">
                <AwardIcon />
                <span>Gold Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit 40% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-1 text-stone-500">
                <AwardIcon />
                <span>Platinum Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit 60% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-1 text-green-500">
                <AwardIcon />
                <span>Greta Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit 80% less CO<sub>2</sub> than the average traveller, wow! You&apos;re the next Greta Thunberg!</span></span>
            </li>

        </ul>

        <h2 className="text-2xl font-bold dark:text-gray-900">
        Travel Expectations per Role
        </h2>

              
        <ul className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-1">
                <AirplaneIcon />
                <span>Associates: <span className="font-semibold text-gray-900 dark:text-gery-400">1 trip per quarter</span></span>
            </li>
            <li className="flex items-center space-x-1">
                <AirplaneIcon />
                <span>Managers: <span className="font-semibold text-gray-900 dark:text-gery-400">3 trips per quarter</span></span>
            </li>
            <li className="flex items-center space-x-1">
                <AirplaneIcon />
                <span>Partners: <span className="font-semibold text-gray-900 dark:text-gery-400">5 trips per quarter</span></span>
            </li>
            <li className="flex items-center space-x-1">
                <AirplaneIcon />
                <span>C-Suite: <span className="font-semibold text-gray-900 dark:text-grey-400">8 trips per quarter or more</span></span>
            </li>
        </ul>

    </div>
  );
  
  export default Guide;
  