import { useEffect, useState } from "react"
import logo from "../../assets/logo.jpg"
import { useAuth } from "../../context/AuthContext"
import { User, HelpCircle, LogOut, KeyRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [username, setUsername] = useState("")
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.name) {
      setUsername(user.name)
    }
  }, [user])

  const handleLogout = () => {
   logout()
    navigate("/login")
    setUserDropdownOpen(false)
  }

  const handleMyProfile = () => {
    console.log("My Profile clicked")
    alert("Profile page will open here")
    setUserDropdownOpen(false)
  }

  const handleChangePassword = () => {
    console.log("Change Password clicked")
    alert("Change password form would open here")
    setUserDropdownOpen(false)
  }

  const handleHelpSupport = () => {
    console.log("Help & Support clicked")
    alert("Help & Support page would open here")
    setUserDropdownOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 px-2 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${sidebarOpen ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <img src={logo} alt="World Congress of Natural Democracy" className="h-16 w-auto object-contain" />
          </div>
        </div>

        {/* Right section */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-2 transition-colors"
          >
            <span className="text-gray-700 hidden sm:inline">Hi, {username}</span>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                userDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {userDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {/* My Profile */}
                <button
                  onClick={handleMyProfile}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>

                {/* Change Password */}
                <Link
                //   onClick={handleChangePassword}
                  to={"/change-password"}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <KeyRound className="w-4 h-4" />
                  Change Password
                </Link>

                {/* Help & Support */}
                <button
                  onClick={handleHelpSupport}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>

                <hr className="my-2 border-gray-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#972620] hover:bg-[#972620] hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
