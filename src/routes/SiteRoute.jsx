import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../site/pages/home/Home';
import Posts from '../site/pages/posts/Posts';
import PostDetails from '../site/pages/postdetails/PostDetails';
import About from '../site/pages/about/About';
import Contact from '../site/pages/contact/Contact';

function SiteRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  )
}

export default SiteRoute