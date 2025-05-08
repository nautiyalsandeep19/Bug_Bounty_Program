import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard';
import Programs from './components/Programs/ProgramDetails/ProgramList';
import ProgramDetail from './components/Programs/ProgramData/ProgramMainDetail';
import Reports from './Pages/Reports';
import Leaderboard from './Pages/Leaderboard';
import Bounties from './Pages/Bounties';
import Settings from './Pages/Settings';
import SignUp from './Components/LoginSignup/SignUp'
import Login from './Components/LoginSignup/Login'
import VerifyOtp from './Components/LoginSignup/VerifyOtp'
import ProgramCreation from './components/CreateProgram/CreateProgramModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const hideSidebarRoutes = ['/addprogram'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // If user is logged in, show dashboard & sidebar
    return (
      <div className="flex min-h-screen bg-[#0e0e0e] text-white">
        {!shouldHideSidebar && <Sidebar />}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/program/:slug" element={<ProgramDetail />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/bounties" element={<Bounties />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />


            <Route path='/addprogram' element={<ProgramCreation/>}/>


            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    )
  }

  export default App

