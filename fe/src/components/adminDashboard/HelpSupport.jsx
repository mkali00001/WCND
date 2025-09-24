import React, { useEffect, useState } from "react";
import axios from "axios";

const HelpSupport = () => {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/query/all-queries`,
          { withCredentials: true }
        );
        setQueries(res.data);
      } catch (err) {
        console.error(
          "Error fetching queries:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleResponse = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/query/response-query/${id}`,
        { queryResponse: responses[id] },
        { withCredentials: true }
      );
      setQueries((prev) =>
        prev.map((q) =>
          q._id === id ? { ...q, queryResponse: responses[id] } : q
        )
      );
      setResponses((prev) => ({ ...prev, [id]: "" }));
      alert("Response sent successfully!");
    } catch (err) {
      console.error("Error sending response:", err.response?.data || err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-lg text-gray-500">Loading queries...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2
          className="text-2xl font-semibold mb-2 text-white bg-[#972620] rounded-lg shadow-lg py-3 px-4"
        >
          Help & Support (User Queries)
        </h2>
      </div>

      {queries.length === 0 ? (
        <div className="text-gray-500 px-4 py-8">No queries found.</div>
      ) : (
        <div className="space-y-6">
          {queries.map((q) => (
            <div
              key={q._id}
              className="border-2 border-[#972620] bg-white rounded-xl shadow-xl p-6 transition-all duration-200 hover:shadow-2xl hover:border-[#b74536] group"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="font-bold text-[#972620]">User:</span>
                <span>{q.userName} ({q.userEmail})</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-700">Query:</span> {q.query}
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-700">Response:</span>{" "}
                {q.queryResponse ? (
                  <span className="text-green-600">{q.queryResponse}</span>
                ) : (
                  <span className="text-gray-400">No response yet</span>
                )}
              </div>
              {!q.queryResponse && (
                <div className="mt-4">
                  <textarea
                    className="w-full border-2 border-[#972620] rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#972620] transition"
                    placeholder="Type your response..."
                    rows={3}
                    value={responses[q._id] || ""}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                  />
                  <button
                    onClick={() => handleResponse(q._id)}
                    className="mt-2 px-6 py-2 rounded-lg font-medium bg-[#972620] text-white hover:bg-[#b74536] shadow-lg transition"
                  >
                    Send Response
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpSupport;