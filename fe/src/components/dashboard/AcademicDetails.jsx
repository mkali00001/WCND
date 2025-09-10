"use client"

import { useState } from "react"

export default function AcademicDetails() {
  const [academicData, setAcademicData] = useState({
    designation: "",
    affiliation: "",
    university: "",
    department: "",
    state: "",
    zipCode: "",
    country: "",
    alternativeEmail: "",
    motherTongue: "",
  })

  const handleInputChange = (field, value) => {
    setAcademicData((prev) => ({
      ...prev,
      [field]: value,
    }))
    console.log("Academic details updated:", field, value)
  }

  const handleSave = () => {
    console.log("Academic Details saved:", academicData)
    alert("Academic details saved successfully!")
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Academic Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            placeholder="Enter your Designation"
            value={academicData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Affiliation</label>
          <input
            type="text"
            placeholder="Enter your Affiliation"
            value={academicData.affiliation}
            onChange={(e) => handleInputChange("affiliation", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University / Institution/ Organization</label>
          <input
            type="text"
            placeholder="Enter University / Institution/ Organization"
            value={academicData.university}
            onChange={(e) => handleInputChange("university", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department/Centre</label>
          <input
            type="text"
            placeholder="Enter Department/Centre"
            value={academicData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
          <input
            type="text"
            placeholder="Enter state / province name"
            value={academicData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
          <input
            type="text"
            placeholder="Enter ZIP / Postal Code"
            value={academicData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country Name</label>
          <select
            value={academicData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none bg-white"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Email Address</label>
          <input
            type="email"
            placeholder="someone@gmail.com"
            value={academicData.alternativeEmail}
            onChange={(e) => handleInputChange("alternativeEmail", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue</label>
          <input
            type="text"
            placeholder="Eg. Hindi"
            value={academicData.motherTongue}
            onChange={(e) => handleInputChange("motherTongue", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 mt-4 bg-[#972620] text-white rounded-lg hover:bg-[#972620] transition-colors"
      >
        Save Changes
      </button>
    </div>
  )
}
