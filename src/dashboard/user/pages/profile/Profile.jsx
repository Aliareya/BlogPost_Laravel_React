import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Software engineer and tech enthusiast.',
    role: 'Admin',
    memberSince: '1/1/2023',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    twitter: '@johndoe',
    github: 'johndoe'
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'mdi:home-outline' },
    { id: 'posts', label: 'My Posts', icon: 'mdi:file-document-outline' },
    { id: 'profile', label: 'Profile', icon: 'mdi:account-outline' },
    { id: 'admin', label: 'Admin', icon: 'mdi:cog-outline' }
  ];

  const stats = [
    { label: 'Posts', value: '2', icon: 'mdi:file-document' },
    { label: 'Followers', value: '1.2K', icon: 'mdi:account-group' },
    { label: 'Following', value: '348', icon: 'mdi:account' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.bio && formData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProfileData(formData);
    setIsSaving(false);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* User Profile */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src={profileData.avatar} 
                  alt={profileData.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{profileData.name}</h3>
                  <p className="text-sm text-gray-500">{profileData.role.toLowerCase()}</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Icon icon="mdi:bell-outline" className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center animate-scaleIn">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 mr-2" />
                  Profile updated successfully!
                </div>
              )}

              {/* Profile Header Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative group">
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-50"
                    />
                    <button 
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 -all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <Icon icon="mdi:camera" className="w-4 h-4" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                    <p className="text-gray-500 mb-2">{profileData.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Icon icon="mdi:calendar" className="w-4 h-4 mr-1 text-gray-400" />
                        Member since {profileData.memberSince}
                      </span>
                      <span className="flex items-center">
                        <Icon icon="mdi:email" className="w-4 h-4 mr-1 text-gray-400" />
                        {profileData.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 animate-fadeIn delay-100">
                <nav className="flex space-x-8">
                  {['general', 'security', 'notifications', 'privacy'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSection(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeSection === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Edit Profile Form */}
              {activeSection === 'general' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fadeIn delay-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Icon icon="mdi:pencil" className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                    </div>

                    {/* Avatar URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.bio ? 'border-red-500' : 'border-gray-200'} ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.bio ? (
                          <p className="text-sm text-red-500">{errors.bio}</p>
                        ) : (
                          <span />
                        )}
                        <span className="text-sm text-gray-500">{formData.bio.length}/500</span>
                      </div>
                    </div>

                    {/* Additional Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Twitter
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                          <input
                            type="text"
                            name="twitter"
                            value={formData.twitter.replace('@', '')}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          GitHub
                        </label>
                        <input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${!isEditing ? 'bg-gray-50' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 animate-scaleIn">
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData(profileData);
                            setErrors({});
                          }}
                          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSaving ? (
                            <>
                              <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Icon icon="mdi:content-save" className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fadeIn delay-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Icon icon="mdi:lock" className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Password</p>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                        Change
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon icon="mdi:shield-check" className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Icon icon="mdi:devices" className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Active Sessions</p>
                          <p className="text-sm text-gray-500">Manage your active sessions</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Sections Placeholder */}
              {activeSection === 'notifications' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fadeIn delay-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
                  <p className="text-gray-600">Configure how you receive notifications.</p>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fadeIn delay-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Privacy Settings</h3>
                  <p className="text-gray-600">Control your privacy and data settings.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;