"use client"

const Step2 = ({ formData, handleInputChange }) => {
  return (
    <div className=" space-y-6 mb-[16px]">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-[#972620] mb-6">
        Basic Information
      </h2>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Type
          </label>
          <select
            value={formData.registrationType}
            onChange={(e) =>
              handleInputChange("registrationType", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Individual</option>
            <option>Organization</option>
          </select>
        </div>

        {/* At Present */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            At Present
          </label>
          <select
            value={formData.atPresent}
            onChange={(e) => handleInputChange("atPresent", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Teacher/Professor/Faculty</option>
            <option>Student</option>
            <option>Researcher</option>
            <option>Professional</option>
          </select>
        </div>

        {/* Author/Presenter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author/Presenter
          </label>
          <select
            value={formData.authorPresenter}
            onChange={(e) =>
              handleInputChange("authorPresenter", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Main Author</option>
            <option>Co-Author</option>
            <option>Presenter</option>
          </select>
        </div>

        {/* Participation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            As a participant in the WND World Congress (Maximum 2)
          </label>
          <select
            value={formData.participation}
            onChange={(e) =>
              handleInputChange("participation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Paper Presentation/Contributed Paper</option>
            <option>Poster Presentation</option>
            <option>Workshop</option>
          </select>
        </div>

        {/* Presentation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presentation
          </label>
          <select
            value={formData.presentation}
            onChange={(e) =>
              handleInputChange("presentation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Oral Presentation</option>
            <option>Poster Presentation</option>
            <option>Virtual Presentation</option>
          </select>
        </div>

        {/* Mode of Participation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode of Participation
          </label>
          <select
            value={formData.modeOfParticipation}
            onChange={(e) =>
              handleInputChange("modeOfParticipation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>
              I will be physically present at the WND World Congress
            </option>
            <option>Virtual Participation</option>
          </select>
        </div>
      </div>

      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <select
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
            <option>Dr.</option>
            <option>Prof.</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Eg. John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Eg. Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>
      </div>

      {/* Pronunciation & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pronunciation of Name
          </label>
          <input
            type="text"
            placeholder="Eg. John"
            value={formData.pronunciation}
            onChange={(e) =>
              handleInputChange("pronunciation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
          <p className="text-[9px] text-gray-500 mt-1">
            e.g. Name; Maisie - "MAY" + "zee" (You can use Google to know the pronunciation of your name.)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="text"
            placeholder="Choose your Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality
          </label>
          <input
            type="text"
            placeholder="Eg. Indian"
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="text"
            placeholder="Eg. https://www.example.com"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        {/* Professional Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Phone No.
          </label>
          <input
            type="text"
            placeholder="With country/area code"
            value={formData.professionalPhone}
            onChange={(e) =>
              handleInputChange("professionalPhone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        {/* Personal Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Phone No.
          </label>
          <input
            type="text"
            placeholder="With country/area code"
            value={formData.personalPhone}
            onChange={(e) =>
              handleInputChange("personalPhone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>

        {/* Passport No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passport No.
          </label>
          <input
            type="text"
            placeholder="XXXXXXXX"
            value={formData.passportNo}
            onChange={(e) => handleInputChange("passportNo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
          />
        </div>
      </div>

      {/* Income Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country based Income Category *
        </label>
        <select
          value={formData.incomeCategory}
          onChange={(e) =>
            handleInputChange("incomeCategory", e.target.value)
          }
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972620]"
        >
          <option>Lower Income</option>
          <option>Lower Middle Income</option>
          <option>Upper Middle Income</option>
          <option>High Income</option>
        </select>
      </div>
    </div>
  )
}

export default Step2
