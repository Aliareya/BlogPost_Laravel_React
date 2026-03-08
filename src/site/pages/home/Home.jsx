// BlogHub.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Header from '../../layouts/Header';


const Home = () => {


  // Mock data
  const features = [
    { icon: 'mdi:lightning-bolt', title: 'Lightning Fast', desc: 'Optimized performance for instant loading' },
    { icon: 'mdi:shield-check', title: 'Secure & Private', desc: 'Your data is protected with enterprise-grade security' },
    { icon: 'mdi:palette', title: 'Beautiful Themes', desc: 'Customize your blog with stunning pre-built designs' },
    { icon: 'mdi:chart-line', title: 'Analytics Built-in', desc: 'Track your audience with powerful insights' },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '200K+', label: 'Blog Posts' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Getting Started with React in 2024',
      excerpt: 'Learn the fundamentals of React and build your first application with modern best practices.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      author: 'Sarah Chen',
      date: 'Mar 5, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Mastering TailwindCSS Animations',
      excerpt: 'Discover how to create stunning animations using TailwindCSS utility classes and custom keyframes.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      author: 'Alex Rivera',
      date: 'Mar 3, 2024',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Future of Web Development',
      excerpt: 'Explore emerging trends and technologies that will shape how we build for the web tomorrow.',
      image: 'https://images.unsplash.com/photo-1551654834-1f7d8a8a5c58?w=600&h=400&fit=crop',
      author: 'Maya Patel',
      date: 'Feb 28, 2024',
      readTime: '6 min read'
    }
  ];





  return (
    <>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-float" />
          <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-300/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Icon icon="mdi:sparkles" className="text-yellow-300 mr-2" />
              <span className="text-white/90 text-sm font-medium">New: AI Writing Assistant</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Share Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-200">Story</span> with the World
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Create beautiful blogs, connect with readers, and grow your audience with the most intuitive publishing platform built for creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp delay-200">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300">
                Start Writing Free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300">
                <Icon icon="mdi:play-circle" className="inline mr-2" /> Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-white/80 animate-fadeInUp delay-300">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-gradient-to-br from-purple-400 to-pink-500" />
                ))}
              </div>
              <span className="font-medium">Join 50,000+ creators</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon icon="mdi:chevron-down" className="text-white/70 text-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeInUp">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              Why Choose BlogHub
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to <span className="text-blue-600">create & grow</span>
            </h2>
            <p className="text-lg text-gray-600">
              Powerful tools designed to help you focus on what matters most: your content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="posts" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeInUp">
            <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium mb-4">
              Latest Articles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Inspiration from our <span className="text-cyan-600">community</span>
            </h2>
            <p className="text-lg text-gray-600">
              Discover trending topics and expert insights from creators around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {post.readTime}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500" />
                    <div>
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read more
                    <Icon icon="mdi:arrow-right" className="ml-1 text-sm" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 animate-fadeInUp delay-300">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-300/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to start your blogging journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of creators who publish with BlogHub. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300">
                Create Free Account
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              <Icon icon="mdi:lock" className="inline mr-1" /> Free forever plan • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </>
  );
};

export default Home;