// import { Routes, Route } from 'react-router'
// import SignUp from './Common/LoginSignup/SignUp'
// import Login from './Common/LoginSignup/Login'
// import VerifyOtp from './Common/LoginSignup/VerifyOtp'
// import ResetPassword from './Common/LoginSignup/ResetPassword'
// import CheckEmailPage from './Common/LoginSignup/CheckEmailpage'
// import ProgramsPage from './Common/ProgramsPage'
// import HackerLayout from './Layouts/HackerLayout'
// import CompanyLayout from './Layouts/CompanyLayout'
// import HackerDashboard from './Hackerpages/HackerDashboard'
// import HackerSettings from './Hackerpages/HackerSettings'
// import HackerLeaderboard from './HackerPages/HackerLeaderboard'
// import HackerBounties from './HackerPages/HackerBounties'
// import HackerReports from './HackerPages/HackerReports'
// import CompanyDashboard from './CompanyPages/CompanyDashboard'
// import CompanySetting from './CompanyPages/CompanySetting'
// import CompanyLeaderBoard from './CompanyPages/CompanyLeaderboard'
// import CompanyAssets from './CompanyPages/CompanyAssets'
// import CompanyBounties from './CompanyPages/CompanyBounties'
// import ProgramList from './CompanyComponents/Programs/ProgramDetails/ProgramList'
// import ProtectedRoute from './ProtectedRoute'
// import ProgramFlow from './CompanyComponents/CreateProgram/ProgramCreation'
// import ProgramMainDetail from './CompanyComponents/Programs/ProgramData/ProgramMainDetail'
// import ChatRoom from './chat/ReportChat'
// import ProgramCreation from './CompanyComponents/CreateProgram/ProgramCreation'

// import AdminLogin from './AdminLogin'
// import AdminHome from './AdminPages/AdminHome'
// import AdminLayout from './Layouts/AdminLayout'
// import TriagerLayout from './Layouts/TriagerLayout'
// import TriagerDashboard from './TriagerPages/TriagerDashboard'
// import UsersData from './TriagerPages/UsersData'
// import TrigerReports from './TriagerPages/TrigerReports'
// import HackerAllReports from './Hackerpages/HackerAllReports'
// import HomePage from './Common/HomePage'
// import Navbar from './Common/Navbar'
// import { useEffect, useState } from 'react'

// function App() {
//   const [token, setToken] = useState(null)

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token')
//     setToken(storedToken)
//   })

//   return (
//     <div className="flex min-h-screen bg-[#0e0e0e] text-white flex-col">
//       {!token && <Navbar />}
//       <main className="flex-1 overflow-y-auto ">
//         {/* {!token ? <Navbar /> : ''} */}
//         <Routes>
//           {/* MAIN ROUTE HOME PUBLIC ROUTES*/}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/programs" element={<ProgramsPage />} />
//           <Route path="/programs/:programId" element={<ProgramMainDetail />} />

//           {/* Public / Auth Routes (No sidebar) */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/verifyOtp" element={<VerifyOtp />} />
//           <Route path="/resetPassword/:token" element={<ResetPassword />} />
//           <Route path="/checkemail" element={<CheckEmailPage />} />

//           {/* Admin Routes */}
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <Route
//             path="/admin/*"
//             element={
//               <ProtectedRoute typeUser={['admin']}>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="home" element={<AdminHome />} />
//           </Route>

//           {/* Triager route */}
//           <Route
//             path="/triager/*"
//             element={
//               <ProtectedRoute typeUser={['triager']}>
//                 <TriagerLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="login" element={<AdminLogin />} />

//             <Route path="dashboard" element={<TriagerDashboard />} />
//             <Route path="users" element={<UsersData />} />
//             <Route path="reports/:programId" element={<TrigerReports />} />
//             <Route path="programs" element={<ProgramsPage />} />
//           </Route>

