import React from 'react'
import Header from '../site/layouts/Header'
import Footer from '../site/layouts/Footer'
import { useLocation } from 'react-router-dom'
import WebLayouts from '../site/layouts/WebLayouts';
import AdminLayout from '../admin_dashboard/layouts/AdminLayout';
import UserDashboardLayout from '../user_dashboard/layout/UserDashboardLayout';
import useAuthStore from '../store/AuthStore';

function MainLayout() {
  const location = useLocation().pathname;
  const isdashboard = location.startsWith("/my_dashboard");
  const user = useAuthStore((state)=>state.user);
  const isadmin = location.startsWith("/admin");
  return (
    <div className='w-full'>
      {isadmin ? <AdminLayout/> :
      isdashboard ? <UserDashboardLayout/>:
      <WebLayouts/>
      }
    </div>
  )
}

export default MainLayout