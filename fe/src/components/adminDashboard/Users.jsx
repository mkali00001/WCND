import React, { useState } from "react";
import { Eye, Edit, RefreshCw, XCircle } from "lucide-react";

const Users = () => {
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
  ];

  const handleView = (user) => setSelectedUser(user);
  const handleClose = () => setSelectedUser(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        User Management
      </h1>

      <div className="hidden md:block overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-5 py-3">User ID</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Country</th>
              <th className="px-5 py-3">Registration</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3">Last Login</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-medium text-gray-900">{user.id}</td>
                <td className="px-5 py-3">{user.name}</td>
                <td className="px-5 py-3">{user.email}</td>
                <td className="px-5 py-3">{user.phone}</td>
                <td className="px-5 py-3">{user.country}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.registrationStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.registrationStatus}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.paymentStatus === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-3">{user.createdAt}</td>
                <td className="px-5 py-3">{user.lastLogin}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => handleView(user)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <RefreshCw size={16} />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-900">{user.name}</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.registrationStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user.registrationStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.phone}</p>
            <p className="text-sm text-gray-600">{user.country}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleView(user)}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
              >
                <Eye size={14} /> View
              </button>
              <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600">
                <Edit size={14} /> Edit
              </button>
              <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600">
                <RefreshCw size={14} /> Resend
              </button>
              <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">
                <XCircle size={14} /> Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
              User Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Personal Info
                </h3>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>Country:</strong> {selectedUser.country}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Registration</h3>
                <p>Status: {selectedUser.registrationStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Payment</h3>
                <p>Status: {selectedUser.paymentStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Paper Submissions</h3>
                <p>No submissions yet.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Activity Log</h3>
                <p>Created: {selectedUser.createdAt}</p>
                <p>Last Login: {selectedUser.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
