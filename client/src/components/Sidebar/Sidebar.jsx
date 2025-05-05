import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBug, FaCrown, FaGift, FaCog, FaList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#121212] p-4 hidden sm:block">
      <h1 className="text-green-500 text-2xl font-bold mb-8">Versantix</h1>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-400' : 'hover:bg-[#1f1f1f]'}`}><FaTachometerAlt /> Dashboard</NavLink>
        <NavLink to="/programs" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'}`}><FaList /> Programs</NavLink>
        <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'}`}><FaBug /> Reports</NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'}`}><FaCrown /> Leaderboard</NavLink>
        <NavLink to="/bounties" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'}`}><FaGift /> Bounties</NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-[#1f1f1f]'}`}><FaCog /> Settings</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;