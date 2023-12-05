import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">
        Welcome to Register Page
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          placeholder="confirm password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-[#FF9376] text-white p-3 rounded-lg uppercase hover:opacity-80 transition disabled:opacity-70 font-semibold"
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500 mt-5">{error}</p>}
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
