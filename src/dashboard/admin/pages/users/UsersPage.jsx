import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Shield,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ArrowUpDown,
  Users,
  UserPlus,
  Send,
  Ban,
  Activity,
  Calendar,
  MapPin,
  Globe,
  Smartphone,
  Laptop,
  Star,
  Crown
} from 'lucide-react';

const UsersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentUser, setCurrentUser] = useState(null);
  const [usersPerPage] = useState(10);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=11',
      joinedDate: '2023-01-15',
      lastActive: '2024-01-20T10:30:00',
      posts: 24,
      location: 'New York, USA',
      bio: 'Content creator and tech enthusiast.'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      role: 'editor',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=5',
      joinedDate: '2023-03-22',
      lastActive: '2024-01-19T14:20:00',
      posts: 15,
      location: 'London, UK',
      bio: 'Editorial lead with a passion for storytelling.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      role: 'author',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=3',
      joinedDate: '2023-05-10',
      lastActive: '2024-01-18T09:15:00',
      posts: 8,
      location: 'Toronto, Canada',
      bio: 'Freelance writer specializing in tech tutorials.'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'subscriber',
      status: 'inactive',
      avatar: 'https://i.pravatar.cc/150?img=9',
      joinedDate: '2023-07-05',
      lastActive: '2023-12-10T16:45:00',
      posts: 0,
      location: 'Sydney, Australia',
      bio: 'Just here to read and learn.'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@example.com',
      role: 'author',
      status: 'banned',
      avatar: 'https://i.pravatar.cc/150?img=8',
      joinedDate: '2023-02-18',
      lastActive: '2023-11-05T11:30:00',
      posts: 3,
      location: 'Berlin, Germany',
      bio: 'Violated community guidelines.'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      role: 'editor',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=1',
      joinedDate: '2023-04-12',
      lastActive: '2024-01-20T08:00:00',
      posts: 12,
      location: 'Paris, France',
      bio: 'Managing the editorial calendar.'
    },
    {
      id: 7,
      name: 'James Brown',
      email: 'james.b@example.com',
      role: 'subscriber',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=12',
      joinedDate: '2023-08-30',
      lastActive: '2024-01-19T20:15:00',
      posts: 0,
      location: 'Tokyo, Japan',
      bio: 'Tech enthusiast and early adopter.'
    },
    {
      id: 8,
      name: 'Maria Garcia',
      email: 'maria.g@example.com',
      role: 'author',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=20',
      joinedDate: '2023-06-15',
      lastActive: '2024-01-17T13:45:00',
      posts: 6,
      location: 'Madrid, Spain',
      bio: 'Writing about design and UX.'
    },
    {
      id: 9,
      name: 'Robert Taylor',
      email: 'robert.t@example.com',
      role: 'subscriber',
      status: 'inactive',
      avatar: 'https://i.pravatar.cc/150?img=13',
      joinedDate: '2023-09-20',
      lastActive: '2023-10-05T10:00:00',
      posts: 0,
      location: 'Chicago, USA',
      bio: 'Occasional reader.'
    },
    {
      id: 10,
      name: 'Jennifer Lee',
      email: 'jennifer.l@example.com',
      role: 'author',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=24',
      joinedDate: '2023-10-05',
      lastActive: '2024-01-20T11:20:00',
      posts: 4,
      location: 'Seoul, South Korea',
      bio: 'Frontend developer and blogger.'
    },
    {
      id: 11,
      name: 'William Martinez',
      email: 'william.m@example.com',
      role: 'subscriber',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=53',
      joinedDate: '2024-01-02',
      lastActive: '2024-01-19T15:30:00',
      posts: 0,
      location: 'Mexico City, Mexico',
      bio: 'New to the platform.'
    },
    {
      id: 12,
      name: 'Patricia White',
      email: 'patricia.w@example.com',
      role: 'editor',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=44',
      joinedDate: '2023-03-01',
      lastActive: '2024-01-20T09:45:00',
      posts: 18,
      location: 'Dublin, Ireland',
      bio: 'Senior editor focusing on quality.'
    }
  ]);

  const roles = [
    { value: 'all', label: 'All Roles', icon: Users },
    { value: 'admin', label: 'Admin', icon: Crown },
    { value: 'editor', label: 'Editor', icon: Shield },
    { value: 'author', label: 'Author', icon: Edit2 },
    { value: 'subscriber', label: 'Subscriber', icon: User }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses', color: 'bg-gray-100 text-gray-700' },
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-700' },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-700' },
    { value: 'banned', label: 'Banned', color: 'bg-red-100 text-red-700' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    let comparison = 0;
    switch(sortBy) {
      case 'date':
        comparison = new Date(b.joinedDate) - new Date(a.joinedDate);
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'posts':
        comparison = b.posts - a.posts;
        break;
      case 'lastActive':
        comparison = new Date(b.lastActive) - new Date(a.lastActive);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'desc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'editor': return <Shield className="w-4 h-4" />;
      case 'author': return <Edit2 className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'editor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'author': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'banned': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  const handleOpenModal = (type, user = null) => {
    setModalType(type);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="w-6 h-6 text-white" />
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
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">John Doe</h3>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

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
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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

          <div className="p-4 border-t border-gray-100">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Manage user accounts and permissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleOpenModal('add')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add User</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Now</p>
                  <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">New This Month</p>
                  <p className="text-2xl font-bold text-gray-900">+{users.filter(u => new Date(u.joinedDate).getMonth() === new Date().getMonth()).length}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserPlus className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="p-4 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                    {(filterRole !== 'all' || filterStatus !== 'all') && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </button>

                  {/* Bulk Actions */}
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-2 animate-fade-in bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                      <span className="text-sm text-blue-700 font-medium">{selectedUsers.length} selected</span>
                      <div className="w-px h-4 bg-blue-200"></div>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Delete Users">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Ban Users">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <div className="flex space-x-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="date">Join Date</option>
                        <option value="name">Name</option>
                        <option value="posts">Post Count</option>
                        <option value="lastActive">Last Active</option>
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                        className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Users Table */}
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-20"></div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 px-6 py-4">
                        <button onClick={toggleSelectAll} className="hover:opacity-70 transition-opacity">
                          {selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0 ? (
                            <CheckCircle className="w-5 h-5 text-blue-600 fill-blue-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                          )}
                        </button>
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">User</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Role</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Posts</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Last Active</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4 hidden xl:table-cell">Joined</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleSelectUser(user.id)} className="hover:opacity-70 transition-opacity">
                            {selectedUsers.includes(user.id) ? (
                              <CheckCircle className="w-5 h-5 text-blue-600 fill-blue-600" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded hover:border-blue-500 transition-colors"></div>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                              {user.status === 'active' && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                                {user.role === 'admin' && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                              </div>
                              <p className="text-xs text-gray-500">{user.email}</p>
                              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                <span>{user.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            <span className="capitalize">{user.role}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              user.status === 'active' ? 'bg-green-500' : 
                              user.status === 'banned' ? 'bg-red-500' : 'bg-gray-500'
                            }`}></div>
                            <span className="capitalize">{user.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span>{user.posts} posts</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{formatTimeAgo(user.lastActive)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden xl:table-cell">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(user.joinedDate)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button 
                              onClick={() => handleOpenModal('edit', user)}
                              className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" 
                              title="Edit User"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {paginatedUsers.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">{(currentPage - 1) * usersPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * usersPerPage, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> users
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'add' ? 'Add New User' : 'Edit User'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    defaultValue={currentUser?.role || 'subscriber'}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="subscriber">Subscriber</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={currentUser?.status || 'active'}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    defaultValue={currentUser?.bio}
                    rows={3}
                    placeholder="Short bio description..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.location}
                    placeholder="New York, USA"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {modalType === 'add' && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Send Invitation Email</h4>
                      <p className="text-xs text-blue-700 mt-1">An email with login instructions will be sent to the user's email address.</p>
                      <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <span className="text-sm text-blue-800">Send invitation now</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                {modalType === 'add' ? 'Create User' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UsersPage;