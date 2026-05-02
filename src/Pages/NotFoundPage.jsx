import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-black text-white">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-xl">Something went wrong 😢</p>
      <p className="text-white">{error?.status}: {error.statusText}</p>
      <p>{`(${error?.error?.message})`}</p>

      <Link
        to="/"
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
