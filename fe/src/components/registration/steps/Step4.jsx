const Step4 = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620] mb-6">Abstract/ Proposal Details</h2>

      <div>
        <p className="text-gray-700 mb-4">
          Do you want to give any message to the world through this Congress? Selected messages will be placed on the
          Congress website. The best messages will be presented in the Congress program through e/physical medium.
        </p>

        <textarea
          placeholder="Write your answer here"
          value={formData.abstractMessage}
          onChange={(e) => handleInputChange("abstractMessage", e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620] resize-none"
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.abstractConfirmation}
            onChange={(e) => handleInputChange("abstractConfirmation", e.target.checked)}
            className="mt-1 w-5 h-5 text-[#972620] border-gray-300 rounded focus:ring-[#972620] accent-[#972620] "
          />
          <span className="text-sm text-gray-700">
            I confirm that all the information I have provided is correct and to the best of my knowledge. My warm
            wishes for the WND World Congress on Global Democracy 2026.
          </span>
        </label>
      </div>
    </div>
  )
}

export default Step4
