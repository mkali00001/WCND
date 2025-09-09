import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"
import EmailPopup from "../components/popups/EmailPopup"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setShowPopup(true)
      setLoading(false)
    }, 1000) 
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <section
        className="
          bg-white 
          w-full max-w-[538px] 
          px-6 sm:px-10 
          py-8 sm:py-10 
          lg:px-[40px] lg:py-[40px]
          rounded-[20px] sm:rounded-[26px] 
          border border-[#2b2a28]/20 shadow-sm
        "
      >
        {/* Logo */}
        <header className="flex justify-center mb-6">
          <img
            src={logo}
            alt="WCMD"
            className="w-[180px] sm:w-[232px] h-auto"
          />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-[56px] sm:h-[66px] w-full rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-[56px] sm:h-[66px] w-full items-center justify-center rounded-[10px] bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        {/* Footer link */}
        <div className="mt-4 flex justify-center">
          <Link
            to="/signup"
            className="inline-flex h-[56px] sm:h-[66px] w-full items-center justify-center rounded-[10px] border border-[#972620] bg-white px-4 py-2.5 text-sm text-[#972620] transition-colors hover:bg-[#972620] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            New User &nbsp; <span className="font-semibold">Signup Now</span>
          </Link>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <EmailPopup
          email={email}
          onClose={() => {
            setShowPopup(false)
            navigate("/login")
          }}
        />
      )}
    </main>
  )
}
