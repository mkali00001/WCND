import { useState, useEffect } from "react";
import { Pencil, Trash2, Send } from "lucide-react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: "System Maintenance Scheduled", 
      audience: "All Users", 
      sentBy: "Admin", 
      sentDate: "2025-09-01", 
      status: "Sent", 
      body: "We will be performing scheduled maintenance." 
    },
    { 
      id: 2, 
      title: "Annual Conference Registration Open", 
      audience: "Registered", 
      sentBy: "Admin", 
      sentDate: "2025-09-10", 
      status: "Draft", 
      body: "Registration is now open for the annual conference." 
    },
    { 
      id: 3, 
      title: "New Feature Release", 
      audience: "Premium", 
      sentBy: "Product Team", 
      sentDate: "2025-09-15", 
      status: "Sent", 
      body: "We are excited to announce our new feature!" 
    },
  ]);

  const [form, setForm] = useState({ id: null, title: "", body: "", audience: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update announcement
      setAnnouncements(
        announcements.map((a) =>
          a.id === form.id ? { ...a, title: form.title, body: form.body, audience: form.audience } : a
        )
      );
      setIsEditing(false);
    } else {
      // Create new announcement
      const newAnnouncement = {
        id: Math.max(...announcements.map((a) => a.id), 0) + 1,
        title: form.title,
        body: form.body,
        audience: form.audience,
        sentBy: "Admin",
        sentDate: new Date().toISOString().split("T")[0],
        status: "Draft",
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }

    setForm({ id: null, title: "", body: "", audience: "" });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handleResend = (id) => {
    setAnnouncements(
      announcements.map((a) => (a.id === id ? { ...a, status: "Sent" } : a))
    );
  };

  const handleEdit = (announcement) => {
    setForm(announcement);
    setIsEditing(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent":
        return "bg-green-100 text-green-700 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // Mobile Card Component
  const AnnouncementCard = ({ announcement }) => (
    <div className="w-full bg-gray-100 border border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold ">{announcement.title}</h3>
          <p className="text-sm text-gray-400">To: {announcement.audience}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(announcement.status)}`}>
          {announcement.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">{announcement.body}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>By {announcement.sentBy}</span>
        <span>{announcement.sentDate}</span>
      </div>

      <div className="flex items-center gap-2 pt-2">
        {announcement.status !== "Sent" && (
          <button
            onClick={() => handleResend(announcement.id)}
            className="flex-1 h-8 px-3 bg-blue-600 hover:bg-blue-700  text-sm rounded-md border border-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="h-3 w-3" />
            Send
          </button>
        )}
        {announcement.status === "Draft" && (
          <button
            onClick={() => handleEdit(announcement)}
            className="h-8 px-3 bg-gray-100 hover:bg-gray-600 text-gray-300 text-sm rounded-md border border-gray-600 transition-colors"
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => handleDelete(announcement.id)}
          className="h-8 px-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm rounded-md border border-red-600/20 transition-colors"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6 max-w-6xl">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight ">Announcements</h1>
          <p className="text-gray-400">Create and manage announcements for your users</p>
        </div>

        {/* Create / Edit Form */}
        <div className=" border border-gray-300 rounded-lg">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold ">{isEditing ? "Edit Announcement" : "Create Announcement"}</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium ">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter announcement title"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-medium ">Message</label>
                <textarea
                  id="body"
                  placeholder="Enter announcement message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="audience" className="text-sm font-medium ">Audience</label>
                <select
                  id="audience"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  required
                >
                  <option value="">Select audience</option>
                  <option value="All Users">All Users</option>
                  <option value="Registered">Registered Users</option>
                  <option value="Guests">Guests</option>
                  <option value="Premium">Premium Members</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition-colors font-medium"
                >
                  {isEditing ? "Save Changes" : "Create Announcement"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setForm({ id: null, title: "", body: "", audience: "" }); }}
                    className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Announcements List */}
        <div className=" border border-gray-300 rounded-lg">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-xl font-semibold ">Past Announcements</h2>
          </div>
          <div className="p-0 md:p-6">
            {isMobile ? (
              <div className="space-y-4 p-4">
                {announcements.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-medium w-16">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Audience</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Sent By</th>
                      <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((announcement) => (
                      <tr key={announcement.id} className="border-b border-gray-300 hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">{announcement.id}</td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="font-medium">{announcement.title}</div>
                            <div className="text-xs text-gray-400 sm:hidden">
                              {announcement.audience} • {announcement.sentDate}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">{announcement.audience}</td>
                        <td className="py-3 px-4 hidden md:table-cell">{announcement.sentBy}</td>
                        <td className="py-3 px-4 hidden lg:table-cell">{announcement.sentDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(announcement.status)}`}>
                            {announcement.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {announcement.status !== "Sent" && (
                              <button
                                onClick={() => handleResend(announcement.id)}
                                className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md border border-gray-600 transition-colors flex items-center justify-center"
                              >
                                <Send className="h-3 w-3" />
                              </button>
                            )}
                            {announcement.status === "Draft" && (
                              <button
                                onClick={() => handleEdit(announcement)}
                                className="h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md border border-gray-600 transition-colors flex items-center justify-center"
                              >
                                <Pencil className="h-3 w-3" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(announcement.id)}
                              className="h-8 w-8 p-0 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-md border border-red-600/20 transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