//           {/* Hacker Routes with HackerSidebar */}
//           <Route
//             path="/hacker/*"
//             element={
//               <ProtectedRoute typeUser={['hacker', 'triager']}>
//                 <HackerLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<HackerDashboard />} />
//             <Route path="setting" element={<HackerSettings />} />
//             <Route path="leaderboard" element={<HackerLeaderboard />} />
//             <Route path="bounties" element={<HackerBounties />} />
//             <Route path="report/:id" element={<HackerReports />} />
//             <Route path="programs" element={<ProgramsPage />} />
//             <Route path="chat/:reportId" element={<ChatRoom />} />
//             <Route path="reports" element={<HackerAllReports />} />
//           </Route>

//           {/* Company Routes with CompanySidebar */}
//           <Route
//             path="/company/*"
//             element={
//               <ProtectedRoute typeUser="company">
//                 <CompanyLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<CompanyDashboard />} />
//             <Route path="setting" element={<CompanySetting />} />
//             <Route path="leaderboard" element={<CompanyLeaderBoard />} />
//             <Route path="assets" element={<CompanyAssets />} />
//             <Route path="bounties" element={<CompanyBounties />} />
//             <Route path="programs" element={<ProgramList />} />
//             <Route
//               path="programsmaindetails/:programId"
//               element={<ProgramMainDetail />}
//             />
//           </Route>

//           {/*  Route for chat with dynamic reportId */}
//           <Route path="addprogram" element={<ProgramFlow />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }

// export default App

import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
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
import ProtectedRoute from './ProtectedRoute'
import ProgramFlow from './CompanyComponents/CreateProgram/ProgramCreation'
import ProgramMainDetail from './CompanyComponents/Programs/ProgramData/ProgramMainDetail'
import ChatRoom from './chat/ReportChat'
import AdminLogin from './AdminLogin'
import AdminHome from './AdminPages/AdminHome'
import AdminLayout from './Layouts/AdminLayout'
import TriagerLayout from './Layouts/TriagerLayout'
import TriagerDashboard from './TriagerPages/TriagerDashboard'
import UsersData from './TriagerPages/UsersData'
import TrigerReports from './TriagerPages/TrigerReports'
import HackerAllReports from './Hackerpages/HackerAllReports'
import HomePage from './Common/HomePage'
import Navbar from './Common/Navbar'

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    // Initialize Redux auth state from localStorage if not already set
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
      {/* Render Navbar only if no token is present */}
      {!token && <Navbar />}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:programId" element={<ProgramMainDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/checkemail" element={<CheckEmailPage />} />

          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute typeUser={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<AdminHome />} />
          </Route>

          {/* Triager Routes */}
          <Route
            path="/triager/*"
            element={
              <ProtectedRoute typeUser={['triager']}>
                <TriagerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<TriagerDashboard />} />
            <Route path="users" element={<UsersData />} />
            <Route path="reports/:programId" element={<TrigerReports />} />
            <Route path="programs" element={<ProgramsPage />} />
          </Route>

          {/* Hacker Routes with HackerSidebar */}
          <Route
            path="/hacker/*"
            element={
              <ProtectedRoute typeUser={['hacker', 'triager']}>
                <HackerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<HackerDashboard />} />
            <Route path="setting" element={<HackerSettings />} />
            <Route path="leaderboard" element={<HackerLeaderboard />} />
            <Route path="bounties" element={<HackerBounties />} />
            <Route path="report/:id" element={<HackerReports />} />
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="chat/:reportId" element={<ChatRoom />} />
            <Route path="reports" element={<HackerAllReports />} />
          </Route>

          {/* Company Routes with CompanySidebar */}
          <Route
            path="/company/*"
            element={
              <ProtectedRoute typeUser="company">
                <CompanyLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="setting" element={<CompanySetting />} />
            <Route path="leaderboard" element={<CompanyLeaderBoard />} />
            <Route path="assets" element={<CompanyAssets />} />
            <Route path="bounties" element={<CompanyBounties />} />
            <Route path="programs" element={<ProgramList />} />
            <Route
              path="programsmaindetails/:programId"
              element={<ProgramMainDetail />}
            />
          </Route>

          {/* Route for adding a program */}
          <Route path="/addprogram" element={<ProgramFlow />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
