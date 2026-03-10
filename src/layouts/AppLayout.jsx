import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import SiteLayout from "../site/layouts/SiteLayout";
import UserDashboardLayout from "../dashboard/user/layouts/UserDashboardLayout";
import AdminLayout from "../dashboard/admin/layouts/AdminLayout";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const location = useLocation();
  const { fetchUserData, checkLogin, loading } = useAuth();
  const is_userDashboard = location.pathname.startsWith("/dashboard");
  const is_admin = location.pathname.startsWith("/admin");


  useEffect(() => {
    fetchUserData();
    if (!checkLogin()) {
      console.log("User not logged in, redirecting to login page.");
    }
    
  }, []);



  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : is_userDashboard ? (
        <UserDashboardLayout />
      ) : is_admin ? (
        <AdminLayout />
      ) : (
        <SiteLayout />
      )}
    </div>


  );
}

// LoadingPage.jsx

const LoadingPage = () => {
  return (
    <div className="flex bg-black/30 backdrop-blur-sm z-10 items-center justify-center h-screen w-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        {/* Loading text */}
        <p className="text-white text-xl font-semibold animate-pulse tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
};



export default AppLayout;
