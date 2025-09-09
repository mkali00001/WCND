"use client"

import { useState } from "react"

export default function PersonalInformation() {
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

  const handleSave = () => {
    console.log("Personal Information saved:", formData)
    alert("Personal information saved successfully!")
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#972620] text-white rounded-lg hover:bg-[#972620] transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <select
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none bg-white"
          >
            <option value="">Select Title</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            placeholder="Eg. John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Eg. Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            placeholder="Eg. Indian"
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            placeholder="Eg. https://www.example.com"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport No.</label>
          <input
            type="text"
            placeholder="XXXXXXXX"
            value={formData.passportNo}
            onChange={(e) => handleInputChange("passportNo", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country based Income Category <span className="text-[#972620]">*</span>
          </label>
          <select
            value={formData.incomeCategory}
            onChange={(e) => handleInputChange("incomeCategory", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none bg-white"
          >
            <option value="">Select Income Category</option>
            <option value="Lower Income">Lower Income</option>
            <option value="Lower Middle Income">Lower Middle Income</option>
            <option value="Upper Middle Income">Upper Middle Income</option>
            <option value="High Income">High Income</option>
          </select>
        </div>
      </div>
    </div>
  )
}
