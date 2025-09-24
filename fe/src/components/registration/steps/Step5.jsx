// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Loader2 } from "lucide-react";

// const Step5 = ({ formData, handleInputChange, errors }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaymentCategories = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/paymentcategory`,
//           { withCredentials: true }
//         );
//         console.log(res.data.data.data);
//         setCategories(res.data.data.data || []);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load payment categories.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentCategories();
//   }, []);

//   const getFee = () => {
//     if (!formData.feeCategory || categories.length === 0) return "N/A";
//     const category = categories.find(c => c.type === formData.feeCategory);
//     if (!category) return "N/A";

//     return formData.participantType === "International"
//       ? `$${category.feeUSD}`
//       : `₹${category.feeINR}`;
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold text-[#972620]">Payment Information</h2>

//       {loading && (
//         <div className="flex items-center gap-2 text-gray-600">
//           <Loader2 className="w-5 h-5 animate-spin" />
//           <span>Loading payment categories...</span>
//         </div>
//       )}

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {!loading && !error && (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div class="pt-1">
//               <p className="text-sm text-gray-600">Fee Category:</p>
//               <p className="text-lg font-semibold text-gray-800">{formData.feeCategory || "Not selected"}</p>
//             </div>
//             <div className="pt-1">
//               <p className="text-sm text-gray-600">Registration Fee:</p>
//               <p className="text-2xl font-bold text-[#972620]">{getFee()}</p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Sponsorship</label>
//             <select
//               value={formData.sponsorship}
//               onChange={(e) => handleInputChange("sponsorship", e.target.value)}
//               className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"
//             >
//               <option value="Self-funded">Self-funded</option>
//               <option value="Sponsored">Sponsored</option>
//             </select>
//           </div>

//           {formData.sponsorship === "Sponsored" && (
//             <div>
//               <label className="block text-sm mb-1">Sponsoring Organization Details</label>
//               <textarea value={formData.sponsoringOrganizationDetails} onChange={(e) => handleInputChange("sponsoringOrganizationDetails", e.target.value)} rows={3} className="w-full px-3 py-2 border border-[#CCCCCC] rounded-lg"></textarea>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Step5;