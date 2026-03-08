import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SiteRoute from './SiteRoute';
import DashboardRoute from './DashboardRoute';

function AppRoute() {
  return (
    <BrowserRouter>
      <SiteRoute/>
      <DashboardRoute/>
    </BrowserRouter>
  )
}

export default AppRoute