import React from "react";
import {
  User,
  CreditCard,
  FileText,
  CheckSquare,
  Hotel,
  Plane,
  Calendar,
  Bell,
  LifeBuoy,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const actionIcons = [
  User,
  CreditCard,
  FileText,
  CheckSquare,
  Hotel,
  Plane,
  Calendar,
  Bell,
  LifeBuoy
];

const actions = [
  "Profile & Account",
  "Registration & Payments",
  "Paper / Proposal Submission",
  "Review & Acceptance",
  "Accommodation",
  "Travel & Visa",
  "Programme & Materials",
  "Announcements & Notifications",
  "Help & Secretariat Support"
];


const DashboardContent = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen border-2 border-gray-200 rounded-3xl mt-7 bg-[#] py-12 px-4 md:px-12">
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center mb-3 gap-2">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, <span className="text-[#972620]">{user.name}</span>
          </h1>
        </div>
        <p className="text-gray-500 text-md">
          Access your quick actions below
        </p>
      </div>

      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-6xl mx-auto">
        {actions.map((action, idx) => {
          const Icon = actionIcons[idx];
          return (
            <button
              key={action}
              className="bg-white hover:bg-[#eedad9] rounded-3xl shadow group p-8 flex flex-col items-center justify-center transition-all duration-300 border border-blue-50 hover:shadow-xl focus:outline-none"
            >
              <Icon className="h-10 w-10 text-[#bd5752] mb-4 group-hover:text-[#972620] transition-colors duration-300" />
              <span className="text-[#bd5752] font-semibold text-lg group-hover:text-[#972620] text-center">
                {action}
              </span>
              <span className="mt-3 text-[#bd5752] font-black text-2xl group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardContent;
