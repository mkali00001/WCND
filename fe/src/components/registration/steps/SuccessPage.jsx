import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const SuccessPage = () => {
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)
  const [downloadingInvoice, setDownloadingInvoice] = useState(false)
  const [generating, setGenerating] = useState(false)

  // Generate Invoice
  const handleInvoice = async () => {
    setGenerating(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/payment/invoice`,
        {},
        { withCredentials: true }
      )

      setInvoiceGenerated(true)
      toast.success("Invoice generated successfully!")
    } catch (err) {
      toast.error("Failed to generate invoice.")
      console.error(err)
    }finally {
      setGenerating(false)
    }
  }

  // Download Invoice
  const handleDownloadInvoice = async () => {
    setDownloadingInvoice(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ALLOWED_ORIGIN}/payment/download-invoice`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `WCND_Invoice.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success("Invoice downloaded successfully!")
    } catch (err) {
      toast.error("Failed to download invoice.")
      console.error(err)
    } finally {
      setDownloadingInvoice(false)
    }
  }

  return (
    <div className="space-y-6 py-16 text-center">
      {/* Large checkmark icon */}
      <div className="w-20 h-20 bg-[#972620] rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Success heading */}
      <h2 className="text-2xl font-semibold text-[#972620]">
        Thank You for Your Registration!
      </h2>

      {/* Success message */}
      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
        Thank you for submitting your abstract/proposal for the WND World
        Congress on Global Democracy 2026. We greatly appreciate your
        contribution and interest in participating in this global and historic
        event in India. Your submission has been successfully received.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={"/dashboard"}
          className="px-6 py-2 bg-[#972620] text-white rounded-md hover:bg-[#972620]/90 transition-colors font-medium"
        >
          Go to Dashboard
        </Link>

        {!invoiceGenerated && (
          <button
            onClick={handleInvoice}
            disabled={generating}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Generate Invoice"}
          </button>
        )}

        {invoiceGenerated && (
          <button
            onClick={handleDownloadInvoice}
            disabled={downloadingInvoice}
            className={`px-6 py-2 rounded-md font-medium text-white ${
              downloadingInvoice
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {downloadingInvoice ? "Downloading..." : "Download Invoice"}
          </button>
        )}
      </div>

      {/* Info messages */}
      {!invoiceGenerated && (
        <p className="text-sm text-gray-500 mt-3">
          No invoice available yet. Please generate an invoice first.
        </p>
      )}

      {invoiceGenerated && (
        <p className="text-sm text-green-600 mt-3">
          Invoice is ready! You can now download it.
        </p>
      )}
    </div>
  )
}

export default SuccessPage