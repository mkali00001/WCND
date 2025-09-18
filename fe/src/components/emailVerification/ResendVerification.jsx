import { useState } from "react";
import axios from "axios";

function ResendVerification() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending verification link...");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/resend-verification`, { email });
      setMessage("✅ " + res.data.message);
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setMessage("❌ " + err.response.data.message);
      } else {
        setMessage("❌ Server error");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Resend Verification Link</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
          Send Link
        </button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default ResendVerification;
