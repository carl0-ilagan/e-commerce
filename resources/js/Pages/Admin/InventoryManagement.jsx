import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react';
import axios from 'axios';
import { router } from '@inertiajs/react';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inventory');
      setLoading(false);
      console.error('Error fetching inventory:', err);
    }
  };

  const handleStockChange = async (id, change) => {
    try {
      const response = await axios.patch(`/api/inventory/${id}/stock`, {
        change: change
      });
      
      setInventory(inventory.map(item => 
        item.id === id ? { ...item, stock: response.data.stock } : item
      ));
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.size.toString().includes(searchTerm)
  );

  if (loading) return <div className="text-center py-8">Loading inventory...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <span className="text-gray-600">
            Total Items: {inventory.length}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.stock <= item.low_stock_threshold ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle size={12} className="mr-1" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleStockChange(item.id, 1)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Increase stock"
                      >
                        <ArrowUpCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleStockChange(item.id, -1)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Decrease stock"
                        disabled={item.stock <= 0}
                      >
                        <ArrowDownCircle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;