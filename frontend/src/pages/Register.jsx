import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Register = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">
        Welcome to Register Page
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <input
          type="password"
          placeholder="confirm password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
        />
        <button className="bg-[#FF9376] text-white p-3 rounded-lg uppercase hover:opacity-80 transition disabled:opacity-70 font-semibold">
          Register
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={"/login"}>
          <span className="text-[#FF9376] hover:underline">Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
