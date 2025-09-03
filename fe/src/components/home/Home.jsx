function Icon({ label = "icon", children }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#972620] text-[#fefbfa] ring-1 ring-[#a95551]/40"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" role="img" aria-label={label}>
        {children}
      </svg>
    </span>
  )
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="rounded-lg border border-[#2b2a28]/15 p-5 transition-shadow hover:shadow-sm bg-[#fefbfa]">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-semibold text-[#2b2a28]">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="font-sans bg-[#fefbfa] text-[#2b2a28]">
      {/* Hero */}
      <section className="border-b border-[#2b2a28]/10">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-pretty text-3xl md:text-5xl font-extrabold">World Congress Of Natural Democracy</h1>
            <p className="mt-4 text-balance text-base md:text-lg leading-relaxed text-[#2b2a28]/80">
              A global gathering to advance people‑first governance rooted in nature, ethics, and community. Join
              policymakers, researchers, civil society leaders, and citizens to co‑create practical frameworks for
              equitable, sustainable decision‑making.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-[#972620] px-5 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
              >
                Register Now
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-[#2b2a28] ring-1 ring-[#2b2a28]/20 transition-colors hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
              >
                Sign In
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FeatureCard
              title="Natural Principles"
              desc="Governance aligned with ecological balance, human dignity, and long‑term stewardship."
              icon={
                <Icon label="Leaf">
                  <path
                    fill="currentColor"
                    d="M5 15a7 7 0 0011.95 4.95C20.5 16.4 21 9 21 9s-7.4.5-10.95 4.05A7 7 0 005 15z"
                  />
                </Icon>
              }
            />
            <FeatureCard
              title="Global Participation"
              desc="Open forums, citizen assemblies, and multilingual tracks to include every voice."
              icon={
                <Icon label="Globe">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 17.9A8.02 8.02 0 014 12h3c.2 2.4 1.3 4.8 4 7.9zM8 11H4a8.02 8.02 0 017-7.9C9.3 6.2 8.2 8.6 8 11zm2 0c.2-2.9 1.5-5.6 4-8a8 8 0 010 16c-2.5-2.4-3.8-5.1-4-8z"
                  />
                </Icon>
              }
            />
            <FeatureCard
              title="Ethics & Policy"
              desc="Practical frameworks blending constitutional values with community‑led policy design."
              icon={
                <Icon label="Scale">
                  <path fill="currentColor" d="M12 3l3 6h6l-5 5 2 7-6-4-6 4 2-7-5-5h6l3-6z" />
                </Icon>
              }
            />
          </div>

          {/* Secondary CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-[#972620] px-4 py-2.5 text-sm font-semibold text-[#fefbfa] transition-colors hover:bg-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fefbfa]"
            >
              View Program
            </a>
            <a
              href="/submit"
              className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium ring-1 ring-[#2b2a28]/20 transition-colors hover:text-[#a95551] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a95551]"
              aria-describedby="submit-coming-soon"
            >
              Submit Proposal
            </a>
            <span id="submit-coming-soon" className="text-xs text-[#2b2a28]/60">
              Paper Submission: Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* How Registration Works (from requirements) */}
      <section className="border-t border-[#2b2a28]/10">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-balance">Conference Registration – How it works</h2>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-[#2b2a28]/80">
              Follow these simple steps to join the Congress. Duplicate accounts with the same email and phone are not
              allowed.
            </p>
          </header>

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <li className="rounded-lg border border-[#2b2a28]/15 p-5">
              <div className="flex items-start gap-3">
                <Icon label="User">
                  <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z" />
                </Icon>
                <div>
                  <h3 className="text-sm font-semibold">1) Sign Up</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">
                    Provide Name, Email, Phone, and Captcha. The system prevents duplicate accounts using the same Email
                    & Phone.
                  </p>
                  <div className="mt-3">
                    <a
                      href="/signup"
                      className="text-sm font-medium text-[#972620] hover:text-[#a95551] underline underline-offset-4"
                    >
                      Go to Signup
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li className="rounded-lg border border-[#2b2a28]/15 p-5">
              <div className="flex items-start gap-3">
                <Icon label="Mail">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 00-2 2v1l10 6 10-6V6a2 2 0 00-2-2zm0 6l-8 4-8-4v8a2 2 0 002 2h12a2 2 0 002-2v-8z"
                  />
                </Icon>
                <div>
                  <h3 className="text-sm font-semibold">2) Receive Password via Email</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">
                    After signup, the system auto‑generates a password and sends you an email containing the Login URL,
                    your email, and password.
                  </p>
                </div>
              </div>
            </li>

            <li className="rounded-lg border border-[#2b2a28]/15 p-5">
              <div className="flex items-start gap-3">
                <Icon label="Lock">
                  <path
                    fill="currentColor"
                    d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6h-1V9a5 5 0 10-10 0v2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-7-2a3 3 0 016 0v2H11V9z"
                  />
                </Icon>
                <div>
                  <h3 className="text-sm font-semibold">3) Log In</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">
                    Use your email and the generated password. You can reset your password anytime.
                  </p>
                  <div className="mt-3">
                    <a
                      href="/login"
                      className="text-sm font-medium text-[#972620] hover:text-[#a95551] underline underline-offset-4"
                    >
                      Go to Login
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li className="rounded-lg border border-[#2b2a28]/15 p-5">
              <div className="flex items-start gap-3">
                <Icon label="Credit card">
                  <path
                    fill="currentColor"
                    d="M3 6h18a2 2 0 012 2v1H1V8a2 2 0 012-2zm20 6v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4h22zM5 16h6v2H5v-2z"
                  />
                </Icon>
                <div>
                  <h3 className="text-sm font-semibold">4) Register & Pay</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">
                    From your dashboard, click “Register Now” to open the conference registration form. Complete payment
                    via Razorpay.
                  </p>
                </div>
              </div>
            </li>

            <li className="rounded-lg border border-[#2b2a28]/15 p-5 md:col-span-2">
              <div className="flex items-start gap-3">
                <Icon label="Dashboard">
                  <path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v4h8V3h-8z" />
                </Icon>
                <div>
                  <h3 className="text-sm font-semibold">5) Return to Dashboard</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#2b2a28]/80">
                    After successful payment, you’ll be redirected to your dashboard with updated registration and
                    payment status.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>


    </main>
  )
}
