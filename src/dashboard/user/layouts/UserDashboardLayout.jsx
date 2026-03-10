import React, { useEffect } from 'react'
import DashbordRoutes from '../../../routes/DashbordRoutes'
import { useAuth } from '../../../context/AuthContext';

function UserDashboardLayout() {
  // const { fetchUserData , checkLogin } = useAuth();
  // useEffect(() => { 
  //   if (!checkLogin()) {
  //     console.log("User not logged in, redirecting to login page.");
  //   }

  // },[])

  return (
    <div className='w-full h-full'>
        <DashbordRoutes />
    </div>
  )
}

export default UserDashboardLayout