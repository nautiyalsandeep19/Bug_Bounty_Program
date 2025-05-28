import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import SignUp from './Common/LoginSignup/SignUp'
import Login from './Common/LoginSignup/Login'
import VerifyOtp from './Common/LoginSignup/VerifyOtp'
import ResetPassword from './Common/LoginSignup/ResetPassword'
import CheckEmailPage from './Common/LoginSignup/CheckEmailpage'
import ProgramsPage from './Common/ProgramsPage'
import HackerLayout from './Layouts/HackerLayout'
import CompanyLayout from './Layouts/CompanyLayout'
import HackerDashboard from './Hackerpages/HackerDashboard'
import HackerSettings from './Hackerpages/HackerSettings'
import HackerLeaderboard from './HackerPages/HackerLeaderboard'
import HackerBounties from './HackerPages/HackerBounties'
import HackerReports from './HackerPages/HackerReports'
import CompanyDashboard from './CompanyPages/CompanyDashboard'
import CompanySetting from './CompanyPages/CompanySetting'
import CompanyLeaderBoard from './CompanyPages/CompanyLeaderboard'
import CompanyAssets from './CompanyPages/CompanyAssets'
import CompanyBounties from './CompanyPages/CompanyBounties'
import ProgramList from './CompanyComponents/Programs/ProgramDetails/ProgramList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0e0e0e] text-white">
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Public / Auth Routes (No sidebar) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/checkemail" element={<CheckEmailPage />} />

          {/* Hacker Routes with HackerSidebar */}
          <Route path="/hacker/*" element={<HackerLayout />}>
            <Route path="dashboard" element={<HackerDashboard />} />
            <Route path="setting" element={<HackerSettings />} />
            <Route path="leaderboard" element={<HackerLeaderboard />} />
            <Route path="bounties" element={<HackerBounties />} />
            <Route path="report" element={<HackerReports />} />
            <Route path="programs" element={<ProgramsPage />} />
          </Route>

          {/* Company Routes with CompanySidebar */}
          <Route path="/company/*" element={<CompanyLayout />}>
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="setting" element={<CompanySetting />} />
            <Route path="leaderboard" element={<CompanyLeaderBoard />} />
            <Route path="assets" element={<CompanyAssets />} />
            <Route path="bounties" element={<CompanyBounties />} />
            <Route path="programs" element={<ProgramList />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
