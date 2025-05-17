import SignUp from './Components/LoginSignup/SignUp'
import Login from './Components/LoginSignup/Login'
import VerifyOtp from './Components/LoginSignup/VerifyOtp'
import ResetPassword from './Components/LoginSignup/ResetPassword'
import CheckEmailPage from './Components/LoginSignup/CheckEmailpage'
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import Sidebar from './Components/Sidebar/Sidebar'
import Dashboard from './Pages/Dashboard'
// import Programs from './components/Programs/ProgramDetails/ProgramList'
// import ProgramDetail from './components/Programs/ProgramData/ProgramMainDetail'
import Reports from './Pages/Reports'
import Leaderboard from './Pages/Leaderboard'
import Bounties from './Pages/Bounties'
import Settings from './Pages/Settings'
import ProgramCreation from './components/CreateProgram/CreateProgramModal'

import ProgramsPage from './Pages/ProgramsPage'
import HackerSettings from './Hackerpages/HackerSettings'
import HackerDashboard from './Hackerpages/HackerDashboard'

// import Editor from './Components/HackerComponents/Editior'
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
          <Route path="checkemail" element={<CheckEmailPage />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/programs" element={<ProgramsPage />} />
          {/* <Route path="/program/:slug" element={<ProgramDetail />} /> */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/bounties" element={<Bounties />} />
          {/* <Route path="/settings" element={<Settings />} /> */}

          <Route path="/addprogram" element={<ProgramCreation />} />

          {/* Routes for the hackers */}

          <Route path="hacker/setting" element={<HackerSettings />} />
          <Route path="hacker/dashboard" element={<HackerDashboard />} />

          {/* editior */}

          {/* <Route path="/editor" element={<Editor />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
