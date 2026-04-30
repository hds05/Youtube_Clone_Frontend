import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import VideoPlayer from './Pages/VideoPlayer.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { SearchProvider } from '../context/SearchContext.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/video/:id',
        element: <VideoPlayer />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>,
)
