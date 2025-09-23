import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import ProfileContent from "./ProfileContent"
import { Payement } from "./Payement"
import { PaperSub } from "./PaperSub"
import { Announcement } from "./Announcement"
import { HelpSupport } from "./HelpSupport"
import DashboardContent from "./DashboardContent"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")

  const mockAnnouncements = [
    {
      id: 1,
      title: "System Maintenance",
      message: "Our portal will be under maintenance at 10 PM on 25th Sept.",
      author: "Admin",
      date: "2025-09-23",
    },
    {
      id: 2,
      title: "New Event Announced",
      message: "Join our webinar next week on Modern React Patterns.",
      author: "Admin",
      date: "2025-09-21",
    },
  ];


  const renderPageContent = () => {
    switch (activePage) {
      case "My Profile":
        return <ProfileContent />
      case "Dashboard":
        return <DashboardContent />
      case "Payments":
        return <Payement />
      case "Paper Submission":
        return <PaperSub />
      case "Announcements":
        return <Announcement announcements={mockAnnouncements} />
      case "Help & Support":
        return <HelpSupport />
      default:
        return <ProfileContent />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Layout wrapper */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-[88px] px-8">
          {renderPageContent()}
        </main>
      </div>
    </div>
  )
}
