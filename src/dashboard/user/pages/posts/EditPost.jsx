import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
  AlignLeft,
  Sparkles,
  Upload,
  Trash2,
  Tag,
  Eye,
  Save,
  RotateCcw,
  History,
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  Lock,
  EyeOff,
  Calendar
} from 'lucide-react';

const EditPost = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('posts');
  const [formData, setFormData] = useState({
    title: 'The Future of Web Development',
    slug: 'the-future-of-web-development',
    excerpt: 'Exploring emerging trends and technologies shaping the future of web development.',
    coverImage: null,
    coverImagePreview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
    content: `# The Future of Web Development

Web development has come a long way since the early days of static HTML pages. Today, we're seeing a rapid evolution in how websites and web applications are built, deployed, and maintained.

## The Rise of JAMstack

JAMstack architecture has gained significant popularity in recent years. By decoupling the frontend from the backend, developers can create faster, more secure websites that are easier to scale.

## AI-Powered Development

Artificial intelligence is transforming how we build software. From code completion to automated testing, AI tools are helping developers work more efficiently and with fewer errors.

## Web Assembly

WebAssembly is opening up new possibilities for web applications, allowing near-native performance for computationally intensive tasks right in the browser.

## Conclusion

The future of web development is exciting, with new technologies and methodologies emerging constantly. Staying updated with these trends is crucial for any developer.`,
    tags: ['Web Development', 'Technology', 'JAMstack', 'AI', 'Programming'],
    status: 'published',
    visibility: 'public',
    category: 'Technology',
    featured: true,
    publishedAt: '2024-01-15T10:30:00',
    updatedAt: new Date().toISOString()
  });
  
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags] = useState(['React', 'TailwindCSS', 'JavaScript', 'WebDev', 'Tutorial', 'Design', 'Animation', 'Responsive', 'Next.js', 'TypeScript']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const [showRevisions, setShowRevisions] = useState(false);
  const fileInputRef = useRef(null);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-save logic would go here
      console.log('Auto-saving...');
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearTimeout(timer);
  }, [formData]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));

    // Auto-generate slug from title if slug is same as old title slug
    if (name === 'title') {
      const oldSlug = formData.slug;
      const expectedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 60);
      
      if (oldSlug === expectedSlug) {
        const newSlug = value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 60);
        setFormData(prev => ({ ...prev, slug: newSlug }));
      }
    }
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 60);
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Tags functionality
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
        updatedAt: new Date().toISOString()
      }));
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
        updatedAt: new Date().toISOString()
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
      updatedAt: new Date().toISOString()
    }));
  };

  // Image upload functionality
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          coverImage: file,
          coverImagePreview: reader.result,
          updatedAt: new Date().toISOString()
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      coverImage: null,
      coverImagePreview: '',
      updatedAt: new Date().toISOString()
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    // Reset to last saved version
    if (window.confirm('Are you sure you want to discard your changes?')) {
      // Reset logic would go here
      console.log('Resetting to last saved version...');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  const filteredSuggestions = suggestedTags.filter(
    tag => tag.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(tag)
  );

  const wordCount = formData.content.split(/\s+/).filter(w => w.length > 0).length;
  const charCount = formData.content.length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200/80 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        <div className="flex flex-col h-full">
          {/* Logo & User Profile */}
          <div className="p-6 border-b border-gray-100/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  BlogCraft
                </span>
              </div>
              <button 
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?img=11" 
                  alt="John Doe" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">John Doe</h3>
                <p className="text-xs text-gray-500">Content Creator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-900'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-blue-600 animate-pulse relative z-10" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100/80">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50/80 hover:text-red-600 transition-all duration-200 group">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Edit Post</h1>
          <div className="w-10" />
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Edit Post
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    formData.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : formData.status === 'draft'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated {new Date(formData.updatedAt).toLocaleString()}</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Discard Changes</span>
                </button>
                <button 
                  onClick={() => setShowRevisions(!showRevisions)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                >
                  <History className="w-4 h-4" />
                  <span>Revisions</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/80 rounded-2xl animate-slide-in-right backdrop-blur-sm">
              <div className="flex items-center space-x-3 text-green-800">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Post updated successfully!</p>
                  <p className="text-sm text-green-600">Your changes have been saved.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                      <Type className="w-4 h-4 text-blue-500" />
                      <span>Post Title</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter an engaging title..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 placeholder:text-gray-400 text-lg font-medium"
                    required
                  />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{formData.title.length}/100 characters</span>
                    {formData.title.length > 60 && (
                      <span className="text-amber-600 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Consider shortening for better SEO</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Slug Field */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <LinkIcon className="w-4 h-4 text-blue-500" />
                        <span>URL Slug</span>
                      </div>
                    </label>
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50/80 transition-all duration-200 font-medium"
                    >
                      Generate from title
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm whitespace-nowrap">yourblog.com/post/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="post-url-slug"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 placeholder:text-gray-400 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Excerpt Field */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                      <AlignLeft className="w-4 h-4 text-blue-500" />
                      <span>Excerpt</span>
                    </div>
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your post (displayed in post listings)"
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{formData.excerpt.length}/280 characters</span>
                    {formData.excerpt.length > 160 && (
                      <span className="text-amber-600">Meta description might be truncated</span>
                    )}
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                      <span>Cover Image</span>
                    </div>
                  </label>
                  
                  {!formData.coverImagePreview ? (
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer
                        ${dragActive 
                          ? 'border-blue-400 bg-blue-50/50' 
                          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
                        }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="rounded-xl overflow-hidden border border-gray-200">
                        <img 
                          src={formData.coverImagePreview} 
                          alt="Cover preview" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110"
                        aria-label="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {formData.coverImage && (
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {formData.coverImage.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags Field */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-blue-500" />
                      <span>Tags</span>
                    </div>
                  </label>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {formData.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border border-blue-200/50 animate-fade-in"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 w-4 h-4 rounded-full hover:bg-blue-200/80 transition-colors flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center border border-gray-200 rounded-xl focus-within:ring-4 focus-within:ring-blue-100/50 focus-within:border-blue-400 transition-all duration-200">
                        <Tag className="w-4 h-4 text-gray-400 ml-3" />
                        <input
                          type="text"
                          value={tagInput}
                          onChange={handleTagInput}
                          onKeyDown={handleTagKeyDown}
                          placeholder="Type a tag and press Enter..."
                          className="flex-1 px-3 py-3.5 rounded-xl outline-none placeholder:text-gray-400 text-sm"
                        />
                        {tagInput && (
                          <button
                            type="button"
                            onClick={() => addTag(tagInput)}
                            className="mr-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                          >
                            Add
                          </button>
                        )}
                      </div>
                      
                      {tagInput && filteredSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-48 overflow-y-auto animate-fade-in">
                          {filteredSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => addTag(suggestion)}
                              className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50/80 transition-colors flex items-center justify-between group"
                            >
                              <span>{suggestion}</span>
                              <span className="text-gray-400 group-hover:text-blue-500">+ Add</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Field with Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span>Content</span>
                      </div>
                    </label>
                    
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab('editor')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          activeTab === 'editor' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          activeTab === 'preview' 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  
                  {activeTab === 'editor' ? (
                    <>
                      <div className="flex items-center space-x-1.5 mb-3 pb-3 border-b border-gray-100">
                        {['B', 'I', 'U', 'H1', 'H2', 'Link', 'Quote', 'Code'].map((tool, index) => (
                          <button
                            key={index}
                            type="button"
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-all duration-200 text-sm font-medium"
                          >
                            {tool}
                          </button>
                        ))}
                        <div className="flex-1" />
                        <span className="text-xs text-gray-400">Markdown supported</span>
                      </div>
                      
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Write your post content here... Use Markdown for formatting"
                        rows={20}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 placeholder:text-gray-400 resize-y font-mono text-sm leading-relaxed"
                        required
                      />
                    </>
                  ) : (
                    <div className="prose prose-blue max-w-none p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[400px] max-h-[600px] overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ 
                        __html: formData.content
                          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                          .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                          .replace(/\*(.*)\*/gim, '<em>$1</em>')
                          .replace(/\n/gim, '<br />')
                      }} />
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{charCount} characters</span>
                    <span>{wordCount} words</span>
                    <span>~{readTime} min read</span>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 pt-4 pb-8">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Update Draft</option>
                    <option value="published">Publish</option>
                    <option value="scheduled">Schedule</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl
                      hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300/50
                      transform transition-all duration-200 flex items-center justify-center space-x-2
                      ${isSubmitting ? 'opacity-80 cursor-not-allowed scale-95' : 'hover:scale-[1.02] hover:shadow-xl active:scale-95'}
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Update Post</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* SEO Preview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>SEO Preview</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Google Search Result</p>
                    <div className="space-y-1.5">
                      <p className="text-blue-800 text-sm font-medium truncate hover:underline cursor-pointer">
                        {formData.title}
                      </p>
                      <p className="text-green-700 text-xs">
                        yourblog.com/post/{formData.slug}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {formData.excerpt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-3">Social Media Preview</p>
                    <div className="flex items-start space-x-3">
                      {formData.coverImagePreview ? (
                        <img 
                          src={formData.coverImagePreview} 
                          alt="Social preview" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {formData.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          yourblog.com
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">
                          {formData.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-500" />
                  <span>Publishing Options</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Visibility</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="visibility" 
                          value="public"
                          checked={formData.visibility === 'public'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Public</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="visibility" 
                          value="private"
                          checked={formData.visibility === 'private'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Lock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Private</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="visibility" 
                          value="password"
                          checked={formData.visibility === 'password'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <EyeOff className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Password Protected</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Technology</option>
                      <option>Tutorials</option>
                      <option>News</option>
                      <option>Opinion</option>
                      <option>Reviews</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Publish Date</label>
                    <input
                      type="datetime-local"
                      name="publishedAt"
                      value={formData.publishedAt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          name="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Featured Post</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-14">Show on homepage featured section</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100/50 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Post Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/70 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Words</p>
                  </div>
                  <div className="text-center p-3 bg-white/70 rounded-xl">
                    <p className="text-2xl font-bold text-indigo-600">{charCount}</p>
                    <p className="text-xs text-gray-500 mt-1">Characters</p>
                  </div>
                  <div className="text-center p-3 bg-white/70 rounded-xl">
                    <p className="text-2xl font-bold text-emerald-600">{formData.tags.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Tags</p>
                  </div>
                  <div className="text-center p-3 bg-white/70 rounded-xl">
                    <p className="text-2xl font-bold text-amber-600">~{readTime} min</p>
                    <p className="text-xs text-gray-500 mt-1">Read time</p>
                  </div>
                </div>
              </div>

              {/* Post Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Post Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-900">Jan 10, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Published</span>
                    <span className="font-medium text-gray-900">Jan 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Author</span>
                    <span className="font-medium text-gray-900">John Doe</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Views</span>
                    <span className="font-medium text-gray-900">1,234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prose h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          color: #1e293b;
        }
        .prose h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          color: #334155;
        }
        .prose h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 0.83em 0;
          color: #475569;
        }
        .prose p {
          margin: 1em 0;
          line-height: 1.75;
          color: #64748b;
        }
        .prose strong {
          font-weight: 600;
          color: #1e293b;
        }
        .prose em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default EditPost;