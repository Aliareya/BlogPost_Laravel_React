import React from 'react'
import SiteRoutes from '../../routes/siteRoutes'
import SiteHeader from '../site/layout/SiteHeader'
import SiteFooter from '../site/layout/SiteFooter'

function SiteLayout() {
  return (
    <div>
        <SiteHeader/>
        <SiteRoutes/>
        <SiteFooter/>
    </div>
  )
}

export default SiteLayout
