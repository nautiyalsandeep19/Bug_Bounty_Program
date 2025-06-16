import { Outlet } from 'react-router'
import CommonSidebar from './CommonSideBar'

const CommonLayout = () => {
  return (
    <div className="flex  bg-[#0e0e0e] text-white ">
      {/* Sidebar stays fixed */}
      <CommonSidebar />
      {/* Main content scrolls */}
      <div className="flex-1 min-h-screen overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default CommonLayout
