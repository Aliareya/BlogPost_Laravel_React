import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/user/pages/home/Dashboard'
import MyPosts from '../dashboard/user/pages/posts/MyPosts'
import Profile from '../dashboard/user/pages/profile/Profile'
import CreatePost from '../dashboard/user/pages/posts/CreatePosts'
import EditPost from '../dashboard/user/pages/posts/EditPost'

function DashbordRoutes() {
  return (
      <Routes>
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/dashboard/my-posts" element={<MyPosts/>} />
         <Route path="/dashboard/my-posts/create" element={<CreatePost/>} />
         <Route path="/dashboard/my-posts/:id/edit" element={<EditPost/>} />
         <Route path="/dashboard/my-profile" element={<Profile/>} />
      </Routes>
  )
}

export default DashbordRoutes
