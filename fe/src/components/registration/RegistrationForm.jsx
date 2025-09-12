import { useState } from "react"
import ProgressIndicator from "./ProgressIndicator"
import Step1 from "./steps/Step1"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"
import Step5 from "./steps/Step5"
import SuccessPage from "./steps/SuccessPage"
import logo from "../../assets/logo.jpg"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
// ConferencePortal
const ConferencePortal = ({ onRegister }) => {
  return (
    <div className="w-full py-[60px]">
      <div className=" p-16 text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#972620" }}>
          Welcome to the Conference Portal!
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          To participate in the World Congress of Natural Democracy 2025,
          please complete your registration. Once registered, you'll unlock
          access to paper submissions, updates, and all event details directly
          from your dashboard.
        </p>

        {/* Register Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={onRegister}
            className="inline-flex items-center justify-center rounded-[10px] bg-[#972620] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2"
          >
            Register Now
          </button>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <p className="underline cursor-pointer text-[#972620] hover:text-[#a95551]">
            Logout!
          </p>
          <p className="underline cursor-pointer text-[#333333] hover:text-[#a95551]">
            Explore more about WND World Congress!
          </p>
        </div>
      </div>
    </div>
  )
}

// Main Registration Wrapper
const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const { fetchUserData } = useAuth()  

  const [formData, setFormData] = useState({
    guidelinesAccepted: false,
    humanBeingAccepted: false,
    registrationType: "Individual",
    atPresent: "Teacher/Professor/Faculty",
    authorPresenter: "Main Author",
    participation: "Paper Presentation/Contributed Paper",
    presentation: "Oral Presentation",
    modeOfParticipation: "I will be physically present at the WND World Congress",
    title: "Mr.",
    firstName: "",
    lastName: "",
    pronunciation: "",
    gender: "Male",
    dateOfBirth: "",
    nationality: "",
    website: "",
    professionalPhone: "",
    personalPhone: "",
    passportNo: "",
    incomeCategory: "Lower Income",
    designation: "",
    affiliation: "",
    department: "",
    university: "",
    cityName: "",
    stateProvince: "",
    zipCode: "",
    countryName: "Eg. India",
    alternativeEmail: "",
    motherTongue: "",
    abstractMessage: "",
    abstractConfirmation: false,
    finalMessage: "",
    finalConfirmation: false,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      console.log("Submitting Data:", formData)

      const response = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/register`,   
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      )

      console.log("Response from server:", response.data)
      await fetchUserData()
      setIsCompleted(true) 
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message)
      alert(error.response?.data?.error || "Something went wrong!")
    }
  }
  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return <ConferencePortal onRegister={() => setCurrentStep(1)} />
    }
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} handleInputChange={handleInputChange} />
      case 2:
        return <Step2 formData={formData} handleInputChange={handleInputChange} />
      case 3:
        return <Step3 formData={formData} handleInputChange={handleInputChange} />
      case 4:
        return <Step4 formData={formData} handleInputChange={handleInputChange} />
      case 5:
        return <Step5 formData={formData} handleInputChange={handleInputChange} />
      default:
        return <ConferencePortal onRegister={() => setCurrentStep(1)} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="pt-6 sm:pt-8 lg:pt-[40px]">
        <div className="max-w-[1148px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="World Congress of Natural Democracy"
              className="h-10 sm:h-12"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 hidden sm:block">Hi, Username</span>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1148px] mx-auto px-4 sm:px-8 py-8 sm:py-12 md:py-20 lg:py-[100px]">
        <div className="bg-white border border-[#C3C3C3] rounded-2xl sm:rounded-3xl lg:rounded-4xl w-full">
          {/* Stepper hide on portal */}
          {currentStep > 0 && (
            <div className="px-4 sm:px-8 md:px-16 lg:px-[140px]">
              <ProgressIndicator currentStep={currentStep} isCompleted={isCompleted} />
            </div>
          )}

          {/* Steps / Portal */}
          <div className="px-4 sm:px-8 md:px-16 lg:px-[140px]">
            {isCompleted ? (
              <SuccessPage />
            ) : (
              <>
                {renderCurrentStep()}

                {/* Buttons only if in stepper */}
                {currentStep > 0 && (
                  <div className="flex flex-wrap justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 mb-12 lg:mb-[100px]">
                    {currentStep > 1 && (
                      <button
                        onClick={handlePrevious}
                        className="px-5 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}

                    {currentStep === 5 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.finalConfirmation}
                        className="px-5 sm:px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit & Pay
                      </button>
                    ) : currentStep === 4 ? (
                      <button
                        onClick={handleNext}
                        disabled={!formData.abstractConfirmation}
                        className="px-5 sm:px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={
                          currentStep === 1 &&
                          (!formData.guidelinesAccepted || !formData.humanBeingAccepted)
                        }
                        className="px-5 sm:px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegistrationForm
