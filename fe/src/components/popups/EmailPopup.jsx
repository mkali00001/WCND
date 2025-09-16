export default function EmailPopup({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl border border-[#EAEAEA]">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-2 border-[#972620] rounded-full flex items-center justify-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#972620]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#972620] mb-3">
          Check Your Email
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-2">
          Your password has been reset. Please check your email:
        </p>
        <p className="font-medium text-[#2b2a28] mb-4 break-words">
          {email}
        </p>

        {/* Small Note */}
        <p className="text-sm text-gray-500 mb-6">
          If you don&apos;t see the email in your inbox, please check your spam folder.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#972620] text-white py-3 rounded-lg font-medium hover:bg-[#a95551] transition-colors shadow-sm"
        >
          Return to Login
        </button>
      </div>
    </div>
  )
}
