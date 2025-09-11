import React from "react";
import { Link } from "react-router-dom";

export const PaperSub = () => {
  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      {/* Card container */}
      <div className="relative w-full max-w-[1114px] min-h-[600px] lg:min-h-[600px] bg-white rounded-[30px] border border-[#C3C3C3] shadow-md flex flex-col items-center justify-center text-center p-6 md:p-12">
        
        {/* Title */}
        <h1 className="text-[#972620] text-2xl md:text-[30px] font-bold font-['Plus Jakarta Sans'] mb-6">
          Welcome to the Conference Portal!
        </h1>

        {/* Description */}
        <p className="text-black text-base md:text-[17px] font-normal font-['Plus Jakarta Sans'] leading-relaxed md:leading-[29px] max-w-3xl mx-auto mb-8">
          To participate in the World Congress of Natural Democracy 2025, please
          complete your registration. Once registered, you’ll unlock access to
          paper submissions, updates, and all event details directly from your
          dashboard.
        </p>

        {/* Button */}
        <Link
          to="/registration"
          className="inline-flex items-center justify-center w-full sm:w-[183px] h-[45px] sm:h-[51px] bg-[#972620] text-white rounded-[10px] shadow-[0px_10px_40px_rgba(174,174,174,0.20)] border border-[#EAEAEA] font-['Plus Jakarta Sans'] text-sm md:text-[15px] mx-auto"
        >
          Start Submitting
        </Link>
      </div>
    </div>
  );
};
