import React, { useState } from "react";
import { Eye, Edit, RefreshCw, XCircle, X, Users as UsersIcon } from "lucide-react";

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: "U001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      country: "USA",
      registrationStatus: "Paid",
      paymentStatus: "Success",
      createdAt: "2023-09-01",
      lastLogin: "2023-09-10",
    },
    {
      id: "U002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+9876543210",
      country: "UK",
      registrationStatus: "Pending",
      paymentStatus: "Pending",
      createdAt: "2023-09-05",
      lastLogin: "2023-09-12",
    },
    {
      id: "U003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1122334455",
      country: "Canada",
      registrationStatus: "Paid",
      paymentStatus: "Failed",
      createdAt: "2023-08-28",
      lastLogin: "2023-09-11",
    },
    {
      id: "U004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+5566778899",
      country: "Australia",
      registrationStatus: "Pending",
      paymentStatus: "Success",
      createdAt: "2023-09-03",
      lastLogin: "2023-09-13",
    },
  ];

  const handleView = (user) => setSelectedUser(user);
  const handleClose = () => setSelectedUser(null);

  const getStatusColor = (status, type) => {
    const statusMap = {
      registration: {
        Paid: 'bg-green-50 text-green-700 border-green-200',
        Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      },
      payment: {
        Success: 'bg-green-50 text-green-700 border-green-200',
        Pending: 'bg-blue-50 text-blue-700 border-blue-200',
        Failed: 'bg-red-50 text-red-700 border-red-200'
      }
    };
    return statusMap[type][status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-1 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <UsersIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                User Management
              </h1>
              <p className="text-sm text-slate-600">
                Manage and monitor user accounts
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider hidden lg:table-cell">
                      Country
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider hidden lg:table-cell">
                      Activity
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-center text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      {/* User Info */}
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs lg:text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 truncate">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {user.id}
                            </div>
                            {/* Show email on mobile when contact column is hidden */}
                            <div className="text-xs text-slate-500 md:hidden truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact - Hidden on mobile */}
                      <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-slate-900">{user.email}</div>
                        <div className="text-xs text-slate-500">{user.phone}</div>
                      </td>

                      {/* Country - Hidden on mobile/tablet */}
                      <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm text-slate-900">{user.country}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(user.registrationStatus, 'registration')}`}>
                            {user.registrationStatus}
                          </span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(user.paymentStatus, 'payment')}`}>
                            {user.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* Activity - Hidden on mobile/tablet */}
                      <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-slate-900">{user.createdAt}</div>
                        <div className="text-xs text-slate-500">Last: {user.lastLogin}</div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex justify-center gap-1 lg:gap-2">
                          <button
                            onClick={() => handleView(user)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                            title="Edit User"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors hidden sm:block"
                            title="Refresh"
                          >
                            <RefreshCw size={16} />
                          </button>
                          <button 
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors hidden sm:block"
                            title="Delete User"
                          >
                            <XCircle size={16} />
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

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      User Details
                    </h2>
                    <p className="text-sm text-slate-500">
                      {selectedUser.name} ({selectedUser.id})
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 lg:p-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</label>
                      <p className="text-sm text-slate-900 font-medium">{selectedUser.name}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
                      <p className="text-sm text-slate-900">{selectedUser.email}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</label>
                      <p className="text-sm text-slate-900">{selectedUser.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Country</label>
                      <p className="text-sm text-slate-900">{selectedUser.country}</p>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Status & Payment
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Registration Status</label>
                      <span className={`inline-flex px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedUser.registrationStatus, 'registration')}`}>
                        {selectedUser.registrationStatus}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Payment Status</label>
                      <span className={`inline-flex px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedUser.paymentStatus, 'payment')}`}>
                        {selectedUser.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Activity & Submissions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Account Created</label>
                      <p className="text-sm text-slate-900">{selectedUser.createdAt}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Last Login</label>
                      <p className="text-sm text-slate-900">{selectedUser.lastLogin}</p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Paper Submissions</label>
                      <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                        No submissions yet. User has not submitted any papers for review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 lg:p-6 border-t border-slate-200">
                <button className="flex-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 font-medium py-2 px-4 rounded-lg transition-colors">
                  Edit User
                </button>
                <button className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 font-medium py-2 px-4 rounded-lg transition-colors">
                  Send Email
                </button>
                <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;