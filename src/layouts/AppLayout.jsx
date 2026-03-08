import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import SiteLayout from '../site/layouts/SiteLayout';
import UserDashboardLayout from '../dashboard/user/layouts/UserDashboardLayout';
import AdminLayout from '../dashboard/admin/layouts/AdminLayout';


function AppLayout() {
  const location = useLocation();
  const is_userDashboard = location.pathname.startsWith('/dashboard')
  const is_admin = location.pathname.startsWith('/admin');

  //   const isAuthenticated = () => !!localStorage.getItem('token');
  //   if (isDashboard && !isAuthenticated()) {
  //     return <Navigate to="/" />;
  //   }

  return (
    <div>
      {
        is_userDashboard ? <UserDashboardLayout /> :
        is_admin ? <AdminLayout /> :<SiteLayout />
      }
    </div>
  );
}

export default AppLayout;