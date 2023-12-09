import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLoggedIn } from "../state/selector/loggedInUser";
import ProductPanel from "../components/admin/product/ProductPanel";
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
    <div className="flex max-w-6xl mx-auto my-3 rounded-lg overflow-hidden h-[87vh] shadow-xl gap-4">
      <div className="w-60 items-center py-8 bg-[#FF9376] flex flex-col justify-between">
        <div className="">
          <div className="border-b-2 px-5 mb-4">
            <img
              className="rounded-full h-24 w-24 object-cover self-center"
              src={userData.avatar}
              alt="profile image"
            />

            <div className="mt-2">
              <p className="text-white">
                Hello,{" "}
                <span className="font-semibold text-black">
                  {userData.username}!
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <ul className="">
              <li
                onClick={() => setShowed("products")}
                className="hover:bg-[#fb9e84] duration-150 cursor-pointer"
              >
                <button className="p-2 text-white" type="button">
                  Products
                </button>
              </li>
              <li
                onClick={() => setShowed("order")}
                className="hover:bg-[#fb9e84] duration-150 cursor-pointer"
              >
                <button className="p-2 text-white" type="button">
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

      <div className="w-full overflow-auto">
        {showed == "products" ? <ProductPanel /> : <OrderPanel />}
      </div>
    </div>
  );
};

export default Admin;
