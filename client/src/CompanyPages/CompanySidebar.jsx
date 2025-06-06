import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBug,
  FaCrown,
  FaCog,
  FaList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logout from "../Common/LoginSignup/Logout";

const CompanySidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? "bg-gray-600" : "hover:bg-[#1f1f1f]"
    }`;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden bg-[#121212] p-4 flex justify-between items-center z-50 relative">
        <h1 className="text-blue-500 text-2xl font-bold">Versantix</h1>
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:block w-64 bg-[#121212] p-4 fixed sm:relative h-full sm:h-screen z-50`}
      >
        <nav className="flex flex-col gap-4 mt-6 sm:mt-0">
          <h1 className="text-blue-500 text-2xl font-bold mb-10 sm:block hidden">
            Versantix
          </h1>
          <NavLink
            to="/company/dashboard"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/company/programs"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaList /> Programs
          </NavLink>
          <NavLink
            to="/company/assets"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaBug /> Assets
          </NavLink>
          <NavLink
            to="/company/leaderboard"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaCrown /> Campaigns
          </NavLink>
          <NavLink
            to="/company/setting"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaCog /> Settings
          </NavLink>
          <NavLink
            to="/hacker/chat/683edea9dc6aa4314fc5e527"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            <FaList /> Chat
          </NavLink>
        </nav>

        <div className="mt-4">
          <Logout />
        </div>
      </div>

      {/* Background overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default CompanySidebar;
