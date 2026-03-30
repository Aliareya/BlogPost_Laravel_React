import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardRoutes from '../../routes/DashboardRoutes'

function DashboardLayout() {
  return (
    <div>
        <header>Header</header>
        <div><DashboardRoutes/></div>
        <footer>Header</footer>
    </div>
  )
}

export default DashboardLayout
