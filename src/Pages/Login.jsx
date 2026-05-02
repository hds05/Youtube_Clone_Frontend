import axios from "axios";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      // const userData = {
      //   email, password
      // };
      console.log(res);
      // localStorage.setItem("token", res.data.token)
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.user, res.data.token);

      navigate("/");
    } catch (err) {
      console.log(err.message);
      alert(err.response?.data?.message || "Something went wrong!!!");
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

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Sign in
          </button>
        </form>
        <Link
          to={"/register"}
          className="flex justify-end text-blue-500 hover:underline text-xs mt-2"
        >
          Create account
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

export default Login;
