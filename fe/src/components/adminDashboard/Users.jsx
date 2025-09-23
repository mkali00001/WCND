import React, { useState, useEffect } from "react";
import { Eye, Edit, RefreshCw, XCircle, X, Users as UsersIcon, Loader2 } from "lucide-react";
import axios from "axios";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, limit: 10 });

  // Fetch paginated users
  const fetchUsers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/admin/users`, {
        params: { page, limit },
        withCredentials: true,
      });
      setUserList(res.data.users);
      setPagination({
        currentPage: res.data.pagination.currentPage,
        totalPages: res.data.pagination.totalPages,
        limit: res.data.pagination.limit,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.currentPage, pagination.limit);
  }, []);

  // Pagination handlers
  const goToPage = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchUsers(page, pagination.limit);
  };

  // Edit/Delete/View handlers remain the same...
  const handleView = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
    // fetchRegistrationData(user._id); // keep your existing logic
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/admin/delete-user/${id}`, { withCredentials: true });
      setUserList(prev => prev.filter(u => u._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <UsersIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
              <p className="text-sm text-slate-600">Manage and monitor user accounts</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-slate-900 uppercase">User</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-slate-900 uppercase hidden md:table-cell">Contact</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-slate-900 uppercase hidden lg:table-cell">Country</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-slate-900 uppercase">Status</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-slate-900 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
                    </td>
                  </tr>
                ) : (
                  userList.map(user => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2 hidden md:table-cell">{user.email}</td>
                      <td className="px-4 py-2 hidden lg:table-cell">{user.country}</td>
                      <td className="px-4 py-2">{user.registrationStatus}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => handleView(user)} className="p-1 bg-blue-50 text-blue-600 rounded-lg mr-1"><Eye size={16} /></button>
                        <button onClick={() => handleEditClick(user)} className="p-1 bg-yellow-50 text-yellow-600 rounded-lg mr-1"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(user._id)} className="p-1 bg-red-50 text-red-600 rounded-lg"><XCircle size={16} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 p-4">
            <button onClick={() => goToPage(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50">Prev</button>
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i+1}
                onClick={() => goToPage(i+1)}
                className={`px-3 py-1 rounded ${pagination.currentPage === i+1 ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}
              >
                {i+1}
              </button>
            ))}
            <button onClick={() => goToPage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages} className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
