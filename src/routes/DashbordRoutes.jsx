import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/user/pages/home/Dashboard'

function DashbordRoutes() {
  return (
      <Routes>
         <Route path="/my-dashboard" element={<Dashboard/>} />
      </Routes>
  )
}

export default DashbordRoutes
