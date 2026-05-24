import React, { useState } from "react";

// import axios to make API requests
import axios from "axios";
// import back arrow icon
import { IoArrowBack } from "react-icons/io5";
// import Link and useNavigate for navigation
import { Link, useNavigate } from "react-router-dom";

function Register() {
  // BASE_URL variable for API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // state to store username input value
  const [name, setName] = useState("");
  // state to store email input value
  const [email, setEmail] = useState("");
  // state to store password input value
  const [password, setPassword] = useState("");

  // hook used for navigation between routes
  const navigate = useNavigate();

  // function to handle registration form submission
  const handleRegister = async (e) => {
    // preventing page refresh on form submit
    e.preventDefault();

    try {
      // sending register request to backend
      const res = await axios.post(
        `${BASE_URL}/register`,
        // request body
        { name, email, password },

        // enabling credentials in request
        { withCredentials: true },
      );

      // redirecting user to login page after successful registration
      navigate("/login");
    } catch (err) {
      // logging backend error message
      console.log(err.response?.data || err.message);

      // showing alert message to user
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-black fixed inset-0 z-50 p-2 flex justify-center items-center">
      <div className="bg-white w-[350px] rounded-xl p-6 shadow-lg">
        {/* back button */}
        <button
          onClick={() => navigate("/")}
          className=" hover:bg-gray-300 rounded-full p-2 cursor-pointer"
        >
          <IoArrowBack size={22} />
        </button>

        <div className="text-center mb-4">
          {/* signup logo and title */}
          <div className="flex gap-2 justify-center items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1020/1020351.png"
              alt=""
              className="w-10"
            />

            <h1 className="text-2xl font-semibold">Sign Up</h1>
          </div>

          {/* subtitle */}
          <p className="text-sm text-gray-500">to continue to YouTube</p>
        </div>

        {/* register form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* username input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Username</label>

            <input
              type="text"
              placeholder="Your name"
              className="border p-2 rounded-md outline-blue-500"
              value={name}
              // updating username state while typing
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* email input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Email</label>

            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-md outline-blue-500"
              value={email}
              // updating email state while typing
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Password</label>

            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md outline-blue-500"
              value={password}
              // updating password state while typing
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* signup button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>

        {/* link to login page */}
        <Link
          to={"/login"}
          className="flex justify-end text-blue-500 text-xs mt-2 hover:underline"
        >
          Login
        </Link>
        <div className="text-center text-sm text-gray-400 my-4">or</div>

        {/* static google signup button */}
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

// exporting Register component
export default Register;
