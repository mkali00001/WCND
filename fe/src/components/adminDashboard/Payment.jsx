import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Search,
  Filter,
  X,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [userFilter, setUserFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
  currentPage: 1,
  totalPages: 1,
  totalPayments: 0,
  limit: 10, // Set limit to 10!
});


  // Fetch payments with server-side pagination and filters
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
    `${import.meta.env.VITE_ALLOWED_ORIGIN}/admin/paymentstatus`,
    {
      params: {
        page: pagination.currentPage,
        limit: pagination.limit, // Will be 10
        status: statusFilter !== "All" ? statusFilter : undefined,
        from: dateFilter.from || undefined,
        to: dateFilter.to || undefined,
        user: userFilter || undefined,
      },
      withCredentials: true,
    }
  );
      setPayments(response.data.payments);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.pagination.totalPages,
        totalPayments: response.data.pagination.totalPayments,
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, statusFilter, dateFilter, userFilter]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const getStatusColor = (status) => {
    const map = {
      Success: "bg-green-50 text-green-700 border-green-200",
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Failed: "bg-red-50 text-red-700 border-red-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const clearFilters = () => {
    setStatusFilter("All");
    setDateFilter({ from: "", to: "" });
    setUserFilter("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="md:p-6">
      <div className="max-w-7xl md:mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <CreditCard size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                Payments
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Track and manage all user payments
              </p>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2 bg-white border border-slate-200 rounded-lg shadow-sm"
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "block" : "hidden"} md:block mb-4 sm:mb-6`}>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h3 className="font-medium text-slate-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateFilter.from}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, from: e.target.value })
                    }
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="date"
                    value={dateFilter.to}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, to: e.target.value })
                    }
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* User Filter */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Search User
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name, email or user ID"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search
                    size={16}
                    className="absolute left-2.5 top-2.5 text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider hidden md:table-cell">
                    Order ID
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 font-medium text-slate-900 text-xs sm:text-sm truncate max-w-24">
                      {payment.razorpayPaymentId}
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4">
                      <div className="text-xs sm:text-sm font-semibold text-slate-900">
                        {payment.user?.name || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500">{payment.user?._id}</div>
                      <div className="text-xs text-slate-500 sm:hidden truncate max-w-24">
                        {payment.email}
                      </div>
                      <div className="text-xs text-slate-400 md:hidden">
                        {payment.orderId}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 hidden sm:table-cell text-xs sm:text-sm text-slate-600">
                      {payment.email}
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 hidden md:table-cell text-xs sm:text-sm text-slate-600 truncate max-w-24">
                      {payment.orderId}
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-xs sm:text-sm font-medium text-slate-900">
                      <div>{(payment.amount / 100).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">{payment.currency}</div>
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-center">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye size={12} className="sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2">{pagination.currentPage} / {pagination.totalPages}</span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Empty/Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center mt-4">
            <h3 className="text-lg font-medium text-red-800 mb-2">An Error Occurred</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {payments.length === 0 && !loading && !error && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center mt-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No payments found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your filters to see more results.</p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <div className="bg-white border-0 sm:border border-slate-200 rounded-t-2xl sm:rounded-xl shadow-xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              {/* Modal content */}
              {/* ... (same modal content as your previous code) */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
