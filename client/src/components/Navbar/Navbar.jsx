import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <nav className="bg-black text-white p-4 shadow-md w-full ">
    <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 text-xl font-bold">Versatnix</span>
      </div>
  
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link, i) =>
          link.dropdown ? (
            <div key={i} className="relative group">
              <button className="hover:text-gray-400">{link.name}</button>
              <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md hidden group-hover:block z-10">
                {link.dropdown.map((item, j) => (
                  <a
                    key={j}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-200 whitespace-nowrap"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <Link
              to={link.path}
              key={i}
              className={`${
                link.external
                  ? "text-pink-500 font-semibold"
                  : link.active
                  ? "border-b-2 border-gray-500"
                  : ""
              } hover:text-gray-400`}
            >
              {link.name}
            </Link>
          )
        )}
        <button className="bg-gray-500 px-4 py-1 rounded text-black font-semibold hover:bg-gray-600">
          Login
        </button>
      </div>
  
      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  
    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden bg-black px-4 pt-4 pb-6 space-y-2">
        {navLinks.map((link, i) =>
          link.dropdown ? (
            <div key={i}>
              <span className="font-semibold">{link.name}</span>
              <div className="ml-4 space-y-1">
                {link.dropdown.map((item, j) => (
                  <a key={j} href="#" className="block hover:text-gray-400">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={i}
              href={link.href || "#"}
              className={`block ${
                link.external ? "text-pink-500" : ""
              } hover:text-gray-400`}
            >
              {link.name}
            </a>
          )
        )}
        <button className="mt-4 w-full bg-gray-500 py-2 rounded text-black font-semibold hover:bg-gray-600">
          Login
        </button>
      </div>
    )}
  </nav>
  
  );
};

export default Navbar;
