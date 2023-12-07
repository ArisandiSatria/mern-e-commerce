import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state/atom/userState";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useRecoilState(userState)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setUser(data)
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">
        Welcome to Login Page
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />
        <button disabled={loading} className="bg-[#FF9376] text-white p-3 rounded-lg uppercase hover:opacity-80 transition disabled:opacity-70 font-semibold">
          {loading ? "Loading..." : "Log In"}
        </button>
        {error && <p className="text-red-500 mt-5">{error}</p>}
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
