import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../src/auth/Register'
import Login from '../src/auth/Login'
import Home from '../src/site/pages/home/Home'
import Posts from '../src/site/pages/posts/Posts'
import PostDetails from '../src/site/pages/postdetails/PostDetails'
import Categories from '../src/site/pages/categories/Categories'
import About from '../src/site/pages/about/About'

function SiteRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default SiteRoutes
