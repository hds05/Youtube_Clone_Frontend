import React from "react";

// importing Link for navigation and useRouteError to catch route errors
import { Link, useRouteError } from "react-router-dom";

// ErrorPage component
function ErrorPage() {

  // getting error object from react-router
  const error = useRouteError();

  // logging error in console for debugging
  console.log(error);

  return (

    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-black text-white">

      {/* main heading */}
      <h1 className="text-6xl font-bold">Oops!</h1>

      {/* short error message */}
      <p className="text-xl">Something went wrong 😢</p>

      {/* showing error status code and status text */}
      <p className="text-white">
        {error?.status}: {error.statusText}
      </p>

      {/* showing actual error message if available */}
      <p>{`(${error?.error?.message})`}</p>

      {/* button to navigate back to homepage */}
      <Link
        to="/"
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

// exporting ErrorPage component
export default ErrorPage;