import React, { useState } from "react";
import { Eye, Edit, RefreshCw, XCircle, X, Users as UsersIcon } from "lucide-react";
import axios from "axios";

const UserManagement = ({ users }) => {
  const [userList, setUserList] = useState(users); // Make users editable
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const handleView = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
  };
  const handleClose = () => {
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserList(userList.map(u => u._id === editForm._id ? editForm : u));
    setSelectedUser(editForm);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/delete-user/${id}`, {
        withCredentials: true,
      });

        setUserList((prevList) => prevList.filter((u) => u._id !== id));
        if (selectedUser?._id === id) setSelectedUser(null);

        console.log(`Deleted user: ${id}`);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

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
                  {userList.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      {/* User Info */}
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs lg:text-sm overflow-hidden">
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 truncate">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {user.id}
                            </div>
                            <div className="text-xs text-slate-500 md:hidden truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-slate-900">{user.email}</div>
                        <div className="text-xs text-slate-500">{user.phone}</div>
                      </td>

                      {/* Country */}
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

                      {/* Activity */}
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
                            onClick={() => handleEditClick(user)}
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
                            onClick={() => handleDelete(user._id)}
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
              {/* Header */}
              <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isEditing ? "Edit User" : "User Details"}
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

              {/* Content */}
              <div className="p-4 lg:p-6 space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</label>
                      <input name="name" value={editForm.name} onChange={handleChange} className="border p-2 w-full rounded" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
                      <input name="email" value={editForm.email} onChange={handleChange} className="border p-2 w-full rounded" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</label>
                      <input name="phone" value={editForm.phone} onChange={handleChange} className="border p-2 w-full rounded" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Country</label>
                      <input name="country" value={editForm.country} onChange={handleChange} className="border p-2 w-full rounded" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Registration Status</label>
                      <select name="registrationStatus" value={editForm.registrationStatus} onChange={handleChange} className="border p-2 w-full rounded">
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Payment Status</label>
                      <select name="paymentStatus" value={editForm.paymentStatus} onChange={handleChange} className="border p-2 w-full rounded">
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Personal Information</h3>
                      <p><strong>Name:</strong> {selectedUser.name}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>Phone:</strong> {selectedUser.phone}</p>
                      <p><strong>Country:</strong> {selectedUser.country}</p>
                    </div>

                    {/* Status Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Status & Payment</h3>
                      <p><strong>Registration Status:</strong> {selectedUser.registrationStatus}</p>
                      <p><strong>Payment Status:</strong> {selectedUser.paymentStatus}</p>
                    </div>

                    {/* Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Activity & Submissions</h3>
                      <p><strong>Account Created:</strong> {selectedUser.createdAt}</p>
                      <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                      <p><strong>Paper Submissions:</strong> No submissions yet.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 lg:p-6 border-t border-slate-200">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(selectedUser)}
                    className="flex-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Edit User
                  </button>
                )}
                <button className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 font-medium py-2 px-4 rounded-lg transition-colors">
                  Send Email
                </button>
                <button
                  onClick={() => handleDelete(selectedUser._id)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-lg transition-colors"
                >
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
