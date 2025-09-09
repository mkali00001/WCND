const SuccessPage = () => {
    return (
        <div className="space-y-6 py-16">
            {/* Large checkmark icon */}
            <div className="w-20 h-20 bg-[#972620] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Success heading */}
            <h2 className="text-2xl font-semibold text-[#972620]">Thank You for Your Registration!</h2>

            {/* Success message */}
            <p className="text-gray-700 leading-relaxed">
                Thank you for submitting your abstract/proposal for the WND World Congress on Global Democracy 2026. We greatly
                appreciate your contribution and interest in participating in this global and historic event in India. Your
                submission has been successfully received.
            </p>

            {/* Go to Dashboard button */}
            <button
                onClick={() => alert("Redirecting to dashboard...")}
                className="px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620]/90 transition-colors font-medium"
            >
                Go to Dashboard
            </button>

        </div>
    )
}

export default SuccessPage
