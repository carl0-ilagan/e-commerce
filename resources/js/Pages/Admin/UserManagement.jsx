import React, { useState } from 'react';
import { Trash2, RefreshCw, Search } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', lastActive: '2023-06-01', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', lastActive: '2023-05-15', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', lastActive: '2023-06-02', status: 'Active' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', lastActive: '2023-04-30', status: 'Inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleResetPassword = (userId) => {
    // In a real application, you would call an API to reset the password
    console.log(`Reset password for user ${userId}`);
    alert(`Password reset email sent to user ${userId}`);
  };

  const handleDeleteAccount = (userId) => {
    // In a real application, you would call an API to delete the account
    setUsers(users.filter(user => user.id !== userId));
    alert(`User ${userId} has been deleted`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastActive}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

