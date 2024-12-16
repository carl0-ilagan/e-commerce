import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';

const SalesAnalytics = () => {
  const monthlySales = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ];

  const categoryData = [
    { name: 'Running', value: 400 },
    { name: 'Casual', value: 300 },
    { name: 'Sports', value: 300 },
    { name: 'Formal', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Sales Analytics</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Download size={20} className="mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-blue-800">Total Revenue</h4>
            <p className="text-3xl font-bold text-blue-600">₱45,678</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-green-800">Average Order Value</h4>
            <p className="text-3xl font-bold text-green-600">₱123</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-800">Conversion Rate</h4>
            <p className="text-3xl font-bold text-yellow-600">3.2%</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-purple-800">Customer Retention</h4>
            <p className="text-3xl font-bold text-purple-600">68%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;

