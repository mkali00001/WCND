import { useEffect, useState } from "react";
import PersonalInformation from "./PersonalInformation";
import AcademicDetails from "./AcademicDetails";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function ProfileContent() {
  const { user } = useAuth();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // profile data
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.mobile,
    alternatePhone: registration?.altPhone || "NA",
  });

  // image state
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/my-registration`,
          { withCredentials: true }
        );
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
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // save profile with image upload
  const handleSaveProfile = async () => {
    try {
      if (selectedImage) {
        setUploading(true);
        const formData = new FormData();
        formData.append("profileImage", selectedImage);

        const res = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/upload-profile`,
          formData,
          { withCredentials: true }
        );

        console.log("Upload success:", res.data);
        alert("Profile image uploaded successfully!");
        setSelectedImage(null);
        setPreview(null);
      }

      // agar text fields ka bhi update karna hai, uske liye alag API call karna padega
      console.log("Profile saved:", profileData);
      setIsEditing(false);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-20 p-4 border-2 border-gray-200 rounded-2xl lg:p-12 max-w-7xl mx-auto mb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar */}
          {/* Avatar */}
          <div className="relative group">
            <div
              className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => isEditing && document.getElementById("fileInput").click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              {/* Overlay text in edit mode */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium">
                  Change
                </div>
              )}
            </div>

            {/* hidden input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />

            <button
              onClick={handleEditProfile}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>


          {/* Profile Info */}
          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              {/* Email */}
              <div>
                <p className="font-medium">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620] w-full"
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>
              {/* Phone */}
              <div>
                <p className="font-medium">Phone No.</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620] w-full"
                  />
                ) : (
                  <p>{profileData.phone}</p>
                )}
              </div>
              {/* Alternate Phone */}
              <div>
                <p className="font-medium">Alternate Phone No.</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.alternatePhone}
                    onChange={(e) => handleProfileUpdate("alternatePhone", e.target.value)}
                    className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#972620] w-full"
                  />
                ) : (
                  <p>{registration.altPhone || "NA"}</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSaveProfile}
              disabled={uploading}
              className="px-4 py-2 bg-[#972620] text-white rounded-lg hover:bg-[#972620] transition-colors disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Save Changes"}
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

      {/* Other sections */}
      <PersonalInformation
        regdata={{
          title: registration.title || "NA",
          firstName: registration.fullName?.split(" ")[0] || "",
          lastName: registration.fullName?.split(" ").slice(1).join(" ") || "",
          gender: registration.gender || "",
          dateOfBirth: registration.dateOfBirth || "",
          nationality: registration.nationality || "NA",
          website: registration.website || "NA",
          passportNo: registration.passportNo || "NA",
          incomeCategory: registration.feeCategory || "NA",
        }}
      />
      <AcademicDetails
        regdata={{
          designation: registration.designation || "NA",
          affiliation: registration.sponsoringOrganizationDetails || "NA",
          university: registration.institution || "NA",
          department: registration.department || "NA",
          state: registration.state || "NA",
          zipCode: registration.zipCode || "NA",
          country: registration.country || "NA",
          alternativeEmail: registration.altEmail || "NA",
          motherTongue: registration.motherTongue || "NA",
          country : registration.country || "NA"
        }}
      />
    </div>
  );
}
