const Step1 = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6 mb-4 sm:mb-6">
      {/* Intro text */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#972620] mb-4">
          Dear, world citizens!
        </h2>
        <p className="text-gray-700 mb-2 text-sm sm:text-base leading-relaxed">
          Welcome to the abstract/paper/proposal submission application for WND World Congress 2026.
        </p>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          To participate in the World Congress of Natural Democracy 2025, please complete your registration. 
          Once registered, you'll unlock access to paper submissions, updates, and all event details directly from your dashboard.
        </p>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <label className="flex items-start sm:items-center gap-3">
          <input
            type="checkbox"
            checked={formData.guidelinesAccepted}
            onChange={(e) =>
              handleInputChange("guidelinesAccepted", e.target.checked)
            }
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#972620] border-gray-300 rounded focus:ring-[#972620] accent-[#972620] mt-1 sm:mt-0"
          />
          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            I have read the circular regarding Guidelines/Thematic Sections and Dates
            for Abstracts/Papers/Proposals for WND World Congress 2026.
          </span>
        </label>

        <label className="flex items-start sm:items-center gap-3">
          <input
            type="checkbox"
            checked={formData.humanBeingAccepted}
            onChange={(e) =>
              handleInputChange("humanBeingAccepted", e.target.checked)
            }
            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#972620] border-gray-300 rounded focus:ring-[#972620] accent-[#972620] mt-1 sm:mt-0"
          />
          <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            I realize and admit that I am a human being and a respected member of this
            universe. I am born on this planet earth; I am naturally dependent on this
            universe and this earth for the primary condition of my birth and for the
            basic needs of my life. Therefore, I have a responsibility to think and act
            about this universe and this whole planet as an earth/world citizen
            (naturally) and human being; rising above social, religious and political
            boundaries.
          </span>
        </label>
      </div>
    </div>
  )
}

export default Step1
