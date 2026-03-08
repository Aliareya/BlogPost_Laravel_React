import React from 'react'
import SiteRoutes from '../../routes/SiteRoutes'
import Header from './Header'
import Footer from './Footer'

function SiteLayout() {
  return (
    <div className='w-full h-full'>
        <Header/>
        <SiteRoutes />
        <Footer/>
    </div>
  )
}

export default SiteLayout