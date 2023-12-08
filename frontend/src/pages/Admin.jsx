import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLoggedIn } from "../state/selector/loggedInUser";
import ProductPanel from "../components/admin/ProductPanel";
import OrderPanel from "../components/admin/OrderPanel";
import { userState } from "../state/atom/userState";

const Admin = () => {
  const userData = useRecoilValue(userIsLoggedIn);
  const [user, setUser] = useRecoilState(userState);

  const [error, setError] = useState(false);
  const [showed, setShowed] = useState("products");

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
    <div className="flex m-10 rounded-lg overflow-hidden h-screen shadow-xl gap-4">
      <div className="w-lg p-8 bg-[#FF9376] flex flex-col justify-between">
        <div className="">
          <div className="border-b-2 mb-4">
            <img
              className="rounded-full h-24 w-24 object-cover self-center"
              src={userData.avatar}
              alt="profile image"
            />

            <div className="mt-2">
              <p>
                Hello{" "}
                <span className="font-semibold">{userData.username}!</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <ul className="">
              <li className="hover:bg-[#fb9e84] duration-150">
                <button
                  className="p-2 text-white"
                  type="button"
                  onClick={() => setShowed("products")}
                >
                  Products
                </button>
              </li>
              <li className="hover:bg-[#fb9e84] duration-150">
                <button
                  className="p-2 text-white"
                  type="button"
                  onClick={() => setShowed("order")}
                >
                  Order
                </button>
              </li>
            </ul>
          </div>
        </div>

        <button
          className="p-3 bg-red-500 hover:opacity-80 duration-150 rounded-lg text-white font-semibold"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>

      <div className="max-w-4xl">
        {
          showed == "products" ? <ProductPanel/> : <OrderPanel/>
        }
      </div>
    </div>
  );
};

export default Admin;
