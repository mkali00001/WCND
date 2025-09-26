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
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"

// Conference Portal (Landing Page Before Registration Starts)
const ConferencePortal = ({ onRegister }) => {
  const { logout } = useAuth()
  return (
    <div className="w-full py-[40px]">
      <div className="p-16 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#972620" }}>
          Welcome to the Conference Portal!
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          To participate in the World Congress of Natural Democracy 2026,
          please complete your registration. Once registered, you'll unlock
          access to submissions, updates, and all event details directly
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
          <button
            onClick={logout}
            className="underline cursor-pointer text-[#972620] hover:text-[#a95551]"
          >
            Logout!
          </button>
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
  const { fetchUserData, user } = useAuth()

  // Extended formData (as per official document)
  const [formData, setFormData] = useState({
    // Step1: Guidelines
    guidelinesAccepted: false,
    humanBeingAccepted: false,

    // Step2: Personal Info
    participantType: "Domestic",
    country: "",
    otherCountry: "",
    fullName: user.name || "",
    pronunciation: "",
    title: "",
    languagePreference: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    motherTongue: "",
    passportNo: "",
    passportExpiry: "",
    govtId: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    website: "",
    altEmail: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    accompanying: "no",
    accompanyingCount: 1,
    accompanyingPersons: [],
    registrationId: user?.registrationId || "", 

    // Step3: Academic + Participation
    designation: "",
    institution: "",
    department: "",
    qualification: "",
    orcid: "",
    prevConference: "",
    registrationType: "",

    // Step4: Accommodation / Travel / Visa / Dietary
    accommodationRequired: "",
    arrivalDateTime: "",
    departureDateTime: "",
    travelAssistanceRequired: "",
    requireVisaSupport: "",
    nearestEmbassyConsulate: "",
    dietaryPreference: "",
    allergies: "",
    allergyDetails: "",
    travelInsuranceStatus: "",
    healthConditions: "",
    willingForFieldTrips: "",

    // Step5: Payment & Declarations
    feeCategory: "",
    paymentMode: "",
    billingInvoiceDetails: "",
    sponsorship: "Self-funded",
    sponsoringOrganizationDetails: "",

    agreeCodeOfConduct: false,
    confirmEmergencyContactCorrect: false,
    valuesAffirmation: false,
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      let updated = { ...prev, [field]: value }

      // Special handling for accompanying toggle
      if (field === "accompanying") {
        if (value === "yes") {
          updated.accompanyingCount = prev.accompanyingCount || 1
          if (!prev.accompanyingPersons || prev.accompanyingPersons.length === 0) {
            updated.accompanyingPersons = [
              {
                fullName: "",
                passportId: "",
                nationality: "",
                relation: "",
                relationOther: "",
                dob: "",
                contact: "",
                specialReq: "",
              },
            ]
          }
        } else {
          updated.accompanyingCount = 0
          updated.accompanyingPersons = []
        }
      }

      // handling for accompanyingCount
      if (field === "accompanyingCount") {
        const count = Number(value)
        let persons = [...prev.accompanyingPersons]

        while (persons.length < count) {
          persons.push({
            fullName: "",
            passportId: "",
            nationality: "",
            relation: "",
            relationOther: "",
            dob: "",
            contact: "",
            specialReq: "",
          })
        }

        persons = persons.slice(0, count)

        updated.accompanyingPersons = persons
      }

      return updated
    })

    setErrors((prevErrors) => {
      if (prevErrors[field]) {
        return {
          ...prevErrors,
          [field]: value ? "" : prevErrors[field],
        }
      }
      return prevErrors
    })
  }



  const handleNext = () => {
    let stepRequirements = {
      2: [
        "fullName",
        "title",
        "dateOfBirth",
        "gender",
        "nationality",
        "email",
        "phone",
        "emergencyName",
        "emergencyPhone",
      ],
      3: ["designation", "institution", "qualification", "registrationType"],
      4: [
        "accommodationRequired",
        "travelAssistanceRequired",
        "dietaryPreference",
        "travelInsuranceStatus",
        "willingForFieldTrips",
      ],
      5: ["feeCategory", "paymentMode", "sponsorship", "agreeCodeOfConduct", "confirmEmergencyContactCorrect", "valuesAffirmation"],

    }

    // Step 2 International participants must provide country + passport
    if (currentStep === 2 && formData.participantType === "International") {
      stepRequirements[2].push("country", "passportNo", "passportExpiry")
    }

    // Step 2 Domestic participants must provide govt ID
    if (currentStep === 2 && formData.participantType === "Domestic") {
      stepRequirements[2].push("govtId")
    }

    // Step 2 If bringing accompanying persons, validate them
    if (currentStep === 2 && formData.accompanying === "yes") {
      if (!formData.accompanyingCount || formData.accompanyingCount < 1) {
        toast.error("Please select number of accompanying persons.")
        return
      }
      for (let i = 0; i < formData.accompanyingCount; i++) {
        const person = formData.accompanyingPersons?.[i]
        if (
          !person ||
          !person.fullName ||
          !person.passportId ||
          !person.nationality ||
          !person.relation ||
          !person.dob
        ) {
          toast.error(`Please complete details for accompanying person ${i + 1}`)
          return
        }
      }
    }

    // Step 4 International participants & visa support
    if (currentStep === 4 && formData.participantType === "International") {
      stepRequirements[4].push("requireVisaSupport")
      if (formData.requireVisaSupport === "Yes") {
        stepRequirements[4].push("nearestEmbassyConsulate")
      }
    }

    // Step 4 Allergies check
    if (currentStep === 4 && formData.allergies === "Yes") {
      stepRequirements[4].push("allergyDetails")
    }

    let newErrors = {}
    for (let field of stepRequirements[currentStep] || []) {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast.error("Please fill all required fields before proceeding.")
    }
  }




  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmitAndPay = async () => {
    try {
      const amountInPaise = Number(formData.feeAmount) * 100;
      if (amountInPaise > 0) {
        // 1. Create order first
        const orderResponse = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/create-order`,
          { amount: amountInPaise },
          { withCredentials: true }
        );
        const order = orderResponse.data;

        // 2. Open Razorpay payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "WCND 2026 Registration",
          description: `${formData.feeCategory} Fee`,
          order_id: order.id,
          handler: async function (response) {
            // 3. On payment success, save registration
            try {
              const registrationResponse = await axios.post(
                `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/registeration/register`,
                formData,
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
              // 4. Record payment after registration is saved
              try {
                await axios.post(
                  `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/record-payment`,
                  {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount: order.amount,
                  },
                  { withCredentials: true }
                );
                toast.success("Payment & Registration Successful!");
                setIsCompleted(true);
              } catch (payErr) {
                toast.error("Registration saved, but payment record failed. Contact support.");
                console.error(payErr);
              }
            } catch (regErr) {
              toast.error("Payment succeeded but registration failed. Please contact support.");
              console.error(regErr);
            }
          },
          prefill: {
            email: formData.email || "",
            contact: formData.phone || "",
            name: formData.fullName || "",
          },
          theme: { color: "#972620" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on("payment.failed", function (response) {
          toast.error(`Payment Failed: ${response.error.description}`);
        });
      } else {
        // If no payment is needed, submit registration directly
        try {
          const registrationResponse = await axios.post(
            `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/registeration/register`,
            formData,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          toast.success("Registration complete!");
          setIsCompleted(true);
        } catch (error) {
          console.error("Error submitting form:", error.response?.data || error.message);
          toast.error(error.response?.data?.error || "Something went wrong!");
        }
      }
    } catch (error) {
      console.error("Error in payment:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  }

  const addAccompanyingPerson = () => {
    setFormData((prev) => ({
      ...prev,
      accompanyingPersons: [
        ...prev.accompanyingPersons,
        { fullName: "", age: "", relation: "" },
      ],
    }))
  }

  const updateAccompanyingPerson = (index, field, value) => {
    const updated = [...formData.accompanyingPersons]
    updated[index][field] = value
    setFormData((prev) => ({
      ...prev,
      accompanyingPersons: updated,
    }))
  }

  const removeAccompanyingPerson = (index) => {
    const updated = [...formData.accompanyingPersons]
    updated.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      accompanyingPersons: updated,
    }))
  }

  const renderCurrentStep = () => {
    if (currentStep === 0) return <ConferencePortal onRegister={() => setCurrentStep(1)} />
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} handleInputChange={handleInputChange} />
      case 2:
        return <Step2
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
          addAccompanyingPerson={addAccompanyingPerson}
          updateAccompanyingPerson={updateAccompanyingPerson}
          removeAccompanyingPerson={removeAccompanyingPerson}
        />
      case 3:
        return <Step3 formData={formData} handleInputChange={handleInputChange} errors={errors} />
      case 4:
        return <Step4 formData={formData} handleInputChange={handleInputChange} errors={errors} />
      case 5:
        return <Step5 formData={formData} handleInputChange={handleInputChange} errors={errors} />
      default:
        return <ConferencePortal onRegister={() => setCurrentStep(1)} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="pt-6 sm:pt-8 lg:pt-[20px]">
        <div className="max-w-[1148px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="WCND 2026" className="h-10 sm:h-12" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 hidden sm:block">Hi, {user?.name}</span>
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
      <div className="max-w-[1148px] mx-auto px-4 sm:px-8 py-8 sm:py-12 md:py-20 lg:py-[30px]">
        <div className="bg-white border border-[#C3C3C3] rounded-2xl sm:rounded-3xl lg:rounded-4xl w-full">
          {/* Progress Indicator */}
          {currentStep > 0 && (
            <div className="px-4 sm:px-8 md:px-16 lg:px-[140px]">
              <ProgressIndicator currentStep={currentStep} isCompleted={isCompleted} />
            </div>
          )}

          {/* Step Content */}
          <div className="px-4 sm:px-8 md:px-16 lg:px-[140px]">
            {isCompleted ? (
              <SuccessPage />
            ) : (
              <>
                {renderCurrentStep()}

                {/* Navigation Buttons */}
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
                        onClick={handleSubmitAndPay}
                        disabled={!formData.valuesAffirmation}
                        className="px-5 sm:px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit & Pay
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