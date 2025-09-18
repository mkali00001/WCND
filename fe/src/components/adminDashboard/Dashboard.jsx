import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const kpis = [
    { title: "Total Users", value: 1200 },
    { title: "Paid Users", value: 450 },
    { title: "Pending Users", value: 100 },
    { title: "Failed Payments", value: 35 },
    { title: "Total Revenue Collected", value: "$18,500" },
    { title: "Total Papers Submitted", value: 320 },
  ];

  const registrationTrend = [
    { date: "Mon", users: 20 },
    { date: "Tue", users: 35 },
    { date: "Wed", users: 25 },
    { date: "Thu", users: 50 },
    { date: "Fri", users: 40 },
    { date: "Sat", users: 60 },
    { date: "Sun", users: 45 },
  ];

  const paymentStatus = [
    { name: "Paid", value: 450 },
    { name: "Pending", value: 100 },
    { name: "Failed", value: 35 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-600">{kpi.title}</h2>
            <p className="text-2xl font-bold mt-2 text-gray-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Registrations Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Payment Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {paymentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;