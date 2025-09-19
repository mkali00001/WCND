import React, { useState } from "react";
import { CreditCard, Search, Filter, X, Eye, MoreVertical } from "lucide-react";

const Payment = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [userFilter, setUserFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const payments = [
    {
      id: "P001",
      userId: "U001",
      name: "John Doe",
      email: "john@example.com",
      orderId: "order_123",
      paymentId: "pay_456",
      amount: 150,
      currency: "USD",
      status: "Success",
      method: "Card",
      date: "2023-09-10 14:20",
    },
    {
      id: "P002",
      userId: "U002",
      name: "Jane Smith",
      email: "jane@example.com",
      orderId: "order_789",
      paymentId: "pay_987",
      amount: 200,
      currency: "INR",
      status: "Pending",
      method: "UPI",
      date: "2023-09-12 09:45",
    },
    {
      id: "P003",
      userId: "U003",
      name: "Mike Lee",
      email: "mike@example.com",
      orderId: "order_555",
      paymentId: "pay_222",
      amount: 100,
      currency: "USD",
      status: "Failed",
      method: "NetBanking",
      date: "2023-09-13 18:30",
    },
    {
      id: "P004",
      userId: "U004",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      orderId: "order_666",
      paymentId: "pay_333",
      amount: 75,
      currency: "EUR",
      status: "Success",
      method: "PayPal",
      date: "2023-09-14 11:15",
    },
    {
      id: "P005",
      userId: "U005",
      name: "David Brown",
      email: "david@example.com",
      orderId: "order_777",
      paymentId: "pay_444",
      amount: 300,
      currency: "GBP",
      status: "Pending",
      method: "Card",
      date: "2023-09-15 16:45",
    },
  ];

  const filteredPayments = payments.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchUser =
      !userFilter ||
      p.name.toLowerCase().includes(userFilter.toLowerCase()) ||
      p.email.toLowerCase().includes(userFilter.toLowerCase()) ||
      p.userId.toLowerCase().includes(userFilter.toLowerCase());
    const matchDate =
      (!dateFilter.from || new Date(p.date) >= new Date(dateFilter.from)) &&
      (!dateFilter.to || new Date(p.date) <= new Date(dateFilter.to));
    return matchStatus && matchUser && matchDate;
  });

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
  };

  return (
    <div className="md:p-6">
      <div className="max-w-7xl md:mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <CreditCard size={20} className="sm:w-6 sm:h-6" />
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

        {/* Filters - Mobile Collapsible */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-4 sm:mb-6`}>
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
                    placeholder="From"
                  />
                  <input
                    type="date"
                    value={dateFilter.to}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, to: e.target.value })
                    }
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="To"
                  />
                </div>
              </div>

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

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''}
          </p>
          <div className="hidden md:flex items-center gap-2">
            {(statusFilter !== "All" || userFilter || dateFilter.from || dateFilter.to) && (
              <button
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Responsive Table View */}
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
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 font-medium text-slate-900 text-xs sm:text-sm">
                      {payment.id}
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4">
                      <div className="text-xs sm:text-sm font-semibold text-slate-900">
                        {payment.name}
                      </div>
                      <div className="text-xs text-slate-500">{payment.userId}</div>
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
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 hidden md:table-cell text-xs sm:text-sm text-slate-600">
                      {payment.orderId}
                    </td>
                    <td className="px-2 sm:px-4 lg:px-6 py-3 lg:py-4 text-xs sm:text-sm font-medium text-slate-900">
                      <div>{payment.amount}</div>
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

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No payments found</h3>
            <p className="text-slate-500 mb-4">
              Try adjusting your filters to see more results.
            </p>
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
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl sm:rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Payment Details
                    </h2>
                    <p className="text-sm text-slate-500">
                      {selectedPayment.name} ({selectedPayment.userId})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 lg:p-6 space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Payment ID
                      </label>
                      <p className="text-sm text-slate-900 font-mono">{selectedPayment.id}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Order ID
                      </label>
                      <p className="text-sm text-slate-900 font-mono">
                        {selectedPayment.orderId}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Amount
                      </label>
                      <p className="text-lg font-bold text-slate-900">
                        {selectedPayment.amount} {selectedPayment.currency}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Method
                      </label>
                      <p className="text-sm text-slate-900">
                        {selectedPayment.method}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Status
                      </label>
                      <span
                        className={`inline-flex px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                          selectedPayment.status
                        )}`}
                      >
                        {selectedPayment.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Date & Time
                      </label>
                      <p className="text-sm text-slate-900">
                        {selectedPayment.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
                    User Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Name
                      </label>
                      <p className="text-sm text-slate-900">
                        {selectedPayment.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        User ID
                      </label>
                      <p className="text-sm text-slate-900 font-mono">
                        {selectedPayment.userId}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-slate-500 uppercase">
                        Email
                      </label>
                      <p className="text-sm text-slate-900">
                        {selectedPayment.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col gap-2 p-4 lg:p-6 border-t border-slate-200 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                    Retry Payment
                  </button>
                  <button className="bg-green-50 text-green-700 hover:bg-green-100 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                    Send Receipt
                  </button>
                  <button className="bg-red-50 text-red-700 hover:bg-red-100 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
                    Cancel Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;