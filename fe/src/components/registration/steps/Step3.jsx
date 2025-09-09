"use client"

const Step3 = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620] mb-6">Academic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            placeholder="Enter your Designation"
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Affiliation</label>
          <input
            type="text"
            placeholder="Enter your Affiliation"
            value={formData.affiliation}
            onChange={(e) => handleInputChange("affiliation", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department/Centre</label>
          <input
            type="text"
            placeholder="Enter Department/Centre"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University / Institution/ Organization</label>
          <input
            type="text"
            placeholder="Enter University / Institution/ Organization"
            value={formData.university}
            onChange={(e) => handleInputChange("university", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City Name</label>
          <input
            type="text"
            placeholder="Enter city name"
            value={formData.cityName}
            onChange={(e) => handleInputChange("cityName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
          <input
            type="text"
            placeholder="Enter state / province name"
            value={formData.stateProvince}
            onChange={(e) => handleInputChange("stateProvince", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
          <input
            type="text"
            placeholder="Enter ZIP / Postal Code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country Name</label>
          <select
            value={formData.countryName}
            onChange={(e) => handleInputChange("countryName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Eg. India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Email Address</label>
          <input
            type="email"
            placeholder="someone@gmail.com"
            value={formData.alternativeEmail}
            onChange={(e) => handleInputChange("alternativeEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue</label>
          <input
            type="text"
            placeholder="Eg. Hindi"
            value={formData.motherTongue}
            onChange={(e) => handleInputChange("motherTongue", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  )
}

export default Step3
