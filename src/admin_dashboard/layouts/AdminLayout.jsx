import React, { useEffect } from "react";
import AdminRoutes from "../../routes/AdminRoutes";
import { Sidebar } from "./Sidebar";
import useAuthStore from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  // 🧠 Get user from Zustand store
  const user = useAuthStore((state) => state.user);

  // 👑 Your admin UID
  const ADMIN_UID = "sZlPmGzhfYNYX0ZEM2mGYszzdbB2";

  const isAdmin = user?.uid === ADMIN_UID;

  // 🚨 Protect admin route
  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  // ⏳ Wait until user loads
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading admin panel...
      </div>
    );
  }

  // 🚫 Not admin → block UI
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Admin Routes */}
      <div className="flex-1">
        <AdminRoutes />
      </div>
    </div>
  );
}

export default AdminLayout;