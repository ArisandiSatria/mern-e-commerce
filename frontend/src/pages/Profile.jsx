import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLoggedIn } from "../state/selector/loggedInUser";
import { userState } from "../state/atom/userState";

const Profile = () => {
  const userData = useRecoilValue(userIsLoggedIn);
  const [user, setUser] = useRecoilState(userState);

  const [error, setError] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        return;
      }
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <p>{error && error}</p>
      <div>
        <h2 className="mb-5 font-semibold text-xl my-20">Profile</h2>
        <div className="flex items-center justify-between border rounded-lg p-3">
          <div className="flex gap-4 items-center">
            <div>
              <img
                className="rounded-full h-24 w-24 object-cover self-center"
                src={userData.avatar}
                alt="profile image"
              />
            </div>

            <div>
              <p className="font-semibold">{userData.username}</p>
              <p className="font-light">{userData.email}</p>
            </div>
          </div>

          <button
            className="p-3 bg-red-500 rounded-lg text-white font-semibold"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="my-10">
        <h2 className="mb-5 font-semibold text-xl">History</h2>
        <div className="border rounded-lg overflow-hidden">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-white uppercase bg-[#FF9376]">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap "
                >
                  null
                </th>
                <td class="px-6 py-4">null</td>
                <td class="px-6 py-4">null</td>
                <td class="px-6 py-4">null</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
