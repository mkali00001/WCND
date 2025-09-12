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

    try {
      const res = await fetch(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Something went wrong")
      } else {
        setShowPopup(true)
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Server error, try again later")
    } finally {
      setLoading(false)
    }
  }


  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
      <section className="bg-white w-full max-w-[538px] rounded-[26px] border border-[#D6D6D6] px-8 py-10 shadow-sm">
        {/* Logo */}
        <header className="flex justify-center mb-8">
          <img
            src={logo}
            alt="WCMD"
            className="w-[232px] h-[74px] object-contain"
          />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email Input */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your Email"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#333]/60 focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="h-[51px] w-full rounded-[10px] bg-[#972620] text-white font-medium shadow-lg border border-[#EAEAEA] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* Secondary Button */}
          <Link
            to="/signup"
            className="h-[51px] w-full flex items-center justify-center rounded-[10px] border border-[#972620] bg-white text-[#333] font-medium transition-colors hover:bg-[#972620] hover:text-white"
          >
            New User? <span className="ml-1 font-semibold">Signup now</span>
          </Link>
        </form>
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
