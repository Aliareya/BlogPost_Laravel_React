import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../site/pages/home/Home'
import About from '../site/pages/about/About'
import Contact from '../site/pages/contact/Contact'
import Posts from '../site/pages/posts/Posts'
import PostDetails from '../site/pages/postdetails/PostDetails'
import Login from '../site/pages/auth/Login'
import Register from '../site/pages/auth/Register'

function SiteRoutes() {
  return (
    <Routes>
        {/* Web Page Route */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default SiteRoutes