import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import ProfileContent from "./ProfileContent"
import { DashboardContent } from "./DashboardContent"
import { Payement } from "./Payement"
import { PaperSub } from "./PaperSub"
import { Announcement } from "./Announcement"
import { HelpSupport } from "./HelpSupport"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard")

  const renderPageContent = () => {
    switch (activePage) {
      case "My Profile":
        return <ProfileContent />
      case "Dashboard":
        return <DashboardContent/>
      case "Payments":
        return <Payement/>
      case "Paper Submission":
        return <PaperSub/>
      case "Announcements":
        return <Announcement/>
      case "Help & Support":
        return <HelpSupport/>
      default:
        return <ProfileContent />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex px-16">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <main className="flex-1 lg:ml-64 pt-16">{renderPageContent()}</main>
      </div>
    </div>
  )
}
