import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    publishedPosts: 2,
    totalLikes: 77,
    totalComments: 3
  });

  const posts = [
    {
      id: 1,
      title: 'Mastering CSS Grid Layout',
      date: '5/15/2023',
      excerpt: 'A comprehensive guide to using CSS Grid for modern web layouts.',
      likes: 35,
      comments: 1,
      status: 'published'
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      date: '5/10/2023',
      excerpt: 'Exploring emerging trends and technologies shaping the future of web development.',
      likes: 42,
      comments: 2,
      status: 'published'
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'mdi:home-outline' },
    { id: 'posts', label: 'My Posts', icon: 'mdi:file-document-outline' },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-outline' },
    { id: 'admin', label: 'Admin', icon: 'mdi:cog-outline' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* User Profile */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                  alt="John Doe" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">admin</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon 
                    icon={item.icon} 
                    className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} 
                  />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group">
                <Icon icon="mdi:logout" className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon icon="mdi:menu" className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Icon icon="mdi:bell-outline" className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 animate-slideUp">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Published Posts</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.publishedPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:file-document" className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <Icon icon="mdi:trending-up" className="w-4 h-4 mr-1" />
                  <span className="font-medium">+12%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 animate-slideUp delay-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Likes</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:heart" className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <Icon icon="mdi:trending-up" className="w-4 h-4 mr-1" />
                  <span className="font-medium">+24%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 animate-slideUp delay-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Comments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalComments}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:comment-text" className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <Icon icon="mdi:trending-up" className="w-4 h-4 mr-1" />
                  <span className="font-medium">+8%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </div>
              </div>
            </div>

            {/* Recent Posts Section */}
            <div className="animate-slideUp delay-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                  <Icon icon="mdi:plus" className="w-5 h-5" />
                  <span className="font-medium">Create Post</span>
                </button>
              </div>

              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Icon icon="mdi:heart-outline" className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon icon="mdi:message-outline" className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium capitalize">
                            {post.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                          View
                        </button>
                        <button className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-6 text-center">
                <button className="px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center space-x-2">
                  <span>View All Posts</span>
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;