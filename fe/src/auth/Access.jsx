import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Access() {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex justify-center items-center px-4">
      <div className="relative w-full max-w-[538px] lg:w-[538px] lg:h-[574px] bg-white rounded-[26px] border border-[#D6D6D6] shadow-sm flex flex-col p-6 sm:p-8 lg:flex lg:flex-col lg:items-center lg:justify-center">

        <div className="flex flex-col items-start w-full sm:w-[455px] lg:ml-[8px]">
          <img
            src={logo}
            alt="Logo"
            className="w-[180px] sm:w-[232px] h-auto object-contain "
          />

          <h1 className="text-[#972620] text-lg sm:text-xl lg:text-2xl font-bold text-left mt-6 sm:mt-8 leading-snug">
            Welcome to the World Congress of Natural Democracy 2026 India
          </h1>

          <p className="text-black text-sm sm:text-sm lg:text-sm text-left mt-3 sm:mt-4 leading-6 max-w-full sm:max-w-[374px]">
            Your details will be securely stored and used only for official
            congress communication.
          </p>
        </div>

        <div className="flex flex-col items-center mt-8 w-full">
          <Link
            to="/login"
            className="w-full sm:w-[455px] h-[48px] sm:h-[51px] bg-[#972620] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition flex items-center justify-center text-sm sm:text-base"
          >
            Login to your Account
          </Link>

          <Link
            to="/forgot-password"
            className="mt-4 w-full sm:w-[455px] h-[48px] sm:h-[51px] border border-[#972620] rounded-lg flex items-center justify-center hover:bg-[#fdf5f5] transition"
          >
            <p className="text-sm text-[#333]">
              Forget Password?{" "}
              <span className="font-bold hover:underline">Reset Now</span>
            </p>
          </Link>

          <Link
            to="/signup"
            className="mt-4 w-full sm:w-[455px] h-[48px] sm:h-[51px] border border-[#972620] rounded-lg flex items-center justify-center hover:bg-[#fdf5f5] transition"
          >
            <p className="text-sm text-[#333]">
              New User?{" "}
              <span className="font-semibold hover:underline">Signup now</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
