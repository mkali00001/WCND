import axios from "axios";
import React, { useEffect, useState } from "react";

export const Payement = () => {
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/registeration/my-registration`,
          { withCredentials: true }
        );
        setRegistration(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, []);

  const handlePayment = async () => {
    if (!registration) return;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setPaying(true);

    try {
      const amountInPaise = Number(amount) * 100;

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/api/payment/create-order`,
        { amount: amountInPaise },
        { withCredentials: true }
      );

      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Conference Registration",
        description: registration.feeCategory + " Fee",
        order_id: order.id,
        handler: async function (response) {
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
            alert("Payment Successful! 🎉");
          } catch (err) {
            alert("Payment record failed. Check backend.");
            console.error(err);
          }
        },
        prefill: {
          email: registration.email,
          contact: registration.phone,
        },
        theme: { color: "#3399cc" },
      };


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to initiate payment.");
    } finally {
      setPaying(false);
    }
  };


  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="pt-20 p-4 lg:p-12 max-w-7xl mx-auto mb-12">
      {/* Payment Information Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="mb-2">
              <span className="font-semibold">Fee Category:</span> {registration.feeCategory || "N/A"}
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
              <span className="font-semibold">Sponsorship:</span> {registration.sponsorship || "Self-funded"}
            </p>
            <p>
              <span className="font-semibold">Sponsoring Organization:</span>{" "}
              {registration.sponsoringOrganizationDetails || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Make a Payment Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Make a Payment</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Enter Amount (₹):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#972620] focus:border-[#972620] outline-none"
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={paying}
            className="px-6 py-3 bg-[#972620] text-white rounded-lg hover:bg-[#a95551] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
