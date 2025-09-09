import { useState } from "react"
import ProgressIndicator from "./ProgressIndicator"
import Step1 from "./steps/Step1"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"
import Step5 from "./steps/Step5"
import SuccessPage from "./steps/SuccessPage"
import logo from "../../assets/logo.jpg"

const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isCompleted, setIsCompleted] = useState(false)
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
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = () => setIsCompleted(true)

    const renderCurrentStep = () => {
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
                return <Step1 formData={formData} handleInputChange={handleInputChange} />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="pt-[40px]">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={logo} alt="World Congress of Natural Democracy" className="h-12" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Hi, Username</span>
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="max-w-[1148px] mx-auto py-[146px]">
                <div className="bg-white border border-[#C3C3C3] rounded-4xl w-full">
                    
                    {/* Stepper aligned with px-140px */}
                    <div className="px-[140px]">
                        <ProgressIndicator currentStep={currentStep} isCompleted={isCompleted} />
                    </div>

                    {/* Steps aligned with px-140px */}
                    <div className="px-[140px]">
                        {isCompleted ? (
                            <SuccessPage />
                        ) : (
                            <>
                                {renderCurrentStep()}

                                {/* Buttons always left */}
                                <div className="flex justify-start gap-4 mt-8 mb-[143px]">
                                    {currentStep > 1 && (
                                        <button
                                            onClick={handlePrevious}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Previous
                                        </button>
                                    )}

                                    {currentStep === 5 ? (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!formData.finalConfirmation}
                                            className="px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Submit & Pay
                                        </button>
                                    ) : currentStep === 4 ? (
                                        <button
                                            onClick={handleNext}
                                            disabled={!formData.abstractConfirmation}
                                            className="px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                                            className="px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm
