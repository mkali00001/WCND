import { useState } from "react";
import SuccessModal from "./SuccessModal";
import logo from "../../assets/logo.jpg";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && password.length >= 8) {
      try {
        // Call change-password API
        await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/change-password`,
          { newPassword: password },
          { withCredentials: true }
        );

        //Modal open after success
        setModalOpen(true);
      } catch (err) {
        console.error("Change password error:", err.response?.data || err.message);
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    logout();
    navigate("/login");
  };

  const isMatch = password === confirmPassword && password.length >= 8;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl border border-gray-300 p-6 shadow-sm"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
          </div>

          {/* Inputs */}
          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mb-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              password && password.length < 8
                ? "border-red-500 focus:ring-red-500"
                : "border-[#972620] focus:ring-[#972620]"
            }`}
          />
          {password && password.length < 8 && (
            <p className="text-red-500 text-sm mb-2">
              Password must be at least 8 characters
            </p>
          )}

          <input
            type="password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full mb-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              confirmPassword && !isMatch
                ? "border-red-500 focus:ring-red-500"
                : "border-[#972620] focus:ring-[#972620]"
            }`}
          />
          {confirmPassword &&
            password.length >= 8 &&
            password !== confirmPassword && (
              <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
            )}

          <button
            type="submit"
            disabled={!isMatch}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isMatch
                ? "bg-[#972620] text-white hover:bg-[#7a1d1a]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Set New Password
          </button>
        </form>
      </div>

      {/* Modal */}
      <SuccessModal isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
}
