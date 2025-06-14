import React, { useState } from 'react'
import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  Bug,
  Crown,
  Gift,
  Cog,
  List,
  Users,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import Logout from '../Common/LoginSignup/Logout'
import clsx from 'clsx'

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const userType = useSelector((state) => state.auth.userType)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const toggleCollapse = () => setCollapsed(!collapsed)

  const navLinkClass = ({ isActive }) =>
    clsx(
      'flex items-center gap-2 p-2 rounded transition-colors duration-200 text-sm font-medium',
      isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'
    )

  const iconSize = 20

  const roleBasedLinks = {
    hacker: [
      {
        to: '/dashboard',
        icon: <LayoutDashboard size={iconSize} />,
        label: 'Dashboard',
      },
      { to: '/programs', icon: <List size={iconSize} />, label: 'Programs' },
      {
        to: '/reports',
        icon: <Bug size={iconSize} />,
        label: 'Reports',
      },
      {
        to: '/leaderboard',
        icon: <Crown size={iconSize} />,
        label: 'Leaderboard',
      },
      {
        to: '/hacker/bounties',
        icon: <Gift size={iconSize} />,
        label: 'Bounties',
      },
      {
        to: '/hacker/setting',
        icon: <Cog size={iconSize} />,
        label: 'Settings',
      },
    ],
    company: [
      {
        to: '/company/dashboard',
        icon: <LayoutDashboard size={iconSize} />,
        label: 'Dashboard',
      },
      {
        to: '/company/programs',
        icon: <List size={iconSize} />,
        label: 'Programs',
      },
      { to: '/company/assets', icon: <Bug size={iconSize} />, label: 'Assets' },
      {
        to: '/company/leaderboard',
        icon: <Crown size={iconSize} />,
        label: 'Campaigns',
      },
      {
        to: '/company/setting',
        icon: <Cog size={iconSize} />,
        label: 'Settings',
      },
    ],
    triager: [
      {
        to: '/triager/dashboard',
        icon: <LayoutDashboard size={iconSize} />,
        label: 'Dashboard',
      },
      {
        to: '/triager/programs',
        icon: <List size={iconSize} />,
        label: 'Programs',
      },
      { to: '/triager/users', icon: <Users size={iconSize} />, label: 'Users' },
      {
        to: '/triager/reports/all',
        icon: <Bug size={iconSize} />,
        label: 'Reports',
      },
      {
        to: '/triager/setting',
        icon: <Cog size={iconSize} />,
        label: 'Settings',
      },
    ],
    admin: [
      {
        to: '/admin/home',
        icon: <ShieldCheck size={iconSize} />,
        label: 'Admin Home',
      },
      {
        to: '/admin/setting',
        icon: <Cog size={iconSize} />,
        label: 'Settings',
      },
    ],
  }

  const links = roleBasedLinks[userType] || []

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden bg-[#121212] p-4 flex justify-between items-center z-50 relative">
        <h1 className="text-blue-500 text-2xl font-bold">Versantix</h1>
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={clsx(
          isMobileMenuOpen ? 'block' : 'hidden',
          'sm:block bg-[#121212] p-4 fixed sm:relative h-full sm:h-screen z-50 transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Collapse Button */}
        <div className="hidden sm:flex justify-between items-center mb-4">
          {!collapsed && (
            <h1 className="text-blue-500 text-2xl font-bold">Versantix</h1>
          )}
          <button
            onClick={toggleCollapse}
            className="text-white bg-[#1f1f1f] p-2 rounded"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              <div className="w-6">{icon}</div>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4">{!collapsed && <Logout />}</div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}

export default Sidebar
