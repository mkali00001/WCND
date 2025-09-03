import { Link } from "react-router-dom"
import logo from "../../assets/logo.jpg"

export default function Footer() {
    return (
        <footer className="bg-[#fefbfa] border-t border-[#2b2a28]/20 mt-10 font-sans">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Brand / Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={logo || "/placeholder.svg"}
                            alt="Brand logo"
                            className="h-16 w-auto rounded-sm"
                        />
                    </Link>

                    {/* Footer Nav */}
                    <nav aria-label="Footer navigation" className="md:order-none">
                        <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                            <li>
                                <Link
                                    to="/"
                                    className="rounded-md px-1 py-1 text-sm font-medium text-[#2b2a28]/80 transition-colors hover:text-[#972620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="rounded-md px-1 py-1 text-sm font-medium text-[#2b2a28]/80 transition-colors hover:text-[#972620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="rounded-md px-1 py-1 text-sm font-medium text-[#2b2a28]/80 transition-colors hover:text-[#972620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
                                >
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="rounded-md px-1 py-1 text-sm font-medium text-[#2b2a28]/80 transition-colors hover:text-[#972620] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Copyright */}
                    <p className="text-center text-xs text-[#2b2a28]/70 md:text-right">
                        <span className="sr-only">Copyright</span> © 2025 MyApp. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
