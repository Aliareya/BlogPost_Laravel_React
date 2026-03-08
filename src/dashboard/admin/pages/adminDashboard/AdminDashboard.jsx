import React, { useState } from 'react';
import { Icon } from '@iconify/react';

// --- Sub-Components ---

// 1. Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: 'mdi:view-dashboard-variant', label: 'Dashboard', active: true },
    { icon: 'mdi:account-group', label: 'Customers', active: false },
    { icon: 'mdi:chart-bar', label: 'Analytics', active: false },
    { icon: 'mdi:shopping-cart', label: 'Orders', active: false },
    { icon: 'mdi:wallet', label: 'Finance', active: false },
    { icon: 'mdi:cog', label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Icon icon="mdi:hexagon" className="w-8 h-8" />
            <span>NEXUS</span>
          </div>
        </div>

        <nav className="mt-5 px-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${item.active 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon icon={item.icon} className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
           <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
              <Icon icon="mdi:logout" className="w-5 h-5 mr-3" />
              Logout
           </a>
        </div>
      </aside>
    </>
  );
};

// 2. Header Component
const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-1 mr-4 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring"
        >
          <Icon icon="mdi:menu" className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
          </span>
          <input 
            type="text" 
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search..."
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600">
          <Icon icon="mdi:bell-outline" className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src="https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff" 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">John Doe</span>
          <Icon icon="mdi:chevron-down" className="w-4 h-4 text-gray-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

// 3. Stats Card Component
const StatCard = ({ title, value, trend, trendUp, icon, color }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon icon={icon} className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
        <Icon icon={trendUp ? "mdi:trending-up" : "mdi:trending-down"} className="w-4 h-4 mr-1" />
        {trend}
      </span>
      <span className="text-gray-400 ml-2">vs last month</span>
    </div>
  </div>
);

// --- Main App Component ---

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          
          <div className="max-w-7xl mx-auto">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Revenue" 
                value="$54,239" 
                trend="12.5%" 
                trendUp={true} 
                icon="mdi:cash-multiple"
                color="bg-indigo-500"
              />
              <StatCard 
                title="Active Users" 
                value="2,543" 
                trend="8.2%" 
                trendUp={true} 
                icon="mdi:account-group"
                color="bg-blue-500"
              />
              <StatCard 
                title="New Orders" 
                value="1,234" 
                trend="2.1%" 
                trendUp={false} 
                icon="mdi:cart-outline"
                color="bg-orange-500"
              />
              <StatCard 
                title="Pending Issues" 
                value="45" 
                trend="4.3%" 
                trendUp={true} 
                icon="mdi:alert-circle"
                color="bg-red-500"
              />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Main Table (Takes up 2/3 space) */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {[1, 2, 3, 4].map((item) => (
                        <tr key={item} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                              {item === 1 ? 'JD' : item === 2 ? 'AS' : item === 3 ? 'MK' : 'LP'}
                            </div>
                            <span className="font-medium text-gray-700">
                              {item === 1 ? 'John Doe' : item === 2 ? 'Alice Smith' : item === 3 ? 'Mike K.' : 'Lisa P.'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">Oct {20 + item}, 2023</td>
                          <td className="px-6 py-4 font-medium text-gray-700">$120.00</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Widget (Takes up 1/3 space) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Source</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Direct', val: '45%', color: 'bg-indigo-500' },
                    { label: 'Social Media', val: '30%', color: 'bg-blue-400' },
                    { label: 'Referral', val: '15%', color: 'bg-orange-400' },
                    { label: 'Others', val: '10%', color: 'bg-gray-300' },
                  ].map((source, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{source.label}</span>
                        <span className="font-medium text-gray-800">{source.val}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${source.color}`} style={{ width: source.val }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-indigo-50 rounded-lg flex items-start gap-3">
                  <Icon icon="mdi:lightbulb-on" className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900">Pro Tip</h4>
                    <p className="text-xs text-indigo-700 mt-1">Try filtering your data by date range to see better insights.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}