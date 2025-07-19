"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Persona = "influencer" | "doctor" | "amazon-seller" | "startup";

const personas: Record<
  Persona,
  {
    quote: string;
    avatar: string;
    title: string;
    stats: { number: string; label: string }[];
  }
> = {
  influencer: {
    quote:
      "Working with Elixderm made launching my skincare line actually doable. The low MOQs let me test products without breaking the bank, and their team answered every newbie question I had.",
    avatar: "BI",
    title: "Beauty Influencer, 500K followers",
    stats: [
      { number: "92% ↗", label: "Follower engagement" },
      { number: "45% ↗", label: "Product sales increase" },
    ],
  },
  doctor: {
    quote:
      "The formulations meet the standards I need for my practice. Their regulatory guidance helped navigate the compliance requirements, and patients have responded well to the products.",
    avatar: "MD",
    title: "Dermatologist, Private Practice",
    stats: [
      { number: "98% ↗", label: "Patient satisfaction" },
      { number: "15+ ↗", label: "Years partnership" },
    ],
  },
  "amazon-seller": {
    quote:
      "As an Amazon seller, the low MOQs were crucial for testing new products. Their launch support and knowledge of Amazon requirements helped streamline the process and improve our rankings.",
    avatar: "AS",
    title: "Amazon FBA Seller, Beauty Category",
    stats: [
      { number: "3x ↗", label: "Revenue growth" },
      { number: "4.8★ ↗", label: "Amazon rating" },
    ],
  },
  startup: {
    quote:
      "Starting a beauty brand felt overwhelming until I found Elixderm. Their startup-friendly approach and transparent pricing helped us launch without maxing out credit cards.",
    avatar: "SU",
    title: "Startup Founder, Beauty Brand",
    stats: [
      { number: "6 mo ↗", label: "Time to market" },
      { number: "150% ↗", label: "First year growth" },
    ],
  },
};

export default function Testimonials() {
  const [active, setActive] = useState<Persona>("influencer");

  const testimonial = personas[active];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Hear From People Just Like You
          </h2>
          <p className="text-gray-600 mt-2">
            Real feedback from entrepreneurs, creators, and business owners
            who've worked with us
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(
            ["influencer", "doctor", "amazon-seller", "startup"] as Persona[]
          ).map((p) => (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={twMerge(
                "px-4 py-2 rounded-full border text-sm font-medium transition",
                p === active
                  ? "bg-black text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-200"
              )}
            >
              {p === "influencer"
                ? "Influencer"
                : p === "doctor"
                  ? "Practitioner"
                  : p === "amazon-seller"
                    ? "Amazon Seller"
                    : "Founder"}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-2 text-yellow-500 mb-3">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
          </div>
          <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
              {testimonial.avatar}
            </div>
            <div className="text-sm text-gray-700">{testimonial.title}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
            {testimonial.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-xl font-semibold text-black">
                  {stat.number}
                </div>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
