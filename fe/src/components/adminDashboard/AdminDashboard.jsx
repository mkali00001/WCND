import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Payment from "./Payment";
import PaperSubmission from "./PaperSubmission";
import PaymentCategories from "./PaymentCategories";
import Announcement from "./Announcement";
import HelpSupport from "./HelpSupport";
import Header from "./Header";
import Sidebar from "./Sidebar"; 
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")

  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/announcements/get-announcements`,
          { withCredentials: true }
        );
        setAnnouncements(res.data);
      } catch (err) {
        toast.error("Failed to load announcements.");
      }
    };

    if (user?.role === "admin") {
      fetchAnnouncements();
    }
  }, [user]);

  if ( !announcements) {
    return <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  

  const renderPageContent = () => {
    switch (activePage) {
      case "User Management":
        return <Users />
      case "Dashboard":
        return <Dashboard />
      case "Payments":
        return <Payment />
      case "Payment Categories":
        return <PaymentCategories />
      case "Paper Submission":
        return <PaperSubmission />
      case "Announcements":
        return <Announcement initialAnnouncements={announcements} setAnnouncements={setAnnouncements} />
      case "Payment Categories":
        return <PaymentCategories />
      case "Help & Support":
        return <HelpSupport />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <main className="flex-1 lg:ml-64 pt-[88px] lg:px-8">
          {renderPageContent()}
        </main>
      </div>
    </div>
  )
}
