const Step1 = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">Welcome — Guidelines & Declaration</h2>

      <div className="text[#CCCCCC]0">
        <p className="mb-2">
          Welcome to the World Congress of Natural Democracy 2026 India. Please read the guidelines and thematic
          sections before submitting your abstract/paper/proposal.
        </p>
        <p className="mb-2">
          After registration you will get access to paper submission, updates and event details via your dashboard.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.guidelinesAccepted}
            onChange={(e) => handleInputChange("guidelinesAccepted", e.target.checked)}
            className="w-5 h-5 accent-[#972620] border border[#CCCCCC] focus:border[#CCCCCC] focus:ring[#CCCCCC]"
          />
          <span className="text-sm">
            I have read the circular regarding Guidelines/Thematic Sections and Dates for Abstracts/Papers/Proposals for WCND World Congress 2026.
          </span>
        </label>
        {errors?.guidelinesAccepted && <p className="text-red-500 text-xs">{errors.guidelinesAccepted}</p>}

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.humanBeingAccepted}
            onChange={(e) => handleInputChange("humanBeingAccepted", e.target.checked)}
            className="w-5 h-5 accent-[#972620] border border[#CCCCCC] focus:border[#CCCCCC] focus:ring[#CCCCCC]"
          />
          <span className="text-sm">
            I realize and admit that I am a human being and a respected member of this universe. I understand my responsibilities as a world citizen.
          </span>
        </label>
        {errors?.humanBeingAccepted && <p className="text-red-500 text-xs">{errors.humanBeingAccepted}</p>}
      </div>
    </div>
  )
}

export default Step1
