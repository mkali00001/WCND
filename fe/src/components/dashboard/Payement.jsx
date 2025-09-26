import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Payement = () => {
  const [registration, setRegistration] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

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

  const handleDownloadInvoice = async () => {
    if (!registration) return;

    setDownloadingInvoice(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/download-invoice`,
        {
          withCredentials: true,
          responseType: "blob", // Important: binary response
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `WCND_Invoice_${registration.fullName || "invoice"}.pdf`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download invoice.");
      console.error(err);
    } finally {
      setDownloadingInvoice(false);
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
              <span className="font-semibold">Amount:</span>{" "}
              {registration.participantType === "International" ? "$" : "₹"}
              {registration.feeAmount || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Payment Mode:</span> {registration.paymentMode || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Billing/Invoice Details:</span>{" "}
              {registration.billingInvoiceDetails || "N/A"}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Sponsorship:</span>{" "}
              {registration.sponsorship || "Self-funded"}
            </p>
            <p>
              <span className="font-semibold">Sponsoring Organization:</span>{" "}
              {registration.sponsoringOrganizationDetails || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Invoice</h3>

        {registration.billingInvoiceDetails ? (
          <>
            {/* Download Invoice Button */}
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                downloadingInvoice
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {downloadingInvoice ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                      3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>Download Invoice</>
              )}
            </button>

            {/* Success Message */}
            <p className="mt-4 text-sm text-green-600">
              Invoice is ready! You can now download your invoice.
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            No invoice available for download. Please contact support if this seems like an error.
          </p>
        )}
      </div>
    </div>
  );
};
