import React, { useState } from "react";
// importing axios to make API requests
import axios from "axios";
// IImpoert React icon
import { IoArrowBack } from "react-icons/io5";
// importing Link for navigation and useNavigate
import { Link, useNavigate } from "react-router-dom";
// importing custom authentication context
import { useAuth } from "../../context/AuthContext";

function Login() {
  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // hook used to navigate between routes
  const navigate = useNavigate();
  // getting login function from AuthContext
  const { login } = useAuth();
  // state to store email input value
  const [email, setEmail] = useState("");
  // state to store password input value
  const [password, setPassword] = useState("");

  // function to handle login form submission
  const handleLogin = async (e) => {
    // prevent page refresh on form submit
    e.preventDefault();

    try {
      // sending login request to backend
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      // storing user and token in authentication context
      login(res.data.user, res.data.token);

      // redirecting user to homepage after successful login
      navigate("/");
    } catch (err) {
      // showing backend error message or fallback message
      alert(err.response?.data?.message || "Something went wrong!!!");
    }
  };

  return (
    <div className="bg-black fixed inset-0 z-50 p-2 flex justify-center items-center">
      {/* Login Card */}
      <div className="bg-white w-[350px] rounded-xl p-6 shadow-lg">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className=" hover:bg-gray-300 rounded-full p-2 cursor-pointer"
        >
          <IoArrowBack size={22} />
        </button>

        {/* Youtube logo */}
        <div className="flex justify-center my-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/960px-YouTube_full-color_icon_%282017%29.svg.png"
            className="w-[100px]"
            alt=""
          />
        </div>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-gray-500">to continue to YouTube</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Email</label>
            {/* Emial field */}
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-md outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Password</label>
            {/* Password field */}
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        {/* link to register page */}
        <Link
          to={"/register"}
          className="flex justify-end text-blue-500 hover:underline text-xs mt-2"
        >
          Create account
        </Link>
        <div className="text-center text-sm text-gray-400 my-4">or</div>

        {/* Static google login button */}
        <button className="group border w-full py-2 rounded-xl hover:bg-gray-300 hover:shadow-[0px_3px_5px_black] transition cursor-pointer">
          Continue with_
          <span className="group-hover:text-blue-500 font-bold">G</span>
          <span className="group-hover:text-red-500 font-bold">o</span>
          <span className="group-hover:text-yellow-500 font-bold">o</span>
          <span className="group-hover:text-blue-500 font-bold">g</span>
          <span className="group-hover:text-green-500 font-bold">l</span>
          <span className="group-hover:text-red-500 font-bold">e</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
