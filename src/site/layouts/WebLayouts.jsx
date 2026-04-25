import React from 'react'
import Header from './Header'
import Footer from "./Footer"
import WebRoutes from '../../routes/WebRoutes'

function WebLayouts() {
  return (
    <div>
       <Header/>
       <WebRoutes/>
       <Footer/>
    </div>
  )
}

export default WebLayouts