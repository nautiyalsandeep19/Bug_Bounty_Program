import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaBug,
  FaCrown,
  FaGift,
  FaCog,
  FaList,
  FaUsers,
} from 'react-icons/fa'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Logout from '../LoginSignup/Logout'
import { useSelector } from 'react-redux'
import TopNavbar from './TopNavbar'

const CommonSidebar = ({ isCollapsed, toggleCollapse }) => {
  const { userType } = useSelector((state) => state.auth)

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded ${
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
      { to: '/company/programs', label: 'My Programs', icon: <FaList /> },
      { to: '/company/reports', label: 'Bug Reports', icon: <FaBug /> },
      { to: '/company/reports', label: 'Researchers', icon: <FaCrown /> },
      { to: '/company/assets', label: 'Assets', icon: <FaBug /> },
      { to: '/company/leaderboard', label: 'Campaigns', icon: <FaCrown /> },
      { to: '/company/bounties', label: 'Bounties', icon: <FaGift /> },
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
    <div

      className={`fixed top-0 left-0 h-full z-10 bg-primarybg border-r border-green-500 transition-all duration-300

        hidden sm:flex flex-col
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-2">
        <button onClick={toggleCollapse} className="text-white">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Logo + Desktop TopNavbar */}
      {!isCollapsed && (
        <>
          <h1 className="text-green-500 text-2xl font-bold mb-2 px-4">
            Versantix
          </h1>
        </>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3 px-2 mt-4">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={navLinkClass}>
            <span className="text-lg">{link.icon}</span>
            {!isCollapsed && link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 px-2">{!isCollapsed && <Logout />}</div>
    </div>
  )
}

export default CommonSidebar
