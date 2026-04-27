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
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet />
      

    </>
  )
}

export default App
