import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const location = useLocation();
  const { fetchUserData, checkLogin, loading, user } = useAuth();

  const is_userDashboard = location.pathname.startsWith("/dashboard");
  const is_admin = location.pathname.startsWith("/admin");

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // اگر لاگین نباشد
  if (!checkLogin()) {
    return <Navigate to="/login" replace />;
  }

  // اگر صفحه admin باشد ولی کاربر admin نباشد
  if (is_admin && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // اگر صفحه dashboard باشد ولی role کاربر user نباشد
  if (is_userDashboard && user?.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;