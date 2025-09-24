import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Step5 = ({ formData, handleInputChange, errors }) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



// Fetch payment category on mount
  useEffect(() => {
    const fetchPaymentCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/paymentcategory`,
          { category: formData.participantType },
          { withCredentials: true }
        );

        const dataArray = res.data.data.data; // this is an array
if (dataArray && dataArray.length > 0) {
  const data = dataArray[0]; // first (and only) element
  setCategory(data);

  const amount = formData.participantType === "International"
    ? data.feeUSD
    : data.feeINR;

  handleInputChange("feeAmount", amount);
  handleInputChange("feeCategory", formData.participantType);
}


        setError(null);
      } catch (err) {
        setError("Failed to load payment category.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentCategory();
  }, []);

  const getFee = () => {
    if (!category) return "N/A";
    return formData.participantType === "International"
      ? `$${category.feeUSD}`
      : `₹${category.feeINR}`;
  };


  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#972620]">Payment Information</h2>

      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading payment categories...</span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="pt-1">
              <p className="text-sm text-gray-600">Fee Category:</p>
              <p className="text-lg font-semibold text-gray-800">
                {formData.participantType}
              </p>
            </div>
            <div className="pt-1">
              <p className="text-sm text-gray-600">Registration Fee:</p>
              <p className="text-2xl font-bold text-[#972620]">{getFee()}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Sponsorship</label>
            <select
              value={formData.sponsorship}
              onChange={(e) => handleInputChange("sponsorship", e.target.value)}
              className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
            >
              <option value="Self-funded">Self-funded</option>
              <option value="Sponsored">Sponsored</option>
            </select>
          </div>

          {formData.sponsorship === "Sponsored" && (
            <div>
              <label className="block text-sm mb-1">
                Sponsoring Organization Details
              </label>
              <textarea
                value={formData.sponsoringOrganizationDetails}
                onChange={(e) =>
                  handleInputChange("sponsoringOrganizationDetails", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
              ></textarea>
            </div>
          )}
        </>
      )}

      {/* Declaration checkboxes */}
      <div className="space-y-2 mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.agreeCodeOfConduct}
            onChange={(e) => handleInputChange("agreeCodeOfConduct", e.target.checked)}
            className="accent-[#972620]"
          />
          <span>I agree to abide by the Congress Code of Conduct, Ethics, and Policy.</span>
        </label>
        {errors?.agreeCodeOfConduct && (
          <p className="text-red-500 text-xs">{errors.agreeCodeOfConduct}</p>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.confirmEmergencyContactCorrect}
            onChange={(e) =>
              handleInputChange("confirmEmergencyContactCorrect", e.target.checked)
            }
            className="accent-[#972620]"
          />
          <span>I confirm my emergency contact info is correct.</span>
        </label>
        {errors?.confirmEmergencyContactCorrect && (
          <p className="text-red-500 text-xs">{errors.confirmEmergencyContactCorrect}</p>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.valuesAffirmation}
            onChange={(e) => handleInputChange("valuesAffirmation", e.target.checked)}
            className="accent-[#972620]"
          />
          <span>
            I solemnly affirm my commitment to uphold respect for all life and the
            natural environment; maintain academic rigor, transparency, and integrity;
            collaborate responsibly; honor diverse perspectives; act ethically and
            peacefully; and advance ecological sustainability and natural democracy.
          </span>
        </label>
        {errors?.valuesAffirmation && (
          <p className="text-red-500 text-xs">{errors.valuesAffirmation}</p>
        )}
      </div>
    </div>
  );
};

export default Step5;


