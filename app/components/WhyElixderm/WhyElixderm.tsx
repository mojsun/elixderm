// components/home/PhilosophySection.tsx
import React from "react";

export default function WhyElixderm(): JSX.Element {
  return (
    <section className="py-16 bg-white" id="why-different">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why Elixderm is Different
            </h2>
            <p className="text-gray-700">
              While other manufacturers focus on volume and standardization,
              we've built our entire operation around flexibility, transparency,
              and genuine partnership. Here's what sets us apart in the beauty
              manufacturing landscape.
            </p>
          </div>

          {/* Right - Features */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="p-5 border rounded shadow-sm">
                <div className="text-indigo-500 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">
                  MOQs starting at 25 units
                </h3>
                <p className="text-sm text-gray-600">
                  Perfect for testing markets and scaling gradually
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded shadow-sm">
                <div className="text-indigo-500 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="M21 12H3" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">Transparent pricing</h3>
                <p className="text-sm text-gray-600">
                  Clear, upfront costs with no hidden fees or surprises
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-5 border rounded shadow-sm">
                <div className="text-indigo-500 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">
                  No-pressure onboarding
                </h3>
                <p className="text-sm text-gray-600">
                  Consultative approach focused on your success
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-5 border rounded shadow-sm">
                <div className="text-indigo-500 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6 0a2 2 0 0 0-2-2v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">
                  Custom formulations available
                </h3>
                <p className="text-sm text-gray-600">
                  Unique products tailored to your vision
                </p>
              </div>

              {/* Add more cards as needed */}
            </div>

            <div className="mt-6 text-center">
              <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">
                Discover What Makes Us Different
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
