import { FC, ReactNode } from "react";
import { TrophyIcon } from "@heroicons/react/24/solid";

const Leaderboard: NextPage = () => {
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
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TrophyIcon
                    className="flex-shrink-0 w-6 h-6 text-yellow-500 transition duration-75"
                    fill="currentColor"
                  />
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img src="https://placeimg.com/192/192/people" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Desktop Support Technician
                </td>
                <td>Purple</td>
              </tr>
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