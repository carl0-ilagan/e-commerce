import React from 'react';
import { ShoppingBag, DollarSign, Star, MessageCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOverview = () => {
  const quickStats = [
    { label: 'Total Products', value: 150, icon: ShoppingBag },
    { label: 'Total Orders', value: '₱25,000', icon: DollarSign },
    { label: 'Total Revenue', value: '₱100,000', icon: DollarSign },
    { label: 'Total Feedback', value: 75, icon: Star },
    { label: 'Total Conversations', value: 30, icon: MessageCircle },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <stat.icon size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Analytics Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Low Stock Alerts</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Retro Runner (Size 8)</span>
            <span className="text-red-500 font-semibold">5 left</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Vintage Kicks (Size 9)</span>
            <span className="text-red-500 font-semibold">3 left</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Classic Sneakers (Size 7)</span>
            <span className="text-red-500 font-semibold">2 left</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;

