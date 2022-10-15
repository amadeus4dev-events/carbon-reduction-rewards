import { NextPage } from "next";

/**
 * Individual Stats: CO_2 emitted, number of trips, money from bonuses, trips left this year
 * Average Stats: CO_2 emitted, number of trips, money from bonuses, match donation (SAF)
 * Trip Quota: How many trips you can still take in a year
 *
 * Per Trip Statistics and Aggregate Statistics
 * Carbon Quota
 * Cash Bonus
 *
 * Suggestions:
 * Benoit 1A -> Introduce a "Standard" base line for emissions and other stats
 * Benja AMA -> Gameification, Badges
 * DOS 1A -> Company vs Country vs Global, Trainings / Guidelines, Make Recommendations
 * Jegan -> Pitch: State the potential scale of our solution, Specify which open data sources we are using
 */

const Individual: NextPage = () => (
  <div className="container px-8 py-4">
    <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
      Sustainability Review
    </h1>

    <h3 class="text-3xl font-bold dark:text-grey-400">
      Your Impact
    </h3>

      <div className="mt-8 stats shadow-lg">
        <div className="stat">
          <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" class="bi bi-lungs" viewBox="0 0 20 10">
            <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79 1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357V1.5Z"/>
          </svg>
          </div>
          <div className="stat-title">
            Emitted CO<sub>2</sub> in kg
          </div>
          <div className="stat-value text-primary">250.6</div>
          <div className="stat-desc">21% less than your peers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-cyan-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" class="bi bi-airplane" viewBox="0 0 20 10">
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
          </svg>
          </div>
          <div className="stat-title">Trips (2022)</div>
          <div className="stat-value text-cyan-500">3</div>
          <div className="stat-desc">14% less than your peers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" class="bi bi-tree" viewBox="0 0 20 10">
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507z"/>
          </svg>
          </div>
          <div className="stat-title">Sustainability Score</div>
          <div className="stat-value text-purple-500">74/100</div>
          <div className="stat-desc">12% better than your peers</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" class="bi bi-award" viewBox="0 0 20 10">
            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
          </svg>
          </div>
          <div className="stat-title">
            Reward Points
          </div>
          <div className="stat-value text-primary">500</div>
          <div className="stat-desc">Buy offsets, donations, gift cards</div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th></th> 
            <th>Trip</th> 
            <th>Avg Emissions</th> 
            <th>Your Emissions</th> 
            <th>Sustainability %ile Score</th> 
            {/* <th>Sustainability Score</th>  */}
          </tr>
        </thead> 
        <tbody>
          <tr>
            <th>1</th> 
            <td>AMS to LDN</td> 
            <td>100</td> 
            <td>75</td> 
            <td>-25%</td> 
            {/* <td>75</td>  */}
          </tr>
          <tr>
            <th>2</th> 
            <td>Hart Hagerty</td> 
            <td>Desktop Support Technician</td> 
            <td>Zemlak, Daniel and Leannon</td> 
            <td>United States</td> 
            {/* <td>12/5/2020</td>  */}
          </tr>
          <tr>
            <th>3</th> 
            <td>Brice Swyre</td> 
            <td>Tax Accountant</td> 
            <td>Carroll Group</td> 
            <td>China</td> 
            {/* <td>8/15/2020</td>  */}
          </tr>
        </tbody> 
        <tfoot>
        </tfoot>
      </table>
    </div>
  </div>
);

export default Individual;
