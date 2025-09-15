const Step4 = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">Accommodation, Travel & Health</h2>

      <div>
        <label className="block text-sm mb-1">Accommodation Required? <span className="text-red-600">*</span></label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.accommodationRequired === "Yes"} onChange={() => handleInputChange("accommodationRequired", "Yes")} className="accent-[#972620]" />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.accommodationRequired === "No"} onChange={() => handleInputChange("accommodationRequired", "No")} className="accent-[#972620]" />
            <span>No</span>
          </label>
        </div>

        {formData.accommodationRequired === "Yes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-sm mb-1">Arrival Date & Time</label>
              <input type="datetime-local" value={formData.arrivalDateTime} onChange={(e) => handleInputChange("arrivalDateTime", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded" />
            </div>
            <div>
              <label className="block text-sm mb-1">Departure Date & Time</label>
              <input type="datetime-local" value={formData.departureDateTime} onChange={(e) => handleInputChange("departureDateTime", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded" />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Travel Assistance Required? <span className="text-red-600">*</span></label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.travelAssistanceRequired === "Yes"} onChange={() => handleInputChange("travelAssistanceRequired", "Yes")} className="accent-[#972620]" />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.travelAssistanceRequired === "No"} onChange={() => handleInputChange("travelAssistanceRequired", "No")} className="accent-[#972620]" />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Visa Section for International */}
      {formData.participantType === "International" && (
        <div>
          <label className="block text-sm mb-1">Require Visa Support / Invitation Letter? <span className="text-red-600">*</span></label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" checked={formData.requireVisaSupport === "Yes"} onChange={() => handleInputChange("requireVisaSupport", "Yes")} className="accent-[#972620]" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={formData.requireVisaSupport === "No"} onChange={() => handleInputChange("requireVisaSupport", "No")} className="accent-[#972620]" />
              <span>No</span>
            </label>
          </div>

          {formData.requireVisaSupport === "Yes" && (
            <div className="mt-3">
              <label className="block text-sm mb-1">Nearest Indian Embassy / Consulate <span className="text-red-600">*</span></label>
              <input value={formData.nearestEmbassyConsulate} onChange={(e) => handleInputChange("nearestEmbassyConsulate", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded" />
              {errors?.nearestEmbassyConsulate && <p className="text-red-500 text-xs">{errors.nearestEmbassyConsulate}</p>}
            </div>
          )}
        </div>
      )}

      {/* Accessibility & Special Requirements */}
      <div>
        <label className="block text-sm mb-1">Accessibility / Special Requirements (optional)</label>
        <textarea value={formData.accessibilityRequirements} onChange={(e) => handleInputChange("accessibilityRequirements", e.target.value)} rows={3} className="w-full px-3 py-2 border border-[#CCCCCC] rounded"></textarea>
      </div>

      {/* Dietary & Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Dietary Preference <span className="text-red-600">*</span></label>
          <select value={formData.dietaryPreference} onChange={(e) => handleInputChange("dietaryPreference", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded">
            <option value="">-- Select --</option>
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
            <option>Other</option>
          </select>
          {errors?.dietaryPreference && <p className="text-red-500 text-xs">{errors.dietaryPreference}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Do you have any allergies?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" checked={formData.allergies === "No"} onChange={() => handleInputChange("allergies", "No")} className="accent-[#972620]" />
              <span>No</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={formData.allergies === "Yes"} onChange={() => handleInputChange("allergies", "Yes")} className="accent-[#972620]" />
              <span>Yes</span>
            </label>
          </div>
          {formData.allergies === "Yes" && <textarea value={formData.allergyDetails} onChange={(e) => handleInputChange("allergyDetails", e.target.value)} rows={2} className="w-full px-3 py-2 border rounded mt-2" placeholder="Please specify allergies"></textarea>}
        </div>

        <div>
          <label className="block text-sm mb-1">Travel / Health Insurance Status <span className="text-red-600">*</span></label>
          <select value={formData.travelInsuranceStatus} onChange={(e) => handleInputChange("travelInsuranceStatus", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded">
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Health Conditions (optional)</label>
        <textarea value={formData.healthConditions} onChange={(e) => handleInputChange("healthConditions", e.target.value)} rows={3} className="w-full px-3 py-2 border border-[#CCCCCC] rounded"></textarea>
      </div>

      <div className="flex items-center gap-3">
        <label className="block text-sm mb-1">Willingness for Field Trips / Site Visits</label>
        <select
          value={formData.willingForFieldTrips}
          onChange={(e) => handleInputChange("willingForFieldTrips", e.target.value)}
          className="px-3 py-2 border border-[#CCCCCC] rounded"
        >
          <option value="">-- Select --</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

      </div>
    </div>
  )
}

export default Step4
