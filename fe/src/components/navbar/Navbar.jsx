import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    { label: "Agenda", to: "/agenda" },
    { label: "Venue", to: "/venue" },
    // { label: "Register", href: "/register" },
  ];

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fefbfa] border-b border-[#2b2a28]/20 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4" aria-label="Main navigation">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Go to home">
          <img
            src={logo}
            alt="Conference logo"
            className="h-10 w-auto ring-1 ring-[#2b2a28]/10"
          />
          <span className="sr-only">World Congress of Natural Democracy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-md px-1 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] ${
                isActive(item.to) ? "text-[#972620]" : "text-[#2b2a28] hover:text-[#a95551]"
              }`}
              aria-current={isActive(item.to) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-md px-2 py-1.5 text-sm font-medium text-[#2b2a28] transition-colors hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-md bg-[#972620] px-3 py-2 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#2b2a28] transition-colors hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile Panel */}
      <div id="mobile-menu" className={`${open ? "block" : "hidden"} md:hidden`}>
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] ${
                  isActive(item.to)
                    ? "text-[#972620] bg-[#fefbfa]"
                    : "text-[#2b2a28] hover:bg-[#fefbfa] hover:text-[#a95551]"
                }`}
                aria-current={isActive(item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-[#2b2a28]/10 my-1" />
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="w-full rounded-md px-3 py-2 text-sm font-medium text-[#2b2a28] hover:bg-[#fefbfa] hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="w-full rounded-md px-3 py-2 text-sm font-medium text-[#2b2a28] hover:bg-[#fefbfa] hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
            >
              Signup
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="w-full rounded-md px-3 py-2 text-sm font-medium text-[#2b2a28] hover:bg-[#fefbfa] hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
            >
              Dashboard
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-[#972620] px-3 py-2 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
