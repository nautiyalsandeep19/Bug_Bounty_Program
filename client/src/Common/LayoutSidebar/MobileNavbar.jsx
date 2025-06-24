import React from 'react'
import { NavLink } from 'react-router'
import {
  FaTachometerAlt,
  FaBug,
  FaCrown,
  FaGift,
  FaCog,
  FaList,
  FaUsers,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'

const MobileNavbar = () => {
  const { userType } = useSelector((state) => state.auth)

  const iconSize = 20
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center text-xs ${
      isActive ? 'text-blue-400' : 'text-gray-400'
    }`

  const commonLinks = {
    hacker: [
      {
        to: '/hacker/dashboard',
        label: 'Home',
        icon: <FaTachometerAlt size={iconSize} />,
      },
      {
        to: '/hacker/programs',
        label: 'Programs',
        icon: <FaList size={iconSize} />,
      },
      {
        to: '/hacker/reports',
        label: 'Reports',
        icon: <FaBug size={iconSize} />,
      },
      {
        to: '/hacker/leaderboard',
        label: 'Leaderboard',
        icon: <FaCrown size={iconSize} />,
      },
      {
        to: '/hacker/setting',
        label: 'Settings',
        icon: <FaCog size={iconSize} />,
      },
    ],
    company: [
      {
        to: '/company/dashboard',
        label: 'Home',
        icon: <FaTachometerAlt size={iconSize} />,
      },
      {
        to: '/company/programs',
        label: 'Programs',
        icon: <FaList size={iconSize} />,
      },
      {
        to: '/company/reports',
        label: 'Reports',
        icon: <FaBug size={iconSize} />,
      },
      {
        to: '/company/leaderboard',
        label: 'Campaigns',
        icon: <FaCrown size={iconSize} />,
      },
      {
        to: '/company/setting',
        label: 'Settings',
        icon: <FaCog size={iconSize} />,
      },
    ],
    triager: [
      {
        to: '/triager/dashboard',
        label: 'Home',
        icon: <FaTachometerAlt size={iconSize} />,
      },
      {
        to: '/triager/programs',
        label: 'Programs',
        icon: <FaList size={iconSize} />,
      },
      {
        to: '/triager/reports/all',
        label: 'Reports',
        icon: <FaBug size={iconSize} />,
      },
      {
        to: '/triager/users',
        label: 'Users',
        icon: <FaUsers size={iconSize} />,
      },
      {
        to: '/triager/setting',
        label: 'Settings',
        icon: <FaCog size={iconSize} />,
      },
    ],
    admin: [
      {
        to: '/admin/home',
        label: 'Dashboard',
        icon: <FaTachometerAlt size={iconSize} />,
      },
    ],
  }

  const links = commonLinks[userType] || []

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-blue-500 flex justify-around py-2 z-40">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={navLinkClass}>
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNavbar
