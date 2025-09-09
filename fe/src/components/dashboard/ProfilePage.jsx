"use client"

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
        return (
          <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-400">📄</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{activePage}</h2>
                  <p className="text-gray-600">This page is under development.</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <ProfileContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
