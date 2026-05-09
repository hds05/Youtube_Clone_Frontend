import { useState } from 'react'
// importing App.css
import './App.css'
// importing Header component
import Header from './components/Header'
// importing Sidebar component
import Sidebar from './components/Sidebar'
// importing Outlet for nested routing
import { Outlet } from 'react-router-dom'

function App() {
 // state to control sidebar open/close
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    {/* Header component */}
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />
      {/* main layout container */}
      <div className="flex">
        {/* sidebar component */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* main content section */}
        <div className={`flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "md:ml-0"}`}>
          {/* renders nested routes */}
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
