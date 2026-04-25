import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../admin_dashboard/pages/Dashboard'
import Posts from '../admin_dashboard/pages/posts/Posts'
import Comments from '../admin_dashboard/pages/comments/Comments'
import Message from '../admin_dashboard/pages/message/Message'
import CreatePost from '../admin_dashboard/pages/posts/CreatePost'

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/posts' element={<Posts/>} />
        <Route path='/admin/posts/create' element={<CreatePost/>} />
        <Route path='/admin/comments' element={<Comments/>} />
        <Route path='/admin/messages' element={<Message/>} />
    </Routes>
  )
}

export default AdminRoutes