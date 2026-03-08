import { Route , Routes } from "react-router-dom";

import React from 'react'

function DashboardRoute() {
  return (
    <Routes>
        <Route path="/" element={<div>Dashboard</div>} />

    </Routes>
  )
}

export default DashboardRoute