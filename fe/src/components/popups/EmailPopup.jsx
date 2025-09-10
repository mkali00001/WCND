export default function EmailPopup({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-[26px] border border-[#D6D6D6] flex flex-col items-center text-center relative"
        style={{ width: "445px", height: "295px" }}
      >
        {/* Icon */}
        <div className="mt-10 w-[66px] h-[66px] rounded-full bg-[#972620] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title + Text */}
        <div className="mt-4 px-6">
          <h2 className="text-[#972620] font-bold text-[15px] leading-[22px] mb-2">
            Check Your Email
          </h2>
          <p className="text-[#333] text-[15px] leading-[22px] font-normal">
            We&apos;ve sent instructions to reset your password to:
            <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>

        {/* Small Note */}
        <p className="mt-2 text-[8px] text-[#333]">
          If you don&apos;t see the email in your inbox, please check your spam folder.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-4 w-[141px] h-[33px] bg-[#972620] text-white text-[11px] font-bold rounded-[10px] shadow-lg border border-[#EAEAEA] hover:bg-[#a95551] transition"
        >
          Return to Login
        </button>
      </div>
    </div>
  )
}
