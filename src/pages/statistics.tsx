import { NextPage } from "next";
import {
  getMeanFlightEmissions,
  getMeanStayEmissions,
  getMeanTrainRideEmissions,
  getMeanTransportEmissions,
  getTripsEmissions,
  useTrips,
} from "../services/trips";
import { getSustainabilityScore, peerStatistics } from "../lib/mocks";
import { FC, ReactNode } from "react";

import AwardIcon from "../components/icons/AwardIcon";
import LungsIcon from "../components/icons/LungsIcon";
import AirplaneIcon from "../components/icons/AirplaneIcon";

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
 *
 * Eco-friendliness of the code can be part of the questions
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

const getTravelerTier = (relativePerformance: number | null) => {
  if (relativePerformance === null) {
    return {
      name: "n/a",
      color: "inherit",
      description: "Start adding your trips",
      reward: "0 €",
    };
  }

  if (relativePerformance < -0.8) {
    return {
      name: "Greta",
      color: "green-500",
      description: "You are basically Greta Thunberg",
      reward: "250 €",
    };
  }

  if (relativePerformance < -0.6) {
    return {
      name: "Platinum",
      color: "stone-500",
      description: "You are one of the most green travelers",
      reward: "150 €",
    };
  }

  if (relativePerformance < -0.4) {
    return {
      name: "Gold",
      color: "yellow-500",
      description: "You lead by example",
      reward: "100 €",
    };
  }

  if (relativePerformance < -0.2) {
    return {
      name: "Silver",
      color: "stone-700",
      description: "You are making an effort",
      reward: "50 €",
    };
  }

  if (relativePerformance < -0.0) {
    return {
      name: "Bronze",
      color: "orange-700",
      description: "You are a concious traveler",
      reward: "25 €",
    };
  }

  return {
    name: "Participant",
    color: "inherit",
    description: "Hey, at least your tracking your emissions",
    reward: "0 €",
  };
};

const relativePerformance = (value: number | null, average: number | null) =>
  value && average ? value / average - 1 : null;

const formatPercentage = (value: number | null) =>
  value ? `${String((value * 100).toFixed(0))}%` : "n/a";

const Statistics: NextPage = () => {
  const { trips } = useTrips();

  const meanFlightEmissions = getMeanFlightEmissions(trips);
  const meanStayEmissions = getMeanStayEmissions(trips);
  const meanTrainRideEmissions = getMeanTrainRideEmissions(trips);
  const meanTransportEmissions = getMeanTransportEmissions(trips);
  const relativeTransportPerformance = relativePerformance(
    meanTransportEmissions,
    peerStatistics.meanTransportEmissions
  );
  const relativeTier = getTravelerTier(relativeTransportPerformance);

  const sustainabilityScore = getSustainabilityScore(
    meanFlightEmissions,
    meanStayEmissions,
    meanTrainRideEmissions
  );
  const emissions = getTripsEmissions(trips);
  const numTrips = trips.length;
  const relativeEmissionsPerformance = relativePerformance(
    emissions,
    peerStatistics.averageEmissions
  );
  const relativeNumTripsPerformance = relativePerformance(
    numTrips,
    peerStatistics.averageNumTrips
  );
  const absoluteTier = getTravelerTier(relativeEmissionsPerformance);

  return (
    <div className="container px-8 py-4">
      <div className="hidden text-cyan-500 text-orange-700 text-green-500 text-stone-500 text-yellow-500" />
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
      <h2 className="mt-4 text-xl font-bold dark:text-grey-400">
        Relative Performance
      </h2>
      <div className="mt-4 w-full stats shadow-lg">
        <Stat
          title="Relative Travel Performance"
          value={formatPercentage(relativeTransportPerformance)}
          description={
            relativeTransportPerformance
              ? `You emit ${formatPercentage(relativeTransportPerformance)} ${
                  relativeTransportPerformance < 0 ? "less" : "more"
                } per km traveled than your peers`
              : "Nothing here yet"
          }
          color="primary"
          icon={AirplaneIcon}
        />

        <Stat
          title="Your Tier"
          value={relativeTier.name}
          description={relativeTier.description}
          color={relativeTier.color}
          icon={AwardIcon}
        />

        <Stat
          title="Your Reward"
          value={relativeTier.reward}
          description="You earned it"
          color="cyan-500"
          icon={AirplaneIcon}
        />
      </div>

      <h2 className="mt-6 text-xl font-bold dark:text-grey-400">
        Absolute Performance
      </h2>
      <div className="w-full mt-4 stats shadow-lg">
        <Stat
          title={
            <>
              Emitted CO<sub>2</sub> in kg
            </>
          }
          value={emissions.toFixed(1)}
          description={
            relativeEmissionsPerformance
              ? `You are emitting ${formatPercentage(
                  relativeEmissionsPerformance
                )} ${
                  relativeEmissionsPerformance < 0 ? "less" : "more"
                } than your peers`
              : "Nothing here yet"
          }
          color="primary"
          icon={LungsIcon}
        />

        <Stat
          title="Trips (2022)"
          value={numTrips}
          description={
            relativeNumTripsPerformance
              ? `You are taking ${formatPercentage(
                  relativeNumTripsPerformance
                )} ${
                  relativeNumTripsPerformance < 0 ? "less" : "more"
                } trips than your peers`
              : "Nothing here yet"
          }
          color="cyan-500"
          icon={AirplaneIcon}
        />
      </div>
      <div className="w-full stats shadow-lg">
        <Stat
          title="Your Tier"
          value={absoluteTier.name}
          description={absoluteTier.description}
          color={absoluteTier.color}
          icon={AwardIcon}
        />
        <Stat
          title="Your Reward"
          value={absoluteTier.reward}
          description="You earned it"
          color="cyan-500"
          icon={AirplaneIcon}
        />
      </div>
    </div>
  );
};

export default Statistics;
