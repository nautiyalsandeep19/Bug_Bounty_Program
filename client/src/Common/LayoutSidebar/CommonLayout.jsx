import { Outlet } from 'react-router'
import CommonSidebar from './CommonSideBar'

const CommonLayout = () => {
  return (

    <div className="flex ml-70">
      <CommonSidebar />

      <div className="w-full overflow-y-auto">

        <Outlet />
      </div>
    </div>
  )
}

export default CommonLayout
