import React from 'react'
import { Outlet } from 'react-router-dom'
import TriagerSidebar from '../TriagerPages/TriagerSidebar'

const TriagerLayout = () => {
  return (
    <div className="flex">
      <TriagerSidebar />
      <div className="sm:ml-64 flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default TriagerLayout
