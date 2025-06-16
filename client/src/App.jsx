import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// Common & Auth Pages
import SignUp from './Common/LoginSignup/SignUp'
import Login from './Common/LoginSignup/Login'
import VerifyOtp from './Common/LoginSignup/VerifyOtp'
import ResetPassword from './Common/LoginSignup/ResetPassword'
import CheckEmailPage from './Common/LoginSignup/CheckEmailpage'
import HomePage from './Common/HomePage'
import Navbar from './Common/Navbar'

// Shared Program Pages
import ProgramsPage from './Common/ProgramsPage'
import ProgramMainDetail from './CompanyComponents/Programs/ProgramData/ProgramMainDetail'

// Hacker Pages
import HackerDashboard from './Hackerpages/HackerDashboard'
import HackerSettings from './Hackerpages/HackerSettings'
import HackerLeaderboard from './HackerPages/HackerLeaderboard'
import HackerBounties from './HackerPages/HackerBounties'
import HackerReports from './HackerPages/HackerReports'
import HackerAllReports from './Hackerpages/HackerAllReports'

// Company Pages

import CompanyDashboard from './CompanyPages/CompanyDashboard'
import CompanySetting from './CompanyPages/CompanySetting'
import CompanyLeaderBoard from './CompanyPages/CompanyLeaderboard'
import CompanyAssets from './CompanyPages/CompanyAssets'
import CompanyBounties from './CompanyPages/CompanyBounties'
import ProgramList from './CompanyComponents/Programs/ProgramDetails/ProgramList'

// Triager Pages

import TriagerDashboard from './TriagerPages/TriagerDashboard'
import UsersData from './TriagerPages/UsersData'
import TrigerReports from './TriagerPages/TrigerReports'

// Admin Pages
import AdminLogin from './AdminLogin'
import AdminHome from './AdminPages/AdminHome'

// Chat
import ChatRoom from './chat/ChatRoom'

// Protection Wrapper
import ProtectedRoute from './ProtectedRoute'
import CompanyReports from './CompanyPages/CompanyReports'
import VrtData from './Common/VrtData'
import CommonLayout from './Common/LayoutSidebar/CommonLayout'
import ProgramCreation from './CompanyComponents/CreateProgram/ProgramCreation'

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('token')
      const storedUserType = localStorage.getItem('userType')
      if (storedToken && storedUserType) {
        dispatch({
          type: 'auth/setAuth',
          payload: { token: storedToken, userType: storedUserType },
        })
      }
    }
  }, [dispatch, token])

  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white flex-col">
      {!token && <Navbar />}

      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/checkemail" element={<CheckEmailPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:programId" element={<ProgramMainDetail />} />
          <Route path="/vrt" element={<VrtData />} />

          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* ROUTE FOR THE INTERNAL WORKING */}
          <Route
            element={
              <ProtectedRoute typeUser={['admin', 'triager', 'company']}>
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/reports/:programId" element={<TrigerReports />} />
          </Route>

          {/* 2nd */}
          <Route
            element={
              <ProtectedRoute
                typeUser={['admin', 'triager', 'company', 'hacker']}
              >
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/chat/:reportId" element={<ChatRoom />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute typeUser={['admin']}>
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<AdminHome />} />
          </Route>

          {/* Hacker Routes */}
          <Route
            path="/hacker/*"
            element={
              <ProtectedRoute typeUser={['hacker', 'triager']}>
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<HackerDashboard />} />
            <Route path="setting" element={<HackerSettings />} />
            <Route path="leaderboard" element={<HackerLeaderboard />} />
            <Route path="bounties" element={<HackerBounties />} />
            <Route path="report/:id" element={<HackerReports />} />
            {/* <Route path="chat/:reportId" element={<ChatRoom />} /> */}
            <Route path="reports" element={<HackerAllReports />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="programs/:programId" element={<ProgramMainDetail />} />
          </Route>

          {/* Company Routes */}
          <Route
            path="/company/*"
            element={
              <ProtectedRoute typeUser="company">
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="setting" element={<CompanySetting />} />
            <Route path="leaderboard" element={<CompanyLeaderBoard />} />
            <Route path="assets" element={<CompanyAssets />} />
            <Route path="bounties" element={<CompanyBounties />} />
            <Route path="reports" element={<CompanyReports />} />
            <Route path="programs" element={<ProgramList />} />
            <Route path="programs/:programId" element={<ProgramMainDetail />} />
          </Route>

           <Route path="addprogram" element={<ProgramCreation />} />

          {/* Triager Routes */}
          <Route
            path="/triager/*"
            element={
              <ProtectedRoute typeUser="triager">
                <CommonLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<TriagerDashboard />} />
            <Route path="users" element={<UsersData />} />
            <Route path="reports/:programId" element={<TrigerReports />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="programs/:programId" element={<ProgramMainDetail />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
