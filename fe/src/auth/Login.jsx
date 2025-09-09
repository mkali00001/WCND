import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.jpg";

export default function Login() {
  const { fetchUserData, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://conference-reg-wcnd-be.onrender.com/api/login",
        formData,
        { withCredentials: true }
      );
      await fetchUserData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <section className="bg-white w-[538px] h-[604px] px-[40px] py-[40px] rounded-lg border border-[#2b2a28]/20 shadow-sm">
        {/* Logo */}
        <header className="flex justify-center mb-6">
          <img src={logo} alt="WCMD" className="w-[232px] h-[74px]" />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div>
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
              placeholder="you@example.com"
              className="h-[66px] w-[454px] rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
          </div>

          {/* Password */}
          <div>
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
              placeholder="••••••••"
              className="h-[66px] w-[454px] rounded-[10px] border border-[#2b2a28]/30 px-3 py-2 text-sm text-[#2b2a28] placeholder:text-[#2b2a28]/40 focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#2b2a28]/80 hover:text-[#a95551] focus:outline-none focus:ring-2 focus:ring-[#972620] rounded"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-[66px] w-[454px] items-center justify-center rounded-[10px] bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <Link
            to="/signup"
            className="inline-flex h-[66px] w-[454px] items-center justify-center rounded-[10px] border border-[#972620] bg-white px-4 py-2.5 text-sm text-[#972620] transition-colors hover:bg-[#972620] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            New User &nbsp; <span className="font-semibold">Signup Now</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
