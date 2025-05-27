import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaBug,
  FaCrown,
  FaGift,
  FaCog,
  FaList,
  FaBars,
  FaTimes,
} from 'react-icons/fa'

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="sm:hidden bg-[#121212] p-4 flex justify-between items-center">
        <h1 className="text-green-500 text-2xl font-bold ">Versantix</h1>
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop (always visible on sm+) and Mobile (conditional) */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } sm:block w-full sm:w-64 bg-[#121212] p-4 fixed sm:relative h-full z-50`}
      >
        {/* Close button for mobile */}
        <div className="sm:hidden flex justify-between items-center mb-4">
          <h1 className="text-green-500 mt-20 text-2xl font-bold">Versantix</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <h1 className="text-green-500 mt-5 text-2xl font-bold mb-10">
            Versantix
          </h1>
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/programs"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
              }`
            }
          >
            <FaList /> Programs
          </NavLink>
          <NavLink
            to="/reports"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
              }`
            }
          >
            <FaBug /> Assets
          </NavLink>
          <NavLink
            to="/leaderboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
              }`
            }
          >
            <FaCrown /> Campaigns
          </NavLink>
          <NavLink
            to="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
              }`
            }
          >
            <FaCog /> Settings
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  )
}

export default Sidebar
