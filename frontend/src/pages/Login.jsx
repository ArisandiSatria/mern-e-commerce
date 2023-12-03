import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">
        Welcome to Login Page
      </h1>
      <form className="flex flex-col gap-4">
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
        <button className="bg-[#FF9376] text-white p-3 rounded-lg uppercase hover:opacity-80 transition disabled:opacity-70 font-semibold">
          Log In
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/register"}>
          <span className="text-[#FF9376] hover:underline">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
