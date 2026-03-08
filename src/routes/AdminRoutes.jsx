import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../dashboard/admin/pages/adminDashboard/AdminDashboard'
import UsersPage from '../dashboard/admin/pages/users/UsersPage'
import PostsPage from '../dashboard/admin/pages/posts/PostsPage'
import AdminEditPost from '../dashboard/admin/pages/posts/AdminEditPost'

function AdminRoutes() {
  return (
    <Routes>
         <Route path="/admin" element={<AdminDashboard/>} />
         <Route path="/admin/posts" element={<PostsPage/>} />
         <Route path="/admin/posts/:id/edit" element={<AdminEditPost/>} />
         <Route path="/admin/users" element={<UsersPage/>} />
    </Routes>
  )
}

export default AdminRoutes
