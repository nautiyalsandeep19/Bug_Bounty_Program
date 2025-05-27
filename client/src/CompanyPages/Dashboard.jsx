import React from 'react'
import {
  FiActivity,
  FiAirplay,
  FiUsers,
  FiDollarSign,
  FiBriefcase,
  FiAward,
} from 'react-icons/fi'

const Dashboard = () => {
  // Sample company data - replace with your actual data
  const companyInfo = {
    name: 'Versantix',
    industry: 'Cybersecurity',
    founded: '2015',
    employees: 245,
    location: 'San Francisco, CA',
    description:
      'Leading provider of bug bounty and vulnerability disclosure solutions.',
  }

  const stats = [
    {
      title: 'Active Programs',
      value: '6',
      icon: <FiAirplay className="text-2xl" />,
    },
    {
      title: 'Total Hackers',
      value: '100+',
      icon: <FiUsers className="text-2xl" />,
    },
    {
      title: 'Bounties Paid',
      value: '2,84,500',
      icon: <FiDollarSign className="text-2xl" />,
    },
    {
      title: 'Critical Fixes',
      value: '50',
      icon: <FiAward className="text-2xl" />,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'New program launched',
      time: '2 hours ago',
      program: 'Public Bug Bounty',
    },
    {
      id: 2,
      action: 'Critical vulnerability fixed',
      time: '1 day ago',
      hacker: 'security_expert',
    },
    {
      id: 3,
      action: 'New team member joined',
      time: '2 days ago',
      name: 'Alex Morgan',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 h-[50vh] sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Company Dashboard</h1>
        <p className="text-lg text-gray-300 mt-2">
          Welcome back! Here's what's happening with {companyInfo.name} today.
        </p>
      </div>

      {/* Company Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 h-2/3">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          Company Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              {companyInfo.name}
            </h3>
            <p className="text-gray-700 mb-4 text-sm">
              {companyInfo.description}
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <FiBriefcase className="mr-2 text-xs" /> Industry:{' '}
                {companyInfo.industry}
              </p>
              <p className="text-gray-600 text-sm">
                Founded: {companyInfo.founded}
              </p>
              <p className="text-gray-600 text-sm">
                Employees: {companyInfo.employees}
              </p>
              <p className="text-gray-600 text-sm">
                Location: {companyInfo.location}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-5xl text-blue-600">VerSantix</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-start"
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white text-gray-500 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              {activity.program && (
                <p className="text-sm text-blue-600 mt-1">
                  Program: {activity.program}
                </p>
              )}
              {activity.hacker && (
                <p className="text-sm text-green-600 mt-1">
                  Hacker: {activity.hacker}
                </p>
              )}
              {activity.name && (
                <p className="text-sm text-purple-600 mt-1">
                  Name: {activity.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
