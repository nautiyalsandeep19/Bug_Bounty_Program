import { Outlet } from 'react-router'
import CommonSidebar from './CommonSideBar'

const CommonLayout = () => {
  return (
    <div className="flex">
      <CommonSidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default CommonLayout
