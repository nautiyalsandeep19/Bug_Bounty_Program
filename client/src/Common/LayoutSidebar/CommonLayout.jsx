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

import React from 'react'
import CommonSidebar from './CommonSidebar'
import TopNavbar from './TopNavbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#0E0E0E]">
      <CommonSidebar />
      <div className="flex-1 ml-0 sm:ml-64 flex flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
