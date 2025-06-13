import React from 'react'
import { Link } from 'react-router'
import Button from './Button/Button'

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-blue-500 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li>
                <Link to="/programs">Programs</Link>
              </li>
              <li>
                <a>Program</a>
                <ul className="p-2">
                  <li>
                    <Link to="/submenu1">Submenu 1</Link>
                  </li>
                  <li>
                    <Link to="/submenu2">Submenu 2</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/item3">Item 3</Link>
              </li>
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl text-white ml-2">
            Versantix
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/programs">Programs</Link>
            </li>
            <li>
              <details>
                <summary>Program</summary>
                <ul className="p-2 bg-white text-black rounded-box">
                  <li>
                    <Link to="/submenu1">Submenu 1</Link>
                  </li>
                  <li>
                    <Link to="/submenu2">Submenu 2</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/item3">Item 3</Link>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          <Button text="Login" linkto="/login" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
