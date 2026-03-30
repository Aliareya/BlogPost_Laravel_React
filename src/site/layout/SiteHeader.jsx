import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function SiteHeader({ isLoggedIn, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ================= LOGO ================= */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group"
            >
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition">
                <Icon icon="mdi:blog" className="text-2xl text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                MyBlog
              </span>
            </button>
          </div>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  isActive(link.path)
                    ? "border-blue-600 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* ================= RIGHT SIDE (AUTH) ================= */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              // NOT LOGGED IN
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md"
                >
                  Sign up
                </button>
              </>
            ) : (
              // LOGGED IN (PROFILE DROPDOWN)
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    className="h-9 w-9 rounded-full object-cover border-2 border-gray-100 hover:border-blue-600 transition"
                    src={user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    alt={user?.name || "User"}
                  />
                  <Icon
                    icon={`mdi:chevron-${isProfileOpen ? "up" : "down"}`}
                    className="text-gray-400 text-sm"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 animate-fade-in-down origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-900 font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => navigate("/profile")}
                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                      >
                        <Icon icon="mdi:account" className="mr-3 text-gray-400 group-hover:text-blue-600" />
                        Your Profile
                      </button>
                      <button
                        onClick={() => navigate("/settings")}
                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                      >
                        <Icon icon="mdi:cog" className="mr-3 text-gray-400 group-hover:text-blue-600" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={onLogout}
                        className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <Icon icon="mdi:logout" className="mr-3 text-red-400 group-hover:text-red-600" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <div className="flex items-center md:hidden gap-4">
            {isLoggedIn && (
               <img
               className="h-8 w-8 rounded-full object-cover border border-gray-200"
               src={user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
               alt="User"
             />
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <Icon
                icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="border-t border-gray-100 my-2 pt-2">
              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-3 px-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="px-3 space-y-2">
                   <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Icon icon="mdi:account" className="mr-3 text-gray-400" />
                    Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <Icon icon="mdi:logout" className="mr-3 text-red-400" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}