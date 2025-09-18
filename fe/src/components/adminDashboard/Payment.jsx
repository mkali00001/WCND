import React, { useState } from "react";

const Payment = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [userFilter, setUserFilter] = useState("");

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
  ];

  const filteredPayments = payments.filter((p) => {
    const matchStatus =
      statusFilter === "All" || p.status === statusFilter;
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="All">All</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, from: e.target.value })
              }
              className="w-1/2 border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, to: e.target.value })
              }
              className="w-1/2 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by User
          </label>
          <input
            type="text"
            placeholder="Enter name, email or user ID"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-5 py-3">Payment ID</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Razorpay Payment ID</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Currency</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-medium text-gray-900">
                  {payment.id}
                </td>
                <td className="px-5 py-3">{payment.userId} / {payment.name}</td>
                <td className="px-5 py-3">{payment.email}</td>
                <td className="px-5 py-3">{payment.orderId}</td>
                <td className="px-5 py-3">{payment.paymentId}</td>
                <td className="px-5 py-3">{payment.amount}</td>
                <td className="px-5 py-3">{payment.currency}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      payment.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-5 py-3">{payment.method}</td>
                <td className="px-5 py-3">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredPayments.map((payment) => (
          <div
            key={payment.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-900">
                {payment.userId} / {payment.name}
              </h2>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  payment.status === "Success"
                    ? "bg-green-100 text-green-700"
                    : payment.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{payment.email}</p>
            <p className="text-sm text-gray-600">
              Amount: {payment.amount} {payment.currency}
            </p>
            <p className="text-sm text-gray-600">Method: {payment.method}</p>
            <p className="text-sm text-gray-600">Order: {payment.orderId}</p>
            <p className="text-sm text-gray-600">Payment ID: {payment.paymentId}</p>
            <p className="text-sm text-gray-600">Date: {payment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
