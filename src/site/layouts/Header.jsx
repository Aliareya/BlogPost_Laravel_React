import { useNavigate } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../../store/AuthStore";

const Header = () => {
  const navigate = useNavigate();

  // 👤 user from Zustand
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading);

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleclick = (path) => {
    navigate(path);
    setOpen(false);
  };

  // close dropdown when click outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-white z-50 border-b border-gray-100 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-xl font-serif font-semibold text-gray-900">
              Inkwell
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <span onClick={() => handleclick('/')} className="text-orange-600 cursor-pointer bg-orange-50 px-3 py-2 rounded-md text-sm font-medium">Home</span>
            <span onClick={() => handleclick('/posts')} className="text-gray-600 cursor-pointer hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Posts</span>
            <span onClick={() => handleclick('/about')} className="text-gray-600 cursor-pointer hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</span>
            <span onClick={() => handleclick('/contact')} className="text-gray-600 cursor-pointer hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 relative" ref={menuRef}>

            {/* ✅ AUTH CHECK */}

            {loading ?
              <div className="h-16 flex items-center justify-center">
                <p className="text-gray-500 text-sm"></p>
              </div>
            :

            user ? (
              <>
                {/* Trigger */}
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg font-medium text-[#92400e]">
                    {user?.name || "User"}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-slate-200 text-[#92400e] border border-[#92400e] flex items-center justify-center text-sm font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">

                    {/* Header */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>

                    {/* Menu */}
                    <div className="py-2">

                      <button
                        onClick={() => handleclick('/admin/dashboard')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaTachometerAlt />
                        Dashboard
                      </button>

                      <button
                        onClick={() => handleclick('/')}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser />
                        Profile
                      </button>

                    </div>

                    {/* Logout */}
                    <div className="border-t py-2">
                      <button
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => handleclick('/login')}
                  className="bg-gray-200 hover:bg-orange-600 hover:text-white text-black px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Login
                </button>

                <button
                  onClick={() => handleclick('/signup')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Signup
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;