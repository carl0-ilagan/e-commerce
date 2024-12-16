import React, { useState } from 'react';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    adminName: 'Admin User',
    email: 'admin@retroalley.com',
    salesTax: 12,
    enableFeedback: true,
    enableChat: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Saving settings:', settings);
    // Show a success message to the user
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Settings</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">Admin Name</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={settings.adminName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="salesTax" className="block text-sm font-medium text-gray-700">Sales Tax (%)</label>
          <input
            type="number"
            id="salesTax"
            name="salesTax"
            value={settings.salesTax}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableFeedback"
            name="enableFeedback"
            checked={settings.enableFeedback}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableFeedback" className="ml-2 block text-sm text-gray-900">
            Enable Feedback Feature
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableChat"
            name="enableChat"
            checked={settings.enableChat}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableChat" className="ml-2 block text-sm text-gray-900">
            Enable Chat Feature
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Save size={20} className="mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

