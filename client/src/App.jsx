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
import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/SignUp';
// import AddProgram from './components/Programs/AddPrograms/AddPrograms';
// import ProgramTypeModal from './components/AllProgram/ProgramTypeModal';
import CreateProgram from "./Pages/CreateProgram/CreateProgram"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // If user is logged in, show dashboard & sidebar
    return (
      <div className="flex min-h-screen bg-[#0e0e0e] text-white">
        <Sidebar />
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

            <Route path='/addprogram' element={<CreateProgram/>}/>
          </Routes>
        </main>
      </div>
    )

  // return (
  //   <div className="flex min-h-screen bg-[#0e0e0e] text-white">
  //     <main className="flex-1 p-6 overflow-y-auto">
  //       <Routes>
  //         <Route path="/" element={<Navigate to="/signup" />} />
  //         <Route path="/signup" element={<SignUp />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="*" element={<Navigate to="/signup" />} />
  //       </Routes>
  //     </main>
  //   </div>
  // );
}

export default App;
