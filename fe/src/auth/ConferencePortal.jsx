import { Link } from "react-router-dom"

const ConferencePortal = () => {
  return (
    <div className="w-[1148px] min-h-[784px] bg-gray-50 p-8">
      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-16 shadow-sm text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#972620" }}>
          Welcome to the Conference Portal!
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          To participate in the World Congress of Natural Democracy 2025,
          please complete your registration. Once registered, you'll unlock
          access to paper submissions, updates, and all event details directly
          from your dashboard.
        </p>

        {/* Register Button */}
        <div className="flex justify-center mb-6">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#972620] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2"
          >
            Register Now
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <p className="underline cursor-pointer text-[#972620] hover:text-[#a95551]">
            Log out
          </p>
          <p className="underline cursor-pointer text-[#972620] hover:text-[#a95551]">
            Explore more about WND World Congress!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConferencePortal
