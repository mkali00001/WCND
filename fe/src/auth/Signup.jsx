import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      mobile: fd.get("mobile"),
    };
    // TODO: replace with your API call
    console.log("Signup payload:", payload);
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
            {/* Name */}
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

            {/* Email */}
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

            {/* Mobile */}
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

            {/* Submit */}
            <button
              type="submit"
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
