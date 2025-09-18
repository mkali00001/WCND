import React, { useState } from "react";
import { Eye, Users, RefreshCw, Bell } from "lucide-react";

const PaperSubmission = () => {
  const [submissionEnabled, setSubmissionEnabled] = useState(true);

  const papers = [
    {
      id: "PAPER001",
      title: "AI in Healthcare",
      author: "John Doe",
      email: "john@example.com",
      status: "Under Review",
      reviewers: ["Dr. Smith", "Prof. Allen"],
      submittedDate: "2023-09-10",
    },
    {
      id: "PAPER002",
      title: "Blockchain Security",
      author: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      reviewers: [],
      submittedDate: "2023-09-12",
    },
    {
      id: "PAPER003",
      title: "Quantum Computing",
      author: "Mike Lee",
      email: "mike@example.com",
      status: "Accepted",
      reviewers: ["Dr. Brown"],
      submittedDate: "2023-09-14",
    },
  ];

  const handleView = (paper) => alert(`Viewing: ${paper.title}`);
  const handleAssign = (paper) => alert(`Assign reviewers for: ${paper.title}`);
  const handleStatus = (paper) => alert(`Change status for: ${paper.title}`);
  const handleNotify = (paper) => alert(`Notify author: ${paper.author}`);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Paper Submissions
      </h1>

      <div className="flex items-center justify-between mb-6 p-4 border rounded-2xl shadow bg-white">
        <h2 className="text-lg font-semibold text-gray-800">
          Paper Submission Settings
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {submissionEnabled ? "Enabled" : "Disabled"}
          </span>
          <button
            onClick={() => setSubmissionEnabled(!submissionEnabled)}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium ${
              submissionEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {submissionEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      <div className="hidden sm:block overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="w-full min-w-[1000px] text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-5 py-3">Paper ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Reviewer(s)</th>
              <th className="px-5 py-3">Submitted Date</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {papers.map((paper) => (
              <tr key={paper.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-medium text-gray-900">{paper.id}</td>
                <td className="px-5 py-3">{paper.title}</td>
                <td className="px-5 py-3">{paper.author}</td>
                <td className="px-5 py-3">{paper.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      paper.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : paper.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {paper.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {paper.reviewers.length > 0
                    ? paper.reviewers.join(", ")
                    : "Not Assigned"}
                </td>
                <td className="px-5 py-3">{paper.submittedDate}</td>
                <td className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => handleView(paper)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleAssign(paper)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <Users size={16} />
                  </button>
                  <button
                    onClick={() => handleStatus(paper)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button
                    onClick={() => handleNotify(paper)}
                    className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <Bell size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4 mt-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-900">{paper.title}</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  paper.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : paper.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {paper.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Author: {paper.author}</p>
            <p className="text-sm text-gray-600">{paper.email}</p>
            <p className="text-sm text-gray-600">
              Reviewers:{" "}
              {paper.reviewers.length > 0
                ? paper.reviewers.join(", ")
                : "Not Assigned"}
            </p>
            <p className="text-sm text-gray-600">Date: {paper.submittedDate}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleView(paper)}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
              >
                <Eye size={14} /> View
              </button>
              <button
                onClick={() => handleAssign(paper)}
                className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600"
              >
                <Users size={14} /> Assign
              </button>
              <button
                onClick={() => handleStatus(paper)}
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600"
              >
                <RefreshCw size={14} /> Status
              </button>
              <button
                onClick={() => handleNotify(paper)}
                className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-purple-600"
              >
                <Bell size={14} /> Notify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperSubmission;
