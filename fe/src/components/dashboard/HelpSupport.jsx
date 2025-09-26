import React, { useState } from "react";
import axios from "axios";
export const HelpSupport = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.trim() !== "") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/query/create-query`,
          { querydata: query },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Query submitted:", res.data);
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting query:", err.response?.data || err.message);
      }
    }
  };


  return (
    <div className=" lg:bg-[#faeae9] rounded-2xl mt-7 flex flex-col items-center justify-center px-4 py-16 lg:py-36">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#972620] text-center">
          Need Help? Ask Us!
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your query here..."
              className="border border-[#972620]/70 rounded-md p-3 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              required
            />
            <button
              type="submit"
              className="bg-[#972620] text-white font-semibold py-3 rounded-md hover:bg-[#7b201c] transition-colors duration-300"
            >
              Submit Query
            </button>
          </form>
        ) : (
          <div className="text-center text-[#972620] font-semibold text-lg">
            Thank you for your query! Our support team will get back to you
            soon.
          </div>
        )}
      </div>
    </div>
  );
};
