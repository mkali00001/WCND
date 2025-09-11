import { useEffect, useState } from "react"
import PersonalInformation from "./PersonalInformation"
import AcademicDetails from "./AcademicDetails"
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function ProfileContent() {
  const { user } = useAuth();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false)


  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.mobile,
    alternatePhone: user.alternatemobile || "NA",
  })

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/my-registration`, {
          withCredentials: true,
        });
        console.log(res.data)
        setRegistration(res.data);
      } catch (err) {
        console.error("Error fetching registration:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!registration) return <p>No registration data found</p>;


  const handleEditProfile = () => {
    setIsEditing(!isEditing)
    console.log("Profile edit mode:", !isEditing)
  }

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="pt-20 p-4 border-2 border-gray-200 rounded-2xl lg:p-12 max-w-7xl mx-auto mb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <button
              onClick={handleEditProfile}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate("name", e.target.value)}
                className="text-2xl font-bold text-gray-900 mb-2 border-b-2 border-[#972620] bg-transparent focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620]"
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>
              <div>
                <p className="font-medium">Phone No.</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620]"
                  />
                ) : (
                  <p>{profileData.phone}</p>
                )}
              </div>
              <div>
                <p className="font-medium">Alternate Phone No.</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.alternatePhone}
                    onChange={(e) => handleProfileUpdate("alternatePhone", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620]"
                  />
                ) : (
                  <p>{profileData.alternatePhone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setIsEditing(false)
                console.log("Profile saved:", profileData)
                alert("Profile updated successfully!")
              }}
              className="px-4 py-2 bg-[#972620] text-white rounded-lg hover:bg-[#972620] transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <PersonalInformation regdata={registration} />
      <AcademicDetails regdata={registration}/>
    </div>
  )
}
