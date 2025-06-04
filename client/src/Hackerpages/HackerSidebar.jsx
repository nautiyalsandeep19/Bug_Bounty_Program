import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../Common/LoginSignup/Logout'
import {
  FaTachometerAlt,
  FaBug,
  FaCrown,
  FaGift,
  FaCog,
  FaList,
} from 'react-icons/fa'

const HackerSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
      isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
    }`

  return (
    <div className="w-64 bg-[#121212] p-4 hidden sm:block fixed top-0 h-screen overflow-y-auto z-10 border-r-1 border-blue-500 ">
      <h1 className="text-blue-500 text-3xl font-bold mb-8">Versantix</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/hacker/dashboard" className={linkClass}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/hacker/programs" className={linkClass}>
          <FaList /> Programs
        </NavLink>
        <NavLink to="/hacker/report" className={linkClass}>
          <FaBug /> Reports
        </NavLink>
        <NavLink to="/hacker/leaderboard" className={linkClass}>
          <FaCrown /> Leaderboard
        </NavLink>
        <NavLink to="/hacker/bounties" className={linkClass}>
          <FaGift /> Bounties
        </NavLink>
        <NavLink to="/hacker/setting" className={linkClass}>
          <FaCog /> Settings
        </NavLink>
        <NavLink to="/hacker/chat/683edea9dc6aa4314fc5e527" className={linkClass}>
          <FaList /> Chat
        </NavLink>
        <Logout />
      </nav>
    </div>
  )
}

export default HackerSidebar
