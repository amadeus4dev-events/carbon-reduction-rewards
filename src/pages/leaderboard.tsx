import { NextPage } from "next";
import { FC, ReactNode } from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { peers } from "../lib/mocks";
import people from "../lib/mocks/people.json";

const Leaderboard: NextPage = () => {
    const getTrophyColor = (i: number) => {
      if (i === 0) {
        return "text-yellow-500";
      }
      if (i === 1) {
        return "text-slate-600";
      }
      return "text-yellow-700";
    };

    return (
      <div className="container px-8 py-4">
        <h1 className="mt-6 mb-6 text-3xl font-bold tracking-tight text-gray-900">
          Leaderboard
        </h1>

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th>Emitted CO2 in kg</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, i) => (
                <tr key={person.uid} className={`${i == 1 ? "active" : ""}`}>
                  <td>
                    {i < 3 ? (
                      <TrophyIcon
                        className={`flex-shrink-0 w-6 h-6 transition duration-75 ` + getTrophyColor(i)}
                        fill="currentColor"
                      />
                    ) : null}
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img src={`https://placeimg.com/192/192/people?k=${person.uid}`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{person.first_name} {person.last_name}</div>
                        <div className="text-sm opacity-50">{person.address.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                      {person.employment.title}
                  </td>
                  <td>12.0</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </tfoot>
            
          </table>
        </div>

      </div>
    );
};

export default Leaderboard;