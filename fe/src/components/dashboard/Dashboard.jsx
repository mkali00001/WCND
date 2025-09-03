import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  // Simulated user data
  const [user] = useState({
    isRegistered: true, // change to false to test pre-registration view
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
    payment: {
      txnId: "TXN123456",
      amount: "₹999",
      status: "Success",
    },
  });

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/login"); 
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="border-t border-[#2b2a28]/10">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Page Header */}
          <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-balance">
                Your Dashboard
              </h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-[#2b2a28]/80">
                {user.isRegistered
                  ? "Everything you need in one place."
                  : "Complete your registration to access the full dashboard."}
              </p>
            </div>

            {/* Logout Button */}
            {user.isRegistered && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2"
              >
                Logout
              </button>
            )}
          </header>

          {/* Before Registration */}
          {!user.isRegistered ? (
            <div className="rounded-lg border border-[#2b2a28]/15 bg-amber-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-[#972620] mb-3">
                Register for the World Congress of Natural Democracy
              </h3>
              <p className="text-sm text-[#2b2a28]/80 mb-4">
                Complete your registration to attend the event.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2"
              >
                Register Now
              </Link>
            </div>
          ) : (
            // After Registration View
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Profile */}
                <div className="rounded-lg border border-[#2b2a28]/15 p-5">
                  <h3 className="text-sm font-semibold">Profile</h3>
                  <ul className="mt-2 space-y-1 text-sm text-[#2b2a28]/80">
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Phone: {user.phone}</li>
                    <li>
                      <Link
                        to="/reset-password"
                        className="text-[#972620] hover:underline"
                      >
                        Reset Password
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Payment */}
                <div className="rounded-lg border border-[#2b2a28]/15 p-5">
                  <h3 className="text-sm font-semibold">Payment</h3>
                  <ul className="mt-2 space-y-1 text-sm text-[#2b2a28]/80">
                    <li>Transaction ID: {user.payment.txnId}</li>
                    <li>Amount: {user.payment.amount}</li>
                    <li>Status: {user.payment.status}</li>
                  </ul>
                </div>

                {/* Conference */}
                <div className="rounded-lg border border-[#2b2a28]/15 p-5">
                  <h3 className="text-sm font-semibold">Conference</h3>
                  <ul className="mt-2 space-y-1 text-sm text-[#2b2a28]/80">
                    <li>
                      <Link to="/agenda" className="hover:underline">
                        Agenda
                      </Link>
                    </li>
                    <li>
                      <Link to="/venue" className="hover:underline">
                        Venue
                      </Link>
                    </li>
                    <li>
                      Paper Submission{" "}
                      <span className="text-xs text-[#2b2a28]/60">
                        (Coming Soon)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
