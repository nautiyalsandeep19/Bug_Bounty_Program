// App.jsx
import React, { useState,useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard';
import Programs from './components/Programs/ProgramDetails/ProgramList';
import ProgramDetail from './components/Programs/ProgramData/ProgramMainDetail'
import Reports from './Pages/Reports';
import Leaderboard from './Pages/Leaderboard';
import Bounties from './Pages/Bounties';
import Settings from './Pages/Settings';

function App() {


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
          </Routes>
        </main>
      </div>
  );
}

export default App;

