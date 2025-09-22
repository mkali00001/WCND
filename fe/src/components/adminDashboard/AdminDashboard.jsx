import { useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Payment from "./Payment";
import PaperSubmission from "./PaperSubmission";
import Announcement from "./Announcement";
import HelpSupport from "./HelpSupport";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  const { user, users } = useAuth();
  // console.log(users)
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")

  const renderPageContent = () => {
    switch (activePage) {
      case "User Management":
        return <Users users={users} />
      case "Dashboard":
        return <Dashboard users={users} />
      case "Payments":
        return <Payment users={users}/>
      case "Paper Submission":
        return <PaperSubmission users={users}/>
      case "Announcements":
        return <Announcement users={users}/>
      case "Help & Support":
        return <HelpSupport users={users}/>
      default:
        return <Dashboard users={users}/>
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
