import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  Package, 
  ClipboardList, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  User,
  LogOut,
  UserCog,
  ChevronDown 
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import DashboardOverview from './DashboardOverview';
import FeedbackManagement from './FeedbackManagement';
import UserConversations from './UserConversations';
import ProductManagement from './ProductManagement';
import InventoryManagement from './InventoryManagement';
import OrderManagement from './OrderManagement';
import SalesAnalytics from './SalesAnalytics';
import AdminSettings from './AdminSettings';
import UserManagement from './UserManagement';

const Dashboard = ({ auth }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'users', label: 'Users', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'feedback':
        return <FeedbackManagement />;
      case 'conversations':
        return <UserConversations />;
      case 'products':
        return <ProductManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <SalesAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-indigo-700 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold text-xl ${isSidebarOpen ? 'block' : 'hidden'}`}>Retro Alley</h1>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-full hover:bg-indigo-600 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-4 hover:bg-indigo-600 transition-colors ${
                    activeSection === item.id ? 'bg-indigo-800' : ''
                  }`}
                >
                  <item.icon size={24} />
                  {isSidebarOpen && <span className="ml-4">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {navItems.find(item => item.id === activeSection)?.label}
              </h2>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <Bell size={20} />
                    {/* Notification badge - if you have unread notifications */}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* Notifications dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                      </div>
                      {/* Add your notifications list here */}
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No new notifications
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-900">
                        {auth.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {auth.user.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {auth.user.avatar ? (
                        <img 
                          src={auth.user.avatar} 
                          alt="Profile" 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="p-2 rounded-full bg-gray-200">
                          <User size={20} />
                        </div>
                      )}
                      <ChevronDown size={16} className="ml-2" />
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href={route('profile.edit')}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserCog className="mr-2" size={16} />
                        Profile Settings
                      </Link>
                      <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2" size={16} />
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;