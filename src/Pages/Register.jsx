import axios from "axios";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // const userData = {
    //   name, email, password
    // }
    try {
      const res = await axios.post(
        "http://localhost:3000/register",
        { name, email, password },
        { withCredentials: true },
      );
      console.log(res.data);

      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-black fixed inset-0 z-50 p-2 flex justify-center items-center">
      <div className="bg-white w-[350px] rounded-xl p-6 shadow-lg">
        <button
          onClick={() => navigate("/")}
          className=" hover:bg-gray-300 rounded-full p-2 cursor-pointer"
        >
          <IoArrowBack size={22} />
        </button>
        <div className="text-center mb-4">
          <div className="flex gap-2 justify-center items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1020/1020351.png"
              alt=""
              className="w-10"
            />
            <h1 className="text-2xl font-semibold">Sign Up</h1>
          </div>
          <p className="text-sm text-gray-500">to continue to YouTube</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              placeholder="Your name"
              className="border p-2 rounded-md outline-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Email</label>
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
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>
        <Link
          to={"/login"}
          className="flex justify-end text-blue-500 text-xs mt-2 hover:underline"
        >
          Login
        </Link>
        <div className="text-center text-sm text-gray-400 my-4">or</div>

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

export default Register;
