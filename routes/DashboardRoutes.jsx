import React from 'react'
import { Route, Routes } from 'react-router-dom'

function DashboardRoutes() {
  return (
    <Routes>
        <Route path='/my-dashboard' element={<h1>Dashboard</h1>}/>
    </Routes>
  )
}

export default DashboardRoutes
