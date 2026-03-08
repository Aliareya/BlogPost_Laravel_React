import React, { useState } from 'react';
import { Icon } from '@iconify/react';

// --- Mock Data ---
const POSTS_DATA = [
  { id: 1, title: "Understanding React Hooks", author: "Alex Doe", category: "Dev", status: "Published", date: "2 mins ago", views: 120 },
  { id: 2, title: "Tailwind CSS Best Practices", author: "Sarah Smith", category: "Design", status: "Draft", date: "1 hour ago", views: 0 },
  { id: 3, title: "Top 10 VS Code Extensions", author: "Mike Johnson", category: "Tools", status: "Published", date: "1 day ago", views: 854 },
  { id: 4, title: "Introduction to TypeScript", author: "Alex Doe", category: "Dev", status: "Review", date: "2 days ago", views: 45 },
  { id: 5, title: "Web Accessibility Guide", author: "Emily Chen", category: "Guide", status: "Published", date: "3 days ago", views: 1205 },
];

// --- Components ---

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: 'mdi:view-dashboard', label: 'Dashboard', active: false },
    { icon: 'mdi:newspaper-variant', label: 'Posts', active: true },
    { icon: 'mdi:account-group', label: 'Users', active: false },
    { icon: 'mdi:chart-bar', label: 'Analytics', active: false },
    { icon: 'mdi:cog', label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Icon icon="mdi:hexagon-slice-6" className="w-8 h-8 text-indigo-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">AdminUI</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu</div>
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${item.active 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon icon={item.icon} className={`w-5 h-5 mr-3 ${item.active ? 'text-indigo-600' : 'text-gray-400'}`} />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom Action */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Icon icon="mdi:logout" className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center">
        {/* Mobile Toggle */}
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 mr-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
        >
          <Icon icon="mdi:menu" className="w-6 h-6" />
        </button>
        
        {/* Breadcrumb / Title */}
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">Posts Management</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:bell-outline" className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Published: "bg-green-100 text-green-700 border-green-200",
    Draft: "bg-gray-100 text-gray-600 border-gray-200",
    Review: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
};

// --- Main Page Component ---

export default function PostsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(POSTS_DATA);
  const [filter, setFilter] = useState('All');

  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.status === filter);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          <div className="max-w-6xl mx-auto">
            
            {/* Page Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Posts</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your blog content and articles</p>
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                <Icon icon="mdi:plus" className="w-5 h-5 mr-2" />
                Create Post
              </button>
            </div>

            {/* Filters Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search posts..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  {['All', 'Published', 'Draft', 'Review'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        filter === status 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                      <th className="px-6 py-4">Post Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Views</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <Icon icon="mdi:file-document-outline" className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{post.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{post.date}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                {post.author.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-600">{post.author}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={post.status} />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {post.views}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                                <Icon icon="mdi:pencil" className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <Icon icon="mdi:file-remove-outline" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No posts found.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredPosts.length}</span> results
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}