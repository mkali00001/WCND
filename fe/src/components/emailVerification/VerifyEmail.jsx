import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/verify-email/${token}`);
        setStatus("✅ Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        if (err.response && err.response.data?.message) {
          setStatus("❌ " + err.response.data.message);
        } else {
          setStatus("❌ Server error");
        }
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>{status}</h2>
      {status.startsWith("❌") && (
        <p>
          <Link to="/resend-verification">Resend Verification Link</Link>
        </p>
      )}
    </div>
  );
}

export default VerifyEmail;
