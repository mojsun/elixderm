// components/home/PhilosophySection.tsx
import React from "react";

export default function PhilosophySection(): JSX.Element {
  return (
    <section id="philosophy-section" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Your Manufacturing Partner
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            "Strict confidentiality guaranteed",
            "Unique formulations advantage",
            "Amazon launch support",
            "Competitive edge secured",
          ].map((text, index) => (
            <div
              key={index}
              className={`border p-4 rounded-lg text-center font-medium transition-all duration-300 ${
                index === 0
                  ? "bg-pink-100 border-pink-400"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              <span className="text-gray-700">{text}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-gray-500 italic">
          Scroll to explore our advantages
        </div>
      </div>
    </section>
  );
}
