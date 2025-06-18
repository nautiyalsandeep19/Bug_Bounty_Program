// import { Outlet } from 'react-router'
// import CommonSidebar from './CommonSideBar'

// const CommonLayout = () => {
//   return (

//     <div className="flex ml-70">
//       <CommonSidebar />

//       <div className="w-full overflow-y-auto">

//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default CommonLayout

import React, { useState } from 'react'
import CommonSidebar from './CommonSidebar'
import TopNavbar from './TopNavbar'
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
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
