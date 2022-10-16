import { NextPage } from "next";
import {
  getMeanFlightEmissions,
  getMeanStayEmissions,
  getMeanTrainRideEmissions,
  getTripsEmissions,
  useTrips,
} from "../services/trips";
import { getSustainabilityScore, peerStatistics } from "../lib/mocks";
import { FC, ReactNode } from "react";

import AwardIcon from "../components/icons/AwardIcon";
import LungsIcon from "../components/icons/LungsIcon";
import AirplaneIcon from "../components/icons/AirplaneIcon";
import TreeIcon from "../components/icons/TreeIcon";
import HouseIcon from "../components/icons/HouseIcon";

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

interface StatProps {
  title: string | ReactNode;
  value: string | number;
  description: string;
  color: string;
  icon: typeof AwardIcon;
}

const Stat: FC<StatProps> = ({
  title,
  value,
  description,
  color,
  icon: Icon,
}) => (
  <div className="stat">
    <div className={`stat-figure text-${color}`}>
      <Icon />
    </div>
    <div className="stat-title">{title}</div>
    <div className={`stat-value text-${color}`}>{value}</div>
    <div className="stat-desc">{description}</div>
  </div>
);

const relativePerformance = (value: number | null, average: number | null) =>
  value && average
    ? `${String(((1 - value / average) * 100).toFixed(0))}%`
    : "n/a";

const Statistics: NextPage = () => {
  const { trips } = useTrips();

  const meanFlightEmissions = getMeanFlightEmissions(trips);
  const meanStayEmissions = getMeanStayEmissions(trips);
  const meanTrainRideEmissions = getMeanTrainRideEmissions(trips);
  const sustainabilityScore = getSustainabilityScore(
    meanFlightEmissions,
    meanStayEmissions,
    meanTrainRideEmissions
  );
  const emissions = getTripsEmissions(trips);
  const numTrips = trips.length;

  return (
    <div className="container px-8 py-4">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>Sustainability Review</li>
        </ul>
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Sustainability Review
      </h1>

      <h2 className="mt-6 text-2xl font-bold dark:text-grey-400">
        Your Impact
      </h2>
      <div className="w-full mt-4 stats shadow-lg">
        <Stat
          title="Relative Flight Performance"
          value={relativePerformance(
            meanFlightEmissions,
            peerStatistics.meanFlightEmissions
          )}
          description="You emit less per km flown"
          color="primary"
          icon={AirplaneIcon}
        />

        <Stat
          title="Relative Hotel Performance"
          value={relativePerformance(
            meanStayEmissions,
            peerStatistics.meanStayEmissions
          )}
          description="You are choosing more sustainable hotels"
          color="purple-500"
          icon={HouseIcon}
        />

        <Stat
          title="Relative Train Performance"
          value={relativePerformance(
            meanTrainRideEmissions,
            peerStatistics.meanTrainRideEmissions
          )}
          description="You emit less per km traveled"
          color="cyan-500"
          icon={AirplaneIcon}
        />
      </div>

      <div className="w-full mt-4 stats shadow-lg">
        <Stat
          title={
            <>
              Emitted CO<sub>2</sub> in kg
            </>
          }
          value={emissions.toFixed(1)}
          description={`${relativePerformance(
            emissions,
            peerStatistics.averageEmissions
          )} less than your peers`}
          color="primary"
          icon={LungsIcon}
        />

        <Stat
          title="Trips (2022)"
          value={numTrips}
          description={`${relativePerformance(
            numTrips,
            peerStatistics.averageNumTrips
          )} less than your peers`}
          color="cyan-500"
          icon={AirplaneIcon}
        />

        <Stat
          title="Sustainability Score"
          value={`${sustainabilityScore}/100`}
          description={`${relativePerformance(
            sustainabilityScore,
            peerStatistics.meanSustainabilityScore
          )} better than your peers`}
          color="purple-500"
          icon={TreeIcon}
        />
        {/* 
        <Stat
          title="Reward Points"
          value="400"
          description="Buy offsets, donations, gift cards"
          color="primary"
          icon={AwardIcon}
        /> */}
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
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
