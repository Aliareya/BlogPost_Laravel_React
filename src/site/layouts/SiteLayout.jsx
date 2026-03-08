import React from 'react'
import SiteRoutes from '../../routes/SiteRoutes'

function SiteLayout() {
  return (
    <div className='w-full h-full'>
        {/* <div>Header</div> */}
        <div><SiteRoutes /></div>
        {/* <div>Footer</div> */}
    </div>
  )
}

export default SiteLayout