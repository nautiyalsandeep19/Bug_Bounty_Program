import { Outlet } from 'react-router-dom'
import CompanySidebar from '../CompanyPages/CompanySidebar'

const CompanyLayout = () => (
  <div className="flex">
    <CompanySidebar />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
)

export default CompanyLayout
