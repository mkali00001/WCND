import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Megaphone, Loader2 } from 'lucide-react';

export const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/announcements/my`,
          { withCredentials: true }
        );
        console.log('Announcements:', res.data.data);
        setAnnouncements(res.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="pt-20 p-4 lg:p-12 max-w-7xl mx-auto mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Megaphone size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500">Updates and news from the event organizers.</p>
        </div>
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Announcements Yet</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for updates.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((ann) => (
            <div key={ann._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{ann.title}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(ann.sentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{ann.body}</p>
              <p className="text-right text-xs text-gray-400 mt-4">
                Sent by {ann.sentBy?.name || 'Admin'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};