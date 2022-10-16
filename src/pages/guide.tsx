import AwardIcon from "../components/icons/AwardIcon";

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
            <li className="flex items-center space-x-3">
                <AwardIcon />
                <span>Bronze Tier: <span className="font-semibold text-gray-900 dark:text-gery-400">You emit less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-3">
                <AwardIcon />
                <span>Silver Tier: <span className="font-semibold text-gray-900 dark:text-gery-400">You emit 20% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-3">
                <AwardIcon />
                <span>Gold Tier: <span className="font-semibold text-gray-900 dark:text-gery-400">You emit 40% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-3">
                <AwardIcon />
                <span>Platinum Tier: <span className="font-semibold text-gray-900 dark:text-gery-400">You emit 60% less CO<sub>2</sub> than the average traveller.</span></span>
            </li>
            <li className="flex items-center space-x-3">
                <AwardIcon />
                <span>Greta Tier: <span className="font-semibold text-gray-900 dark:text-grey-400">You emit 80% less CO<sub>2</sub> than the average traveller, wow! You're the next Greta Thunberg!</span></span>
            </li>

        </ul>

        <h2 className="text-2xl font-bold dark:text-gray-900">
        Travel Expectations per Role
        </h2>

              
        <ul className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
            <li className="flex items-center space-x-3">
        
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span>Associates: <span className="font-semibold text-gray-900 dark:text-gery-400">1 trip per quarter</span></span>
            </li>
            <li className="flex items-center space-x-3">
         
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span>Managers: <span className="font-semibold text-gray-900 dark:text-gery-400">3 trips per quarter</span></span>
            </li>
            <li className="flex items-center space-x-3">
            
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span>Partners: <span className="font-semibold text-gray-900 dark:text-gery-400">5 trips per quarter</span></span>
            </li>
            <li className="flex items-center space-x-3">
            
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span>C-Suite: <span className="font-semibold text-gray-900 dark:text-grey-400">8 trips per quarter or more</span></span>
            </li>
        </ul>

    </div>
  );
  
  export default Guide;
  