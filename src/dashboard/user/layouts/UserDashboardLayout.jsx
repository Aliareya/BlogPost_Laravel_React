import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "../pages/home/Dashboard"
import DashbordRoutes from '../../../routes/DashbordRoutes'

function UserDashboardLayout() {
  return (
    <div className='w-full h-full'>
        <DashbordRoutes />
    </div>
  )
}

export default UserDashboardLayout