import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../dashboard/layout/DashboardLayout';
import SiteLayout from '../site/layouts/SiteLayout';


function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

//   const isAuthenticated = () => !!localStorage.getItem('token');
//   if (isDashboard && !isAuthenticated()) {
//     return <Navigate to="/" />;
//   }

  return (
    <div>
      {isDashboard ? <DashboardLayout /> : <SiteLayout />}
    </div>
  );
}

export default AppLayout;