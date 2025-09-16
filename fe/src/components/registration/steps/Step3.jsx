const Step3 = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">
        Academic / Professional Profile & Participation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">
            Current Position / Designation <span className="text-red-600">*</span>
          </label>
          <input
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
          {errors?.designation && (
            <p className="text-red-500 text-xs">{errors.designation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">
            University / Organization <span className="text-red-600">*</span>
          </label>
          <input
            value={formData.institution}
            onChange={(e) => handleInputChange("institution", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
          {errors?.institution && (
            <p className="text-red-500 text-xs">{errors.institution}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Department / Faculty (optional)</label>
          <input
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Highest Academic Qualification <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.qualification}
            onChange={(e) => handleInputChange("qualification", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          >
            <option value="">-- Select --</option>
            <option>UG</option>
            <option>PG</option>
            <option>PhD</option>
            <option>Postdoc</option>
            <option>Assistant Professor</option>
            <option>Associate Professor</option>
            <option>Professor</option>
            <option>Researcher</option>
            <option>Other</option>
          </select>
          {errors?.qualification && (
            <p className="text-red-500 text-xs">{errors.qualification}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">ORCID / Researcher ID (optional)</label>
          <input
            value={formData.orcid}
            onChange={(e) => handleInputChange("orcid", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Previous International Conference Participation (optional)
          </label>
          <textarea
            value={formData.prevConference}
            onChange={(e) => handleInputChange("prevConference", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          ></textarea>
        </div>
      </div>

      {/* Participation Type */}
      <div className="mt-4">
        <label className="block text-sm mb-1">
          Registration Type <span className="text-red-600">*</span>
        </label>
        <select
          value={formData.registrationType}
          onChange={(e) => handleInputChange("registrationType", e.target.value)}
          className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
        >
          <option value="">-- Select Registration Type --</option>
          <option>Delegate</option>
          <option>Paper Presentation</option>
          <option>Panelist</option>
          <option>Poster Presenter</option>
          <option>Attendee</option>
          <option>Student (UG/PG)</option>
        </select>
        {errors?.registrationType && (
          <p className="text-red-500 text-xs">{errors.registrationType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-sm mb-1">
            Author/Presenter Role <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.authorPresenter}
            onChange={(e) => handleInputChange("authorPresenter", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          >
            <option value="">-- Select --</option>
            <option>Main Author</option>
            <option>Co-Author</option>
            <option>Presenter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">
            Mode of Participation <span className="text-red-600">*</span>
          </label>
          <select
            value={formData.modeOfParticipation}
            onChange={(e) =>
              handleInputChange("modeOfParticipation", e.target.value)
            }
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          >
            <option value="">-- Select --</option>
            <option>I will be physically present at the WND World Congress</option>
            <option>Virtual Participation</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Step3
