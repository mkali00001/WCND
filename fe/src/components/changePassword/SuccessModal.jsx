import { CheckCircle2 } from "lucide-react"

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-gray-300 shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#972620] rounded-full p-3">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#972620] mb-2">Success!</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Your password has been updated successfully.
          </p>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#972620] text-white rounded-lg font-semibold text-sm sm:text-base shadow-md hover:bg-[#7a1d1a] transition-all"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  )
}
