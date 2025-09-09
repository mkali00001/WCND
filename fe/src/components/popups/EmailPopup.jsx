import { CheckCircle } from "lucide-react"

export default function EmailPopup({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl shadow-lg p-8 text-center relative flex flex-col gap-6"
        style={{ width: "445px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#972620] flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-[#972620]" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#972620]">Check Your Email</h2>

        <div>
          <p className="text-gray-600 mb-2 leading-relaxed">
            We've sent instructions to reset your password to:
          </p>
          <p className="text-gray-800 font-medium">{email}</p>
        </div>

        <p className="text-xs text-gray-500">
          If you don't see the email in your inbox, please check your spam folder.
        </p>

        <button
          onClick={onClose}
          className="bg-[#972620] hover:bg-[#972620] text-white px-8 py-2 rounded-md w-full"
        >
          Return to Login
        </button>
      </div>
    </div>
  )
}
