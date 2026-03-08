import React, { useState } from 'react';
import { Icon } from '@iconify/react';

// --- Sub-Components ---

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
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 mr-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
        >
          <Icon icon="mdi:menu" className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">Edit Post</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 font-medium">
          <Icon icon="mdi:arrow-left" className="w-4 h-4" />
          Back to Posts
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
          AD
        </div>
      </div>
    </header>
  );
};

// --- Main Page Component ---

export default function AdminEditPost() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postData, setPostData] = useState({
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    content: "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components...",
    category: "Development",
    status: "Published",
    tags: "react, javascript, frontend",
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  });

  const handleSave = () => {
    alert("Post saved successfully!");
    // Add your API call logic here
  };

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
          <div className="max-w-5xl mx-auto">
            
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>
                <p className="text-sm text-gray-500 mt-1">Last saved: Just now</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Icon icon="mdi:content-save" className="w-4 h-4" />
                  Update Post
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Main Editor */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Title Input */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                  <input
                    type="text"
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                    className="w-full text-2xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300 text-gray-900"
                    placeholder="Enter post title..."
                  />
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Slug (URL)</label>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-gray-400 mr-1">yoursite.com/blog/</span>
                      <input
                        type="text"
                        value={postData.slug}
                        onChange={(e) => setPostData({...postData, slug: e.target.value})}
                        className="w-full border-b border-gray-200 focus:border-indigo-500 focus:outline-none bg-transparent py-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Editor (Simulated) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 overflow-x-auto">
                    {['bold', 'italic', 'underline', 'align-left', 'align-center', 'format-list-bulleted', 'format-list-numbered', 'link', 'image'].map((icon) => (
                      <button key={icon} className="p-2 text-gray-500 hover:bg-gray-200 rounded hover:text-gray-900 transition-colors">
                        <Icon icon={`mdi:${icon}`} className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                  {/* Text Area */}
                  <textarea
                    value={postData.content}
                    onChange={(e) => setPostData({...postData, content: e.target.value})}
                    className="w-full h-96 p-6 focus:outline-none resize-none text-gray-700 leading-relaxed"
                    placeholder="Write your content here..."
                  ></textarea>
                </div>

              </div>

              {/* Right Column: Settings Sidebar */}
              <div className="space-y-6">
                
                {/* Publish Settings */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:publish" className="w-5 h-5 text-indigo-500" />
                    Publish Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                      <select 
                        value={postData.status}
                        onChange={(e) => setPostData({...postData, status: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Visibility</label>
                      <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <Icon icon="mdi:earth" className="w-4 h-4 text-gray-400" />
                        <span>Public</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-gray-400">Published on Oct 24, 2023</p>
                    </div>
                  </div>
                </div>

                {/* Category & Tags */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:tag" className="w-5 h-5 text-indigo-500" />
                    Organization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                      <select 
                        value={postData.category}
                        onChange={(e) => setPostData({...postData, category: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>Development</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Tutorial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Tags</label>
                      <input
                        type="text"
                        value={postData.tags}
                        onChange={(e) => setPostData({...postData, tags: e.target.value})}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add tags separated by commas"
                      />
                      <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:image-outline" className="w-5 h-5 text-indigo-500" />
                    Featured Image
                  </h3>
                  
                  <div className="relative group">
                    <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img src={postData.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                    </div>
                    <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium rounded-lg">
                      <Icon icon="mdi:upload" className="w-5 h-5 mr-2" />
                      Change Image
                    </button>
                  </div>
                  <button className="mt-3 w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors">
                    Remove Image
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}