import { useState } from "react"

export default function PersonalInformation({regdata}) {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    website: "",
    passportNo: "",
    incomeCategory: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    console.log("Personal info updated:", field, value)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            placeholder="Eg. Mr."
            value={regdata.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            placeholder="Eg. John"
            value={regdata.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Eg. Doe"
            value={regdata.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <input
            type="text"
            placeholder="Eg. Male / Female"
            value={regdata.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={regdata.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            placeholder="Eg. Indian"
            value={regdata.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="text"
            placeholder="Eg. https://www.example.com"
            value={regdata.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport No.</label>
          <input
            type="text"
            placeholder="XXXXXXXX"
            value={regdata.passportNo}
            onChange={(e) => handleInputChange("passportNo", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country based Income Category <span className="text-[#972620]">*</span>
          </label>
          <input
            type="text"
            placeholder="Eg. High Income"
            value={regdata.incomeCategory}
            onChange={(e) => handleInputChange("incomeCategory", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>
      </div>
    </div>
  )
}
