import { Outlet } from 'react-router-dom'
import HackerSidebar from '../HackerPages/HackerSidebar'

const HackerLayout = () => (
  <div className="flex">
    <HackerSidebar />
    <div className="sm:ml-64 flex-1 p-4">
      <Outlet />
    </div>
  </div>
)

export default HackerLayout
