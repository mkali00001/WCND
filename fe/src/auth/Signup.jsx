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
      toast.error("Please complete the CAPTCHA")
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
      const res = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/signup`,
        payload,
        { withCredentials: true }
      )
      console.log(res.data)
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
      <main className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
        <section
          className="
            bg-white 
            w-full max-w-[538px] 
            px-8 py-10 
            rounded-[26px] 
            border border-[#D6D6D6]
            shadow-sm
          "
        >
          {/* Logo */}
          <header className="flex justify-center mb-10">
            <img
              src={logo || "/placeholder.svg"}
              alt="WCMD"
              className="w-[232px] h-[74px] object-contain"
            />
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#B0A9A9] focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />

            {/* Email */}
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#B0A9A9] focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />

            {/* Mobile */}
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="tel"
              required
              placeholder="Phone Number"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#B0A9A9] focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />

            {/* reCAPTCHA */}
            {/* <div className="border border-[#EAEAEA] rounded-[10px] px-4 h-[66px] flex items-center"> */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
            {/* <span className="ml-3 text-sm text-[#B0A9A9]">I’m not a robot</span> */}
            {/* </div> */}

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-[21px] h-[21px] border border-[#D6D6D6] rounded-[5px]"
              />
              <span className="text-sm text-[#333]">
                Agree to our{" "}
                <span className="underline">Terms and Conditions</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!captchaToken}
              className="h-[51px] w-full rounded-[10px] bg-[#972620] text-white font-medium hover:bg-[#a95551] transition-colors"
            >
              Signup
            </button>

            {/* Secondary Button */}
            <Link
              to="/login"
              className="h-[51px] w-full flex items-center justify-center rounded-[10px] border border-[#972620] bg-white text-[#972620] font-medium hover:bg-[#972620] hover:text-white transition-colors"
            >
              Already registered? Login
            </Link>
          </form>
        </section>
      </main>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl border border-[#EAEAEA]">
            {/* Checkmark */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-2 border-[#972620] rounded-full flex items-center justify-center bg-white">
                <svg
                  className="w-8 h-8 text-[#972620]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#972620] mb-3">
              Check Your Email
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-2">
              We've sent instructions to reset your password to:
            </p>
            <p className="font-medium text-[#2b2a28] mb-4 break-words">
              {userEmail}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              If you don't see the email in your inbox, please check your spam folder.
            </p>

            {/* Button */}
            <Link
              to="/login"
              onClick={closeModal}
              className="w-full block bg-[#972620] text-white py-3 rounded-lg font-medium hover:bg-[#a95551] transition-colors"
            >
              Return to Login
            </Link>
          </div>
        </div>
      )}


    </>
  )
}
