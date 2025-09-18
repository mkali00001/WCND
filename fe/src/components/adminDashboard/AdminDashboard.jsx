import { useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar"
import Users from "./Users";
import Dashboard from "./Dashboard";
import Payment from "./Payment";
import PaperSubmission from "./PaperSubmission";
import Announcement from "./Announcement";
import HelpSupport from "./HelpSupport";
import Header from "./Header";

export default function AdminDashboard() {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")

  const renderPageContent = () => {
    switch (activePage) {
      case "User Management":
        return <Users />
      case "Dashboard":
        return <Dashboard />
      case "Payments":
        return <Payment/>
      case "Paper Submission":
        return <PaperSubmission />
      case "Announcements":
        return <Announcement />
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

        <main className="flex-1 lg:ml-64 pt-[88px] px-8">
          {renderPageContent()}
        </main>
      </div>
    </div>
  )
}
