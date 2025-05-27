import SignUp from './Common/LoginSignup/SignUp'
import Login from './Common/LoginSignup/Login'
import VerifyOtp from './Common/LoginSignup/VerifyOtp'
import ResetPassword from './Common/LoginSignup/ResetPassword'
import CheckEmailPage from './Common/LoginSignup/CheckEmailpage'
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import Sidebar from './HackerPages/HackerSidebar'
import HackerSettings from './Hackerpages/HackerSettings'
import HackerDashboard from './Hackerpages/HackerDashboard'
import HackerLeaderboard from './HackerPages/HackerLeaderboard'
import HackerBounties from './HackerPages/HackerBounties'
import HackerReports from './HackerPages/HackerReports'
import ProgramsPage from './Common/ProgramsPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const hideSidebarRoutes = [
    '/addprogram',
    '/signup',
    '/login',
    '/verifyOtp',
    '',
  ]
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [])
  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1  overflow-y-auto">
        <Routes>
          {/* common routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
          <Route path="checkemail" element={<CheckEmailPage />} />

          <Route path="/programs" element={<ProgramsPage />} />

          <Route path="hacker/setting" element={<HackerSettings />} />
          <Route path="hacker/dashboard" element={<HackerDashboard />} />
          <Route path="hacker/leaderboard" element={<HackerLeaderboard />} />
          <Route path="hacker/bounties" element={<HackerBounties />} />
          <Route path="hacker/report" element={<HackerReports />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
