import { useState, useEffect } from "react";
import { Pencil, Trash2, Send, Plus, X, Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

// --- Modal Component ---
function AnnouncementModal({
  showModal,
  closeModal,
  isEditing,
  loading,
  form,
  setForm,
  handleSubmit,
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Announcement" : "Create Announcement"}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="Enter announcement title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="body" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="body"
                autoComplete="off"
                spellCheck={false}
                placeholder="Enter announcement message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={form.body}
                onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="audience" className="text-sm font-medium text-gray-700">
                Audience
              </label>
              <select
                id="audience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.audience}
                onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))}
                required
              >
                <option value="">Select audience</option>
                <option value="All Users">All Users</option>
                <option value="Registered">Registered Users</option>
                <option value="Guests">Guests</option>
                <option value="Premium">Premium Members</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading
                  ? isEditing
                    ? "Saving..."
                    : "Creating..."
                  : isEditing
                  ? "Save Changes"
                  : "Create Announcement"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
const Announcement = () => {
  const [form, setForm] = useState({ id: null, title: "", body: "", audience: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/announcements/get-announcements`,
          { withCredentials: true }
        );
        setAnnouncements(res.data.data || []);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        toast.error("Failed to load announcements.");
        setAnnouncements([]);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter announcements based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAnnouncements(announcements);
    } else {
      const filtered = announcements.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.audience.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (announcement.sentBy?.name || "Admin").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    }
  }, [announcements, searchTerm]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCreateModal = () => {
    setForm({ id: null, title: "", body: "", audience: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (announcement) => {
    setForm({
      id: announcement._id,
      title: announcement.title,
      body: announcement.body,
      audience: announcement.audience
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setForm({ id: null, title: "", body: "", audience: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        toast.info("Editing is a local-only demo feature for now.");
        setAnnouncements((prev) =>
          prev.map((a) =>
            a._id === form.id ? { ...a, title: form.title, body: form.body, audience: form.audience } : a
          )
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/announcements/create-announcement`,
          { title: form.title, body: form.body, audience: form.audience },
          { withCredentials: true }
        );

        console.log("API Response:", res.data);
        const newAnnouncement = res.data.data || res.data;
        setAnnouncements((prev) => [newAnnouncement, ...prev]);
        toast.success("Announcement created successfully!");
      }

      closeModal();
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error(error.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    toast.info("Deleting is a local-only demo feature for now.");
    setAnnouncements((prev) => prev.filter((a) => a._id !== id));
  };

  const handleResend = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/announcements/send-announcement/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("Send Response:", res.data);
      const updatedAnnouncement = res.data.data || res.data;

      setAnnouncements((prev) =>
        prev.map((a) => (a._id === id ? { ...a, ...updatedAnnouncement } : a))
      );

      toast.success("Announcement sent successfully!");
    } catch (error) {
      console.error("Error sending announcement:", error);
      toast.error(error.response?.data?.message || "Failed to send announcement");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // Mobile Card Component
  const AnnouncementCard = ({ announcement }) => (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
          <p className="text-sm text-gray-500">To: {announcement.audience}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(announcement.status)}`}>
          {announcement.status || 'draft'}
        </span>
      </div>

      <p className="text-sm text-gray-600">{announcement.body}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>By {announcement.sentBy?.name || 'Admin'}</span>
        <span>{announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'N/A'}</span>
      </div>

      <div className="flex items-center gap-2 pt-2">
        {announcement.status !== "sent" && (
          <button
            onClick={() => handleResend(announcement._id)}
            className="flex-1 h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Send className="h-3 w-3" />
            Send
          </button>
        )}
        {announcement.status === "draft" && (
          <button
            onClick={() => openEditModal(announcement)}
            className="h-8 px-3 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors flex items-center justify-center"
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => handleDelete(announcement._id)}
          className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors flex items-center justify-center"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">Create and manage announcements for your users</p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium flex items-center gap-2 w-fit"
          >
            <Plus className="h-4 w-4" />
            Create Announcement
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search announcements..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {filteredAnnouncements.length} of {announcements.length} announcements
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Announcements ({filteredAnnouncements.length})
            </h2>
          </div>

          <div className="p-0 md:p-6">
            {filteredAnnouncements.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchTerm ? (
                  <div>
                    <p>No announcements found matching "{searchTerm}"</p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-blue-600 hover:text-blue-700 mt-2"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>No announcements yet.</p>
                    <button
                      onClick={openCreateModal}
                      className="text-blue-600 hover:text-blue-700 mt-2"
                    >
                      Create your first one!
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {isMobile ? (
                  <div className="space-y-4 p-4">
                    {filteredAnnouncements.map((announcement) => (
                      <AnnouncementCard key={announcement._id} announcement={announcement} />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700 w-24">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 hidden sm:table-cell">Audience</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 hidden md:table-cell">Sent By</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 hidden lg:table-cell">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700 w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAnnouncements.map((announcement) => (
                          <tr key={announcement._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-xs text-gray-500">
                              {announcement._id ? announcement._id : 'N/A'}
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <div className="font-medium text-gray-900">{announcement.title}</div>
                                <div className="text-xs text-gray-500 sm:hidden">
                                  {announcement.audience} • {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell text-gray-700">{announcement.audience}</td>
                            <td className="py-3 px-4 hidden md:table-cell text-gray-700">{announcement.sentBy?.name || 'Admin'}</td>
                            <td className="py-3 px-4 hidden lg:table-cell text-gray-700">
                              {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(announcement.status)}`}>
                                {announcement.status || 'draft'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                {announcement.status !== "sent" && (
                                  <button
                                    onClick={() => handleResend(announcement._id)}
                                    className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center"
                                    title="Send announcement"
                                  >
                                    <Send className="h-3 w-3" />
                                  </button>
                                )}
                                {announcement.status === "draft" && (
                                  <button
                                    onClick={() => openEditModal(announcement)}
                                    className="h-8 w-8 p-0 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors flex items-center justify-center"
                                    title="Edit announcement"
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(announcement._id)}
                                  className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center justify-center"
                                  title="Delete announcement"
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
              </>
            )}
          </div>
        </div>

        {/* Modal */}
        <AnnouncementModal
          showModal={showModal}
          closeModal={closeModal}
          isEditing={isEditing}
          loading={loading}
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Announcement;