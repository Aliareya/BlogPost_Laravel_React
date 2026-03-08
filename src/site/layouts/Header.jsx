import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  // for header
  const menupopup = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menupopup.current && !menupopup.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = (path) => {
    if (path === "Home") {
      navigate(`/`);
    } else {
      navigate(`/${path.toLowerCase()}`);
    }
  };

  const IS_LOGIN = false;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300  bg-white/95 backdrop-blur-sm shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform">
              <Icon icon="mdi:blog" className="text-white text-xl" />
            </div>
            <span
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 `}
            >
              BlogHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Posts", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`capitalize font-medium transition-all duration-300 relative py-2 `}
              >
                {item}
              </button>
            ))}

            {!IS_LOGIN && (
              <div className="flex gap-2">
                <button onClick={()=>handleNavClick('Login')} className=" px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                  Login
                </button>
                <button onClick={()=>handleNavClick('Register')} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
                  Get Started
                </button>
              </div>
            )}

          </div>
            {IS_LOGIN && (
              <div className="flex items-center gap-3 relative">
                <span>Alireza</span>
                <div
                  ref={menupopup}
                  onClick={toggleAccountMenu}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                />
              </div>
            )}
            {isAccountMenuOpen && (
              <div className="absolute top-14 right-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                <div className="py-2 px-4 font-bold border-b">My Account</div>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Admin Panel
                </button>
                <button className="block w-full text-left px-4 py-2 bg-[#c94b4b24] hover:bg-[#c94b4b24]">
                  Log out
                </button>
              </div>
            )}

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <div
              onClick={toggleAccountMenu}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
            />
            {isAccountMenuOpen && (
              <div className="absolute top-12 right-20 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                <div className="py-2 px-4 font-bold border-b">My Account</div>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Admin Panel
                </button>
                <button className="block w-full text-left px-4 py-2 bg-[#c94b4b24] hover:bg-[#c94b4b24]">
                  Log out
                </button>
              </div>
            )}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
                className={`text-2xl`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t shadow-lg">
          {["Home", "About", "Posts", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(path)}
              className={`block w-full text-left py-3 px-4 rounded-lg capitalize font-medium transition-colors `}
            >
              {item}
            </button>
          ))}
          <button className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
