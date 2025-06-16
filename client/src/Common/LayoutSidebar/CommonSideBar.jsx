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
  FaUsers,
} from 'react-icons/fa'
import Logout from '../LoginSignup/Logout'
import { useSelector } from 'react-redux'

const CommonSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { userType } = useSelector((state) => state.auth)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
    }`

  const commonLinks = {
    hacker: [
      {
        to: '/hacker/dashboard',
        label: 'Dashboard',
        icon: <FaTachometerAlt />,
      },
      { to: '/hacker/programs', label: 'Programs', icon: <FaList /> },
      { to: '/hacker/reports', label: 'Reports', icon: <FaBug /> },
      { to: '/hacker/leaderboard', label: 'Leaderboard', icon: <FaCrown /> },
      { to: '/hacker/bounties', label: 'Bounties', icon: <FaGift /> },
      { to: '/hacker/setting', label: 'Settings', icon: <FaCog /> },
    ],
    company: [
      {
        to: '/company/dashboard',
        label: 'Dashboard',
        icon: <FaTachometerAlt />,
      },
      { to: '/company/programs', label: 'Programs', icon: <FaList /> },
      { to: '/company/assets', label: 'Assets', icon: <FaBug /> },
      { to: '/company/leaderboard', label: 'Campaigns', icon: <FaCrown /> },
      { to: '/company/bounties', label: 'Bounties', icon: <FaGift /> },
      { to: '/company/reports', label: 'Reports', icon: <FaBug /> },
      { to: '/company/setting', label: 'Settings', icon: <FaCog /> },
    ],
    triager: [
      {
        to: '/triager/dashboard',
        label: 'Dashboard',
        icon: <FaTachometerAlt />,
      },
      { to: '/triager/programs', label: 'Programs', icon: <FaList /> },
      { to: '/triager/users', label: 'Users', icon: <FaUsers /> },
      { to: '/triager/reports/all', label: 'Reports', icon: <FaBug /> },
      { to: '/triager/setting', label: 'Settings', icon: <FaCog /> },
    ],
    admin: [
      { to: '/admin/home', label: 'Dashboard', icon: <FaTachometerAlt /> },
    ],
  }

  const links = commonLinks[userType] || []

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden bg-[#121212] p-4 flex justify-between items-center z-50 relative">
        <h1 className="text-blue-500 text-2xl font-bold">Versantix</h1>
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } sm:block w-64 bg-[#121212] p-4 fixed sm:relative h-full sm:h-screen z-50`}
      >
        <h1 className="text-blue-500 text-2xl font-bold mb-10 sm:block hidden">
          Versantix
        </h1>
        <nav className="flex flex-col gap-4 mt-6 sm:mt-0">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-4">
          <Logout />
        </div>
      </div>

      {/* Background overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}

export default CommonSidebar
