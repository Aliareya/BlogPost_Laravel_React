import React from 'react'
import { Route, Routes } from 'react-router-dom'

function DashboardLayout() {
  return (
    <Routes>
        {/* Dashboard Page Route */}
        <Route path="/dashboard" element={<div>Dashboard Home</div>} />
    </Routes>
  )
}

export default DashboardLayout