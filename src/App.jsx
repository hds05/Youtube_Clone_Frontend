import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "md:ml-0"}`}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
