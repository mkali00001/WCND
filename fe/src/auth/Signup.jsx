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
      const res = await axios.post("https://conference-reg-wcnd-be.onrender.com/api/signup", payload)
      console.log(res)
      setUserEmail(payload.email)
      setShowModal(true)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }

    // ✅ reset captcha after submit
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  const closeModal = () => {
    setShowModal(false)
    setUserEmail("")
  }

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <section className="bg-white w-[538px] h-[744px] px-[40px] rounded-[26px] my-[140px] border border-[#2b2a28]/20">
          {/* Logo Center */}
          <header className="flex justify-center mb-6">
            <img src={logo || "/placeholder.svg"} alt="WCMD" className="w-[232px] h-[74px] mt-[20px]" />
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
                className="h-[66px] w-[454px] mt-[21px] rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
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
                className="h-[66px] w-[454px] mt-[21px] rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
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
                className="h-[66px] w-[454px] mt-[21px] rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>

            {/* reCAPTCHA */}
            <div className="mt-[21px]">
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
              className="mt-[21px] inline-flex h-[66px] w-[454px] items-center justify-center rounded-[10px] bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
            >
              Create account
            </button>
          </form>

          {/* Footer link styled like button */}
          <div className="mt-4 flex justify-center">
            <Link
              to="/login"
              className="inline-flex h-[66px] mb-[40px] w-[454px] mt-[21px] items-center justify-center rounded-[10px] border border-[#972620] bg-white px-4 py-2.5 text-sm font-semibold text-[#972620] transition-colors hover:bg-[#972620] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#972620]"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            {/* Checkmark Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white border-2 border-[#972620] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#972620]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#972620] mb-4">Check Your Email</h2>

            {/* Description */}
            <p className="text-gray-600 mb-2">We've sent instructions to reset your password to:</p>
            <p className="font-medium text-[#2b2a28] mb-4">{userEmail}</p>

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
