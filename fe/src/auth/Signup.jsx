"use client"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import logo from "../assets/logo.jpg"
import axios from "axios"
import { toast } from "react-toastify"

export default function Signup() {
  const recaptchaRef = useRef(null)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!captchaToken) {
      alert("Please complete the CAPTCHA")
      return
    }

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      mobile: fd.get("mobile"),
      captchaToken,
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/signup`, payload)
      console.log(res)
      setUserEmail(payload.email)
      setShowModal(true)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }

    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  const closeModal = () => {
    setShowModal(false)
    setUserEmail("")
  }

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <section className="
          bg-white 
          w-full max-w-[538px] 
          px-6 sm:px-10 
          py-8 sm:py-10 
          lg:my-[140px]
          rounded-[20px] sm:rounded-[26px] 
          border border-[#2b2a28]/20
        ">
          {/* Logo Center */}
          <header className="flex justify-center mb-6">
            <img 
              src={logo || "/placeholder.svg"} 
              alt="WCMD" 
              className="w-[180px] sm:w-[232px] h-auto mt-4" 
            />
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                className="h-[56px] sm:h-[66px] w-full rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>

            {/* Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-[56px] sm:h-[66px] w-full rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>

            {/* Mobile */}
            <div>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                required
                placeholder="e.g. 9876543210"
                className="h-[56px] sm:h-[66px] w-full rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>

            {/* reCAPTCHA */}
            <div className="mt-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!captchaToken}
              className="mt-4 inline-flex h-[56px] sm:h-[66px] w-full items-center justify-center rounded-[10px] bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
            >
              Create account
            </button>
          </form>

          {/* Footer link styled like button */}
          <div className="mt-4 flex justify-center">
            <Link
              to="/login"
              className="inline-flex h-[56px] sm:h-[66px] mb-8 w-full items-center justify-center rounded-[10px] border border-[#972620] bg-white px-4 py-2.5 text-sm font-semibold text-[#972620] transition-colors hover:bg-[#972620] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#972620]"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-[#972620] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#972620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-[#972620] mb-4">Check Your Email</h2>

            {/* Description */}
            <p className="text-gray-600 mb-2">We've sent instructions to reset your password to:</p>
            <p className="font-medium text-[#2b2a28] mb-4 break-words">{userEmail}</p>

            {/* Small text */}
            <p className="text-sm text-gray-500 mb-6">
              If you don't see the email in your inbox, please check your spam folder.
            </p>

            {/* Return to Login Button */}
            <Link
              to="/login"
              onClick={closeModal}
              className="w-full bg-[#972620] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#a95551] transition-colors"
            >
              Return to Login
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
