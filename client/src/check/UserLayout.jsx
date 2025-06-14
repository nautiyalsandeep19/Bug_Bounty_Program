// src/Layouts/UserLayout.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  const token = useSelector((state) => state.auth.token)

  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white">
      {token && <Sidebar />}
      <div className="flex-1 sm:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
