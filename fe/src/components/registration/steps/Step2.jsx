import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Step2 = ({
  formData,
  handleInputChange,
  errors,
  updateAccompanyingPerson,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">Personal Information</h2>

      {/* Participant Type */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={formData.participantType === "Domestic"}
            onChange={() => handleInputChange("participantType", "Domestic")}
            name="geo"
            className="accent-[#972620] border border-[#CCCCCC]"
          />
          <span>Domestic (Resident of India)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={formData.participantType === "International"}
            onChange={() => handleInputChange("participantType", "International")}
            name="geo"
            className="accent-[#972620] border border-[#CCCCCC]"
          />
          <span>International (Resident of another country)</span>
        </label>
      </div>

      {/* Country if International */}
      {formData.participantType === "International" && (
        <div>
          <label className="block text-sm mb-2">Country *</label>
          <input
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            placeholder="Country name"
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
          {errors?.country && <p className="text-red-500 text-xs">{errors.country}</p>}
        </div>
      )}

      {/* Name */}
      {/* Name Row (3 inputs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Title *</label>
          <select
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          >
            <option value="">-- Select Title --</option>
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
            <option>Dr.</option>
            <option>Prof.</option>
            <option>Mx.</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Full Name *</label>
          <input
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Pronunciation (optional)</label>
          <input
            value={formData.pronunciation}
            onChange={(e) => handleInputChange("pronunciation", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
      </div>


      <div>
        <label className="block text-sm mb-1">Gender *</label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors?.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
      </div>

      {/* DOB + Nationality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block text-sm mb-1">Date of Birth *</label>
          <DatePicker
            selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
            onChange={(date) =>
              handleInputChange("dateOfBirth", date ? date.toISOString().split("T")[0] : "")
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Select your date of birth"
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1">Nationality *</label>
          <input
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1">Mother Tongue</label>
          <input
            value={formData.motherTongue}
            onChange={(e) => handleInputChange("motherTongue", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
      </div>

      {/* Passport / Govt ID */}
      {formData.participantType === "International" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Passport No *</label>
            <input
              value={formData.passportNo}
              onChange={(e) => handleInputChange("passportNo", e.target.value)}
              className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Passport Expiry *</label>
            <DatePicker
              selected={formData.passportExpiry ? new Date(formData.passportExpiry) : null}
              onChange={(date) =>
                handleInputChange("passportExpiry", date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="Select expiry date"
              className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-1">Government ID *</label>
          <input
            value={formData.govtId}
            onChange={(e) => handleInputChange("govtId", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
      )}

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1">Alternate Email</label>
          <input
            type="email"
            value={formData.altEmail}
            onChange={(e) => handleInputChange("altEmail", e.target.value)}
            placeholder="Enter your alternate email"
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1">Phone *</label>
          <input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1">Alt Phone</label>
          <input
            value={formData.altPhone}
            onChange={(e) => handleInputChange("altPhone", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>


      </div>


      <div>
        <label className="block text-sm mb-1">Address *</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
        />
      </div>

      {/* Emergency Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Emergency Name *</label>
          <input
            value={formData.emergencyName}
            onChange={(e) => handleInputChange("emergencyName", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Relation *</label>
          <input
            value={formData.emergencyRelation}
            onChange={(e) => handleInputChange("emergencyRelation", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Emergency Phone *</label>
          <input
            value={formData.emergencyPhone}
            onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
            className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
          />
        </div>
      </div>

      {/* Accompanying Person Section */}
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">
          Will you be bringing an accompanying person? <span className="text-red-500">*</span>
        </p>
        <p className="text-xs text-gray-500">
          Accompanying persons must be 18 years or older. They may attend ceremonies, cultural
          events, exhibitions, and the book fair, but are not permitted in scientific sessions.
        </p>

        {/* Yes/No */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accompanying"
              value="no"
              checked={formData.accompanying === "no"}
              onChange={(e) => handleInputChange("accompanying", e.target.value)}
              className="accent-[#972620] border border-[#CCCCCC]"
            />
            No
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accompanying"
              value="yes"
              checked={formData.accompanying === "yes"}
              onChange={(e) => {
                handleInputChange("accompanying", e.target.value)
                if (e.target.value === "yes" && !formData.accompanyingCount) {
                  handleInputChange("accompanyingCount", 1)
                }
              }}
              className="accent-[#972620] border border-[#CCCCCC]"
            />
            Yes
          </label>
        </div>

        {/* If Yes */}
        {formData.accompanying === "yes" && (
          <div className="space-y-6">
            {/* Number of Persons */}
            <div>
              <label className="block text-sm font-medium mb-1">Number of Accompanying Persons *</label>
              <select
                value={formData.accompanyingCount || 1}
                onChange={(e) => handleInputChange("accompanyingCount", Number(e.target.value))}
                className="w-40 px-3 py-2 border border-[#CCCCCC] rounded-lg"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>

            {/* Person Details */}
            {(formData.accompanyingPersons || []).slice(0, formData.accompanyingCount || 1).map((person, index) => {
              return (
                <div key={index} className="p-4 border border-[#CCCCCC] rounded-lg-lg space-y-4">
                  <h3 className="font-medium">
                    {index === 0 ? "1st Accompanying Person" : "2nd Accompanying Person"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={person.fullName || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "fullName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Passport / ID Number *</label>
                      <input
                        type="text"
                        value={person.passportId || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "passportId", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Nationality *</label>
                      <input
                        type="text"
                        value={person.nationality || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "nationality", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Relation with Delegate *</label>
                      <select
                        value={person.relation || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "relation", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      >
                        <option value="">-- Select Relation --</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Colleague">Colleague</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other (specify)</option>
                      </select>
                      {person.relation === "Other" && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          value={person.relationOther || ""}
                          onChange={(e) =>
                            updateAccompanyingPerson(index, "relationOther", e.target.value)
                          }
                          className="mt-2 px-3 py-2 border border-[#CCCCCC] rounded-lg w-full"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Date of Birth *</label>
                      <DatePicker
                        selected={person.dob ? new Date(person.dob) : null}
                        onChange={(date) =>
                          updateAccompanyingPerson(index, "dob", date ? date.toISOString().split("T")[0] : "")
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select DOB"
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Email / Phone (optional)</label>
                      <input
                        type="text"
                        value={person.contact || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "contact", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm mb-1">Special Requirements (optional)</label>
                      <textarea
                        value={person.specialReq || ""}
                        onChange={(e) =>
                          updateAccompanyingPerson(index, "specialReq", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
                      />
                    </div>
                  </div>
                  {/* Auto fields  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <p>
                      <strong>Accompanying Person Fee:</strong>
                    </p>
                    <p>
                      <strong>Main Delegate:</strong> {formData.fullName || "—"}
                    </p>
                    <p>
                      <strong>Delegate Registration ID:</strong>{" "}
                      {formData.registrationId || "Auto-generated"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Step2
