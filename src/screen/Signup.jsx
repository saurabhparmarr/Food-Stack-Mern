import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      if (json.authToken) {
        localStorage.setItem("authToken", json.authToken);
      }
      console.log("Signup response:", json);

      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };
  const onChnage = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border-t-8 border-orange-400">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">
          Join Food Stack!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter your password"
              value={credentials.location}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={!credentials.email || !credentials.password}
            className="w-full bg-orange-400 text-white py-3 rounded-xl font-bold text-lg 
             hover:bg-orange-500 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
