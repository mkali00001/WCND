import React, { useState } from "react";
import { RefreshCw, Edit, Trash2 } from "lucide-react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: "ANN001",
      title: "Welcome to Conference",
      body: "We are excited to announce the start of our annual conference.",
      audience: "All",
      sentBy: "Admin",
      sentDate: "2023-09-10",
      status: "Sent",
    },
    {
      id: "ANN002",
      title: "Paper Submission Reminder",
      body: "Please submit your papers before the deadline.",
      audience: "Users",
      sentBy: "Admin",
      sentDate: "2023-09-12",
      status: "Draft",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    body: "",
    audience: "All",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: `ANN${String(announcements.length + 1).padStart(3, "0")}`,
      ...form,
      sentBy: "Admin",
      sentDate: new Date().toISOString().split("T")[0],
      status: "Draft",
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setForm({ title: "", body: "", audience: "All" });
  };

  const handleResend = (a) => alert(`Resending announcement: ${a.title}`);
  const handleEdit = (a) => alert(`Editing draft: ${a.title}`);
  const handleDelete = (id) =>
    setAnnouncements(announcements.filter((a) => a.id !== id));

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Announcements</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create Announcement
        </h2>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter announcement title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              required
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter announcement details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>
            <select
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Users">Users</option>
              <option value="Reviewers">Reviewers</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save as Draft
          </button>
        </div>
      </form>

      <div className="hidden sm:block overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="w-full min-w-[900px] text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Audience</th>
              <th className="px-5 py-3">Sent By</th>
              <th className="px-5 py-3">Sent Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {announcements.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-medium text-gray-900">{a.id}</td>
                <td className="px-5 py-3">{a.title}</td>
                <td className="px-5 py-3">{a.audience}</td>
                <td className="px-5 py-3">{a.sentBy}</td>
                <td className="px-5 py-3">{a.sentDate}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      a.status === "Sent"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => handleResend(a)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <RefreshCw size={16} />
                  </button>
                  {a.status === "Draft" && (
                    <button
                      onClick={() => handleEdit(a)}
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-6">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-900">{a.title}</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  a.status === "Sent"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {a.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Audience: {a.audience}</p>
            <p className="text-sm text-gray-600">By: {a.sentBy}</p>
            <p className="text-sm text-gray-600">Date: {a.sentDate}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleResend(a)}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
              >
                <RefreshCw size={14} /> Resend
              </button>
              {a.status === "Draft" && (
                <button
                  onClick={() => handleEdit(a)}
                  className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600"
                >
                  <Edit size={14} /> Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(a.id)}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
