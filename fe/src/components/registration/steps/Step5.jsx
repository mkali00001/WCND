import React, { useEffect } from "react"

const Step5 = ({ formData, handleInputChange, errors }) => {
  useEffect(() => {
    const mappingINR = {
      "Student UG/PG": 2000,
      "Research Scholar": 4000,
      "Faculty/Professional/Activist": 7000,
      "Accompanying Person": 10500,
    }
    const mappingUSD = {
      "International Delegate": 200,
      "Accompanying Person": 200,
    }

    if (formData.feeCategory && mappingINR[formData.feeCategory]) {
      handleInputChange("feeAmountINR", mappingINR[formData.feeCategory])
    }
    if (formData.feeCategory && mappingUSD[formData.feeCategory]) {
      handleInputChange("feeAmountUSD", mappingUSD[formData.feeCategory])
    }
  }, [formData.feeCategory])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">Registration Fee & Payment</h2>

      <div>
        <label className="block text-sm mb-1">Fee Category <span className="text-red-600">*</span></label>
        <select value={formData.feeCategory} onChange={(e) => handleInputChange("feeCategory", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded">
          <option value="">-- Select Category --</option>
          <option>Student UG/PG</option>
          <option>Research Scholar</option>
          <option>Faculty/Professional/Activist</option>
          <option>Accompanying Person</option>
          <option>International Delegate</option>
        </select>
        {errors?.feeCategory && <p className="text-red-500 text-xs">{errors.feeCategory}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Fee (INR)</label>
          <input value={formData.feeAmountINR || ""} readOnly className="w-full px-3 py-2 border border-[#CCCCCC] rounded bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm mb-1">Fee (USD)</label>
          <input value={formData.feeAmountUSD || ""} readOnly className="w-full px-3 py-2 border border-[#CCCCCC] rounded bg-gray-50" />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Mode of Payment <span className="text-red-600">*</span></label>
        <select value={formData.paymentMode} onChange={(e) => handleInputChange("paymentMode", e.target.value)} className="w-full px-3 py-2 border border-[#CCCCCC] rounded">
          <option value="">-- Select Payment Mode --</option>
          <option>Bank Transfer</option>
          <option>PayPal</option>
          <option>Other</option>
        </select>
        {errors?.paymentMode && <p className="text-red-500 text-xs">{errors.paymentMode}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Billing / Invoice Details (optional)</label>
        <textarea value={formData.billingInvoiceDetails} onChange={(e) => handleInputChange("billingInvoiceDetails", e.target.value)} rows={3} className="w-full px-3 py-2 border border-[#CCCCCC] rounded"></textarea>
      </div>

      <div>
        <label className="block text-sm mb-1">Sponsorship</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.sponsorship === "Self-funded"} onChange={() => handleInputChange("sponsorship", "Self-funded")} className="accent-[#972620]" />
            <span>Self-funded</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={formData.sponsorship === "Institution-funded"} onChange={() => handleInputChange("sponsorship", "Institution-funded")} className="accent-[#972620]" />
            <span>Institution-funded</span>
          </label>
        </div>

        {formData.sponsorship === "Institution-funded" && (
          <textarea value={formData.sponsoringOrganizationDetails} onChange={(e) => handleInputChange("sponsoringOrganizationDetails", e.target.value)} rows={3} className="w-full px-3 py-2 border border-[#CCCCCC] rounded mt-2" placeholder="Provide sponsoring organization details"></textarea>
        )}
      </div>

      {/* Declaration checkboxes */}
      <div className="space-y-2 mt-4">
        <label className="flex items-start gap-3">
          <input type="checkbox" checked={formData.agreeCodeOfConduct} onChange={(e) => handleInputChange("agreeCodeOfConduct", e.target.checked)} className="accent-[#972620]" />
          <span>I agree to abide by the Congress Code of Conduct, Ethics, and Policy.</span>
        </label>
        {errors?.agreeCodeOfConduct && <p className="text-red-500 text-xs">{errors.agreeCodeOfConduct}</p>}

        <label className="flex items-start gap-3">
          <input type="checkbox" checked={formData.confirmEmergencyContactCorrect} onChange={(e) => handleInputChange("confirmEmergencyContactCorrect", e.target.checked)} className="accent-[#972620]" />
          <span>I confirm my emergency contact info is correct.</span>
        </label>
        {errors?.confirmEmergencyContactCorrect && <p className="text-red-500 text-xs">{errors.confirmEmergencyContactCorrect}</p>}

        <label className="flex items-start gap-3">
          <input type="checkbox" checked={formData.valuesAffirmation} onChange={(e) => handleInputChange("valuesAffirmation", e.target.checked)} className="accent-[#972620]" />
          <span>
            I solemnly affirm my commitment to uphold respect for all life and the natural environment; maintain academic rigor, transparency, and integrity; collaborate responsibly; honor diverse perspectives; act ethically and peacefully; and advance ecological sustainability and natural democracy.
          </span>
        </label>
        {errors?.valuesAffirmation && <p className="text-red-500 text-xs">{errors.valuesAffirmation}</p>}
      </div>
    </div>
  )
}

export default Step5