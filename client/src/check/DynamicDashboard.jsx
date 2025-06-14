// src/Common/DynamicDashboard.jsx
import { useSelector } from 'react-redux'
import HackerDashboard from '../Hackerpages/HackerDashboard'
import CompanyDashboard from '../CompanyPages/CompanyDashboard'
import TriagerDashboard from '../TriagerPages/TriagerDashboard'
import AdminHome from '../AdminPages/AdminHome'

const DynamicDashboard = () => {
  const userType = useSelector((state) => state.auth.userType)

  switch (userType) {
    case 'hacker':
      return <HackerDashboard />
    case 'company':
      return <CompanyDashboard />
    case 'triager':
      return <TriagerDashboard />
    case 'admin':
      return <AdminHome />
    default:
      return <div>User type not recognized</div>
  }
}

export default DynamicDashboard
