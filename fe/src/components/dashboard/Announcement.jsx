import React from "react";
import { Megaphone } from "lucide-react";

export const Announcement = ({ announcements = [] }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-16 px-3 sm:px-8 transition-colors">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Announcements
          </h2>
        </div>
        <div className="min-h-[180px] max-h-[65vh] overflow-y-auto space-y-8">
          {announcements.length === 0 ? (
            <div className="text-gray-400 dark:text-gray-600 text-center py-24 text-lg">
              No announcements yet.
            </div>
          ) : (
            announcements.map((item, idx) => (
              <div
                key={item.id || idx}
                className="
                  bg-white dark:bg-gray-800 rounded-2xl 
                  border border-gray-300 dark:border-gray-700 
                  shadow-sm 
                  hover:shadow-lg 
                  transition-shadow duration-300 p-8
                "
              >
                <div>
                  <div className="text-gray-900 dark:text-gray-50 font-bold text-xl mb-1">
                    {item.title}
                  </div>
                  <div className="text-gray-500 dark:text-gray-300 text-base mb-2">
                    {item.message}
                  </div>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-right">
                  {item.author} &bull; {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
