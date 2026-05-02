import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import { SearchProvider } from "../context/SearchContext.jsx";
import Loader from "./components/Loader.jsx";

const HomePage = lazy(() => import("./Pages/HomePage.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Register = lazy(() => import("./Pages/Register.jsx"));
const VideoPlayer = lazy(() => import("./Pages/VideoPlayer.jsx"));
const ChannelPage = lazy(() => import("./Pages/ChannelPage.jsx"));
const CreateChannel = lazy(() => import("./Pages/CreateChannel.jsx"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (<Suspense fallback={<Loader />}>
      <NotFoundPage />
    </Suspense>),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
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
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
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
      },
      {
        path: "/channel",
        element: (
          <Suspense fallback={<Loader />}>
            <ChannelPage />
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
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>,
);
