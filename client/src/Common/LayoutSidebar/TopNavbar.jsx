import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../index.css'

const routeTitles = {
  dashboard: {
    title: 'Dashboard',
    subtitle: (name) => `Welcome back, ${name || 'User'}`,
  },
  reports: {
    title: 'Reports',
    subtitle: () => 'Track all submitted vulnerabilities',
  },
  programs: {
    title: 'Programs',
    subtitle: () => 'Explore available security programs',
  },
  leaderboard: {
    title: 'Leaderboard',
    subtitle: () => 'Top performers across the platform',
  },
  bounties: {
    title: 'Bounties',
    subtitle: () => 'Track your earnings and open bounties',
  },
  setting: {
    title: 'Settings',
    subtitle: () => 'Manage your account and preferences',
  },
  users: {
    title: 'Users',
    subtitle: () => 'Manage hacker accounts and permissions',
  },
}

const TopNavbar = () => {
  const { pathname } = useLocation()
  const { user } = useSelector((state) => state.auth)

  const pathSegments = pathname.split('/').filter(Boolean)
  const lastPath = pathSegments[pathSegments.length - 1] || 'dashboard'
  const content = routeTitles[lastPath] || routeTitles['dashboard']

  return (
    <div className="w-full sticky top-0 z-50 bg-[--color-primaryBlue] text-[--color-primary] px-6 py-4 flex justify-between items-center border-b border-[#2a2a2a] h-20">
      <div>
        <h2 className="text-lg font-semibold">{content.title}</h2>
        <p className="text-sm text-[--color-primary]">
          {typeof content.subtitle === 'function'
            ? content.subtitle(user?.name)
            : content.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={user?.image || '/default-avatar.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-600 object-cover"
        />
      </div>
    </div>
  )
}

export default TopNavbar
