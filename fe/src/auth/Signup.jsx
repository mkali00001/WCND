import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { RefreshCcw } from "lucide-react";

export default function Signup() {
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedTnC, setAcceptedTnC] = useState(false);

  // --- Fetch captcha ---
  const fetchCaptcha = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/captcha`,
        { withCredentials: true }
      );
      setCaptchaSvg(res.data);
    } catch (err) {
      toast.error("Failed to load captcha");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  // --- Form submit ---
  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.trim();
    const email = fd.get("email")?.trim();

    // --- Validation ---
    if (!name) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!captchaInput) {
      toast.error("Please enter the captcha");
      return;
    }
    if (!acceptedTnC) {
      toast.error("Please accept the Terms & Conditions to continue");
      return;
    }

    const payload = { name, email, captchaInput };

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/signup`,
        payload,
        { withCredentials: true }
      );
      setUserEmail(email);
      setShowModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      fetchCaptcha();
    } finally {
      setLoading(false);
      setCaptchaInput("");
    }
  }


  const closeModal = () => {
    setShowModal(false);
    setUserEmail("");
  };

  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
        <section className="bg-white w-full max-w-[538px] px-8 py-10 rounded-[26px] border border-[#D6D6D6] shadow-sm">
          {/* Logo */}
          <header className="flex justify-center mb-4">
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

            {/* Captcha */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm w-full max-w-lg">
  {/* Captcha Box */}
  <div
    dangerouslySetInnerHTML={{ __html: captchaSvg }}
    className="flex-shrink-0 w-full sm:w-[120px] h-[60px] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-inner"
  />

  {/* Input + Button (stack on mobile, inline on desktop) */}
  <div className="flex w-full gap-2">
    <input
      type="text"
      value={captchaInput}
      onChange={(e) => setCaptchaInput(e.target.value)}
      placeholder="Enter captcha"
      className="h-[50px] flex-1 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-[#972620] focus:outline-none text-gray-700 placeholder-gray-400"
    />

    <button
      type="button"
      onClick={fetchCaptcha}
      className="p-3 rounded-lg border border-[#972620] text-[#972620] hover:bg-[#972620] hover:text-white transition-all shadow-sm"
    >
      <RefreshCcw className="w-5 h-5" />
    </button>
  </div>
</div>


            {/* Terms & Conditions */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={acceptedTnC}
                onChange={(e) => setAcceptedTnC(e.target.checked)}
                className="w-[21px] h-[21px] border border-[#D6D6D6] rounded-[5px]"
              />
              <span className="text-sm text-[#333]">
                Agree to our{" "}
                <span className="underline cursor-pointer">
                  Terms and Conditions
                </span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !acceptedTnC}
              className={`h-[51px] w-full rounded-[10px] text-white font-medium transition-colors ${loading || !acceptedTnC
                ? "bg-[#ce7d79] cursor-not-allowed"
                : "bg-[#972620] hover:bg-[#982019]"
                }`}
            >
              {loading ? "Signing up…" : "Signup"}
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

            <h2 className="text-xl font-semibold text-[#972620] mb-3">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-2">
              We have sent login credentials to
            </p>
            <p className="font-medium text-[#2b2a28] mb-4 break-words">
              {userEmail}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              If you don't see the email in your inbox, please check your spam folder.
            </p>

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
  );
}
