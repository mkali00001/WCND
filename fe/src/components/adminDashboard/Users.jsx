import React, { useState } from "react";
import { Eye, Edit, RefreshCw, XCircle, X, Users as UsersIcon, Loader2 } from "lucide-react";
import axios from "axios";

const UserManagement = ({ users }) => {
  const [userList, setUserList] = useState(users); // Make users editable
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // State for modal data
  const [registrationData, setRegistrationData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [modalPage, setModalPage] = useState(1);

  const fetchRegistrationData = async (userId) => {
    setDetailLoading(true);
    setDetailError(null);
    setRegistrationData(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/users-registration/${userId}`,
        { withCredentials: true }
      );
      setRegistrationData(res.data);
      console.log(res.data);
    } catch (err) {
      setDetailError(err.response?.data?.error || "Could not load registration details.");
      console.error("Error fetching registration data:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
    setModalPage(1); // Reset to first page on open
    fetchRegistrationData(user._id);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setRegistrationData(null);
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
                      {selectedUser.name} 
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
                    {detailLoading && (
                      <div className="flex justify-center items-center p-10">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                      </div>
                    )}
                    {detailError && (
                      <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
                        {detailError}
                      </div>
                    )}
                    {registrationData && (
                      <div className="space-y-4 text-sm">
                        {/* Modal Pagination */}
                        <div className="flex border-b">
                          <button onClick={() => setModalPage(1)} className={`px-4 py-2 text-sm font-medium ${modalPage === 1 ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>Personal</button>
                          <button onClick={() => setModalPage(2)} className={`px-4 py-2 text-sm font-medium ${modalPage === 2 ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>Academic</button>
                          <button onClick={() => setModalPage(3)} className={`px-4 py-2 text-sm font-medium ${modalPage === 3 ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>Logistics</button>
                          <button onClick={() => setModalPage(4)} className={`px-4 py-2 text-sm font-medium ${modalPage === 4 ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>Payment</button>
                        </div>

                        {/* Page 1: Personal Info */}
                        {modalPage === 1 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <p><strong>ID:</strong> {registrationData.registrationId}</p>
                            <p><strong>Full Name:</strong> {registrationData.fullName}</p>
                            <p><strong>Title:</strong> {registrationData.title}</p>
                            <p><strong>Pronunciation:</strong> {registrationData.pronunciation || 'N/A'}</p>
                            <p><strong>Gender:</strong> {registrationData.gender}</p>
                            <p><strong>Email:</strong> {registrationData.email}</p>
                            <p><strong>Alternate Email:</strong> {registrationData.altEmail || 'N/A'}</p>
                            <p><strong>Phone:</strong> {registrationData.phone}</p>
                            <p><strong>Alternate Phone:</strong> {registrationData.altPhone || 'N/A'}</p>
                            <p><strong>Nationality:</strong> {registrationData.nationality}</p>
                            <p><strong>Country:</strong> {registrationData.country}</p>
                            <p><strong>Participant Type:</strong> {registrationData.participantType}</p>
                            <p><strong>Mother Tongue:</strong> {registrationData.motherTongue}</p>
                            <p><strong>Website:</strong> {registrationData.website || 'N/A'}</p>
                            <p><strong>Date of Birth:</strong> {new Date(registrationData.dateOfBirth).toLocaleDateString()}</p>
                            {registrationData.participantType === 'International' ? (
                              <><p><strong>Passport No:</strong> {registrationData.passportNo}</p><p><strong>Passport Expiry:</strong> {new Date(registrationData.passportExpiry).toLocaleDateString()}</p></>
                            ) : (
                              <p><strong>Govt ID:</strong> {registrationData.govtId}</p>
                            )}
                            <p className="sm:col-span-2"><strong>Address:</strong> {registrationData.address}</p>
                            <div className="sm:col-span-2 pt-2 border-t mt-2">
                              <h4 className="font-semibold text-slate-800 mb-1">Emergency Contact</h4>
                              <p><strong>Name:</strong> {registrationData.emergencyName}</p>
                              <p><strong>Relation:</strong> {registrationData.emergencyRelation}</p>
                              <p><strong>Phone:</strong> {registrationData.emergencyPhone}</p>
                            </div>
                          </div>
                        )}

                        {/* Page 2: Academic & Participation */}
                        {modalPage === 2 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <p><strong>Designation:</strong> {registrationData.designation}</p>
                            <p><strong>Qualification:</strong> {registrationData.qualification}</p>
                            <p className="sm:col-span-2"><strong>Institution:</strong> {registrationData.institution}</p>
                            <p><strong>Department:</strong> {registrationData.department}</p>
                            <p><strong>ORCID:</strong> {registrationData.orcid || 'N/A'}</p>
                            <p><strong>Registration Type:</strong> {registrationData.registrationType}</p>
                            <p><strong>Previous Conference:</strong> {registrationData.prevConference}</p>
                          </div>
                        )}

                        {/* Page 3: Logistics */}
                        {modalPage === 3 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <p><strong>Accommodation:</strong> {registrationData.accommodationRequired}</p>
                            <p><strong>Travel Assistance:</strong> {registrationData.travelAssistanceRequired}</p>
                            <p><strong>Visa Support:</strong> {registrationData.requireVisaSupport}</p>
                            <p><strong>Dietary Preference:</strong> {registrationData.dietaryPreference}</p>
                            <p><strong>Health Conditions:</strong> {registrationData.healthConditions || 'N/A'}</p>
                            <p><strong>Allergies:</strong> {registrationData.allergies === 'Yes' ? registrationData.allergyDetails : 'No'}</p>
                            <p><strong>Travel Insurance:</strong> {registrationData.travelInsuranceStatus}</p>
                            <p><strong>Willing for Field Trips:</strong> {registrationData.willingForFieldTrips}</p>
                            {registrationData.requireVisaSupport === 'Yes' && (
                               <p className="sm:col-span-2"><strong>Nearest Embassy:</strong> {registrationData.nearestEmbassyConsulate}</p>
                            )}
                            <p className="sm:col-span-2 pt-2 border-t mt-2"><strong>Arrival:</strong> {registrationData.arrivalDateTime ? new Date(registrationData.arrivalDateTime).toLocaleString() : 'N/A'}</p>
                            <p className="sm:col-span-2"><strong>Departure:</strong> {registrationData.departureDateTime ? new Date(registrationData.departureDateTime).toLocaleString() : 'N/A'}</p>
                            <p><strong>Arrival Date&Time:</strong> {registrationData.arrivalDateTime}</p>
                            <p><strong>Departure Date&Time:</strong> {registrationData.departureDateTime}</p>
                          </div>
                        )}

                        {/* Page 4: Payment & Accompanying */}
                        {modalPage === 4 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                              <p><strong>Fee Category:</strong> {registrationData.feeCategory}</p>
                              <p><strong>Payment Mode:</strong> {registrationData.paymentMode}</p>
                              <p><strong>Sponsorship:</strong> {registrationData.sponsorship}</p>
                              <p><strong>Billing Invoice Details:</strong> {registrationData.billingInvoiceDetails}</p>
                              {registrationData.sponsorship !== 'Self-funded' && (
                                <p className="sm:col-span-2"><strong>Sponsoring Org:</strong> {registrationData.sponsoringOrganizationDetails}</p>
                              )}
                              
                            </div>
                            {registrationData.accompanyingPersons?.length > 0 && (
                              <div className="pt-2 border-t">
                                <h4 className="font-semibold text-slate-800 mb-1">Accompanying Person(s)</h4>
                                {registrationData.accompanyingPersons.map((person, i) => (
                                  <div key={i} className="mt-2 p-2 border rounded-md bg-slate-50">
                                    <p><strong>Name:</strong> {person.fullName}</p>
                                    <p><strong>Relation:</strong> {person.relation}</p>
                                    <p><strong>Nationality:</strong> {person.nationality}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
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
