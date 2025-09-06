import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
    const { fetchUserData, user} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://conference-reg-wcnd-be.onrender.com/api/login", formData, {
        withCredentials: true
      }
      )

      await fetchUserData()
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    if ( user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <main className="bg-[#fefbfa] min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-lg border border-[#2b2a28]/20 bg-white p-6 shadow-sm">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-[#2b2a28]">Login</h1>
            <p className="mt-1 text-sm text-[#2b2a28]/70">
              Welcome back. Please enter your details.
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-[#2b2a28]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
                autoComplete="email"
                className="w-full rounded-md border border-[#2b2a28]/20 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/50 focus:outline-none focus:ring-2 focus:ring-[#a95551]"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[#2b2a28]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#2b2a28]/80 hover:text-[#a95551] focus:outline-none focus:ring-2 focus:ring-[#a95551] rounded"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-[#2b2a28]/20 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/50 focus:outline-none focus:ring-2 focus:ring-[#a95551]"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-[#2b2a28]/70">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#972620] hover:text-[#a95551] focus:outline-none focus:ring-2 focus:ring-[#a95551] rounded"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
