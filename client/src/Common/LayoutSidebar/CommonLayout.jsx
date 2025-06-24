import React, { useState } from 'react'
import CommonSidebar from './CommonSideBar'
import TopNavbar from './TopNavbar'
import MobileNavbar from './MobileNavbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-[#0E0E0E]">
      <CommonSidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isSidebarCollapsed ? 'sm:ml-16' : 'sm:ml-64'
        }`}
      >
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-24 sm:pb-6">
          <Outlet />
        </main>

        {/* Mobile Bottom Navbar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40">
          <MobileNavbar />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
