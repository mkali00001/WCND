import { CreditCard, FileText, HelpCircle, LayoutDashboard, LogOut, Megaphone, User } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function Sidebar({ sidebarOpen, setSidebarOpen, activePage, setActivePage }) {
  const { logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "My Profile" },
    { icon: CreditCard, label: "Payments" },
    { icon: FileText, label: "Paper Submission" },
    { icon: Megaphone, label: "Announcements" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Logout" },
  ]

  const handleMenuClick = (label) => {
    setActivePage(label)
    setSidebarOpen(false)

    if (label === "Logout") {
      logout()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[88px] left-0 z-30 w-64 h-[calc(100vh-88px)] bg-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <nav className="py-6 px-6 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.label)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activePage === item.label
                  ? "bg-[#972620] text-white"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
