import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Payement = () => {
  const [registration, setRegistration] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regResponse = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/registeration/my-registration`,
          { withCredentials: true }
        );
        setRegistration(regResponse.data);

        const payResponse = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/my-payment`,
          { withCredentials: true }
        );
        setPayment(payResponse.data);
      } catch (err) {
        toast.error(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInvoice = async () => {
    if (!registration) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/invoice`,
        {}, // You can pass any extra info if needed
        { withCredentials: true }
      );

      setInvoiceUrl(res.data.invoiceUrl);
      toast.success("Invoice generated successfully!");
    } catch (err) {
      toast.error("Failed to generate invoice.");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!registration) return <p className="text-center py-10">No registration found.</p>;

  return (
    <div className="pt-20 p-4 lg:p-12 max-w-7xl mx-auto mb-12">
      {/* Payment Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className={`mb-2 font-semibold ${payment ? "text-green-600" : "text-orange-500"}`}>
              Status: {payment ? "Paid" : "Pending Payment"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Fee Category:</span> {registration.feeCategory || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Amount:</span> {registration.participantType === "International" ? "$" : "₹"}{registration.feeAmount || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Payment Mode:</span> {registration.paymentMode || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Billing/Invoice Details:</span> {registration.billingInvoiceDetails || "N/A"}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Sponsorship:</span> {registration.sponsorship || "Self-funded"}
            </p>
            <p>
              <span className="font-semibold">Sponsoring Organization:</span> {registration.sponsoringOrganizationDetails || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Invoice</h3>
        {invoiceUrl ? (
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            📄 Download Invoice
          </a>
        ) : (
          <button
            onClick={handleInvoice}
            className="px-6 py-3 bg-[#972620] text-white rounded-lg hover:bg-[#a95551] font-semibold"
          >
            Generate Invoice
          </button>
        )}
      </div>
    </div>
  );
};
