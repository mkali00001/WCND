import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function Signup() {
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      mobile: fd.get("mobile"),
      captchaToken,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        payload
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }

    // ✅ reset captcha after submit
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-lg border border-[#2b2a28]/20 p-6">
          <header className="mb-6 text-center">
            <h1 className="text-pretty text-2xl font-extrabold text-[#2b2a28]">
              Create account
            </h1>
            <p className="mt-1 text-sm text-[#2b2a28]/80">
              Join us in seconds—just a few details below.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-[#2b2a28]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                className="w-full rounded-md border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>


            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-[#2b2a28]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>


            <div className="space-y-1">
              <label htmlFor="mobile" className="text-sm font-medium text-[#2b2a28]">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                required
                placeholder="e.g. 9876543210"
                className="w-full rounded-md border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
              />
            </div>


            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />


            <button
              type="submit"
              disabled={!captchaToken}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
            >
              Create account
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-[#2b2a28]/80">
            Already have an account?{" "}
            <Link
              to="/login"
              className="rounded font-medium text-[#972620] hover:text-[#a95551] focus:outline-none focus:ring-2 focus:ring-[#972620]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
