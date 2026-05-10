// importing React utilities
import { lazy, StrictMode, Suspense } from "react";
// importing createRoot to render React app
import { createRoot } from "react-dom/client";
// importing global CSS file 
import "./index.css";
// importing main App component
import App from "./App.jsx";
// importing router utilities
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// importing authentication context provider
import { AuthProvider } from "../context/AuthContext.jsx";
// importing search context provider
import { SearchProvider } from "../context/SearchContext.jsx";
// importing loader component for lazy loading fallback
import Loader from "./components/Loader.jsx";

// lazy loading pages for code splitting and better performance
const HomePage = lazy(() => import("./Pages/HomePage.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Register = lazy(() => import("./Pages/Register.jsx"));
const VideoPlayer = lazy(() => import("./Pages/VideoPlayer.jsx"));
const ChannelPage = lazy(() => import("./Pages/ChannelPage.jsx"));
const CreateChannel = lazy(() => import("./Pages/CreateChannel.jsx"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage.jsx"));

// creating application router
const appRouter = createBrowserRouter([
  {
    // root route
    path: "/",
    // rendering App component
    element: <App />,
    // rendering custom error page if route fails
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFoundPage />
      </Suspense>
    ),
    // nested routes
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <VideoPlayer />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/channel",
        element: (
          <Suspense fallback={<Loader />}>
            <ChannelPage />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "/createChannel",
        element: (
          <Suspense fallback={<Loader />}>
            <CreateChannel />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    {/* providing authentication context globally */}
    <AuthProvider>
      {/* providing search context globally */}
      <SearchProvider>
        {/* router provider for handling routes */}
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </AuthProvider>
  </>,
);
