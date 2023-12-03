import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#FF9376] shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl text-white">ShopHaven</h1>
        </Link>
        <form className="bg-white p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch className="text-[#FF9376]" />
          </button>
        </form>
        <ul className="flex gap-5 text-white items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline ">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to={"/cart"}>
            <li className="hidden sm:inline hover:underline">
              Cart{" "}
              <span>
                <FaCartShopping className="inline" />
              </span>
            </li>
          </Link>
          <Link to={"/profile"}>
            <li className="p-2 rounded-lg transition duration-300 outline hover:bg-white hover:text-[#FF9376] font-semibold shadow-2xl">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
