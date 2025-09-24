import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.jpg";
import { toast } from "react-toastify";

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
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      await fetchUserData();
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      if (!user.isRegistered) {
        navigate("/registered"); // not verified yet
      } else {
        navigate("/dashboard"); // verified, go to dashboard
      }
    }
  }, [user, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
      <section className="bg-white w-full max-w-[538px] rounded-[26px] border border-[#D6D6D6] px-8 py-10 shadow-sm">
        {/* Logo */}
        <header className="flex justify-center mb-4">
          <img
            src={logo}
            alt="WCMD"
            className="w-[232px] h-[74px] object-contain"
          />
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="tryidoltech@gmail.com"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#333]/60 focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
          </div>

          {/* Password */}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              placeholder="Password"
              className="h-[66px] w-full rounded-[10px] border border-[#EAEAEA] px-4 text-base text-[#333] placeholder:text-[#B0A9A9] focus:outline-none focus:ring-2 focus:ring-[#972620]"
            />
            <div className="mt-2 text-left">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#333] hover:text-[#972620] focus:outline-none focus:ring-2 focus:ring-[#972620] rounded"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[51px] w-full rounded-[10px] bg-[#972620] text-white font-medium border border-[#EAEAEA] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
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
    </main>
  );
}
