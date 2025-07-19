"use client";

import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/design.png"
        >
          <source src="/videos/leaf-elix.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="block mb-2">
              For the beauty brands thinking bigger
            </span>
            <span className="block text-pink-400">
              we manufacture what others won&apos;t.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-8">
            Boutique manufacturing for indie beauty brands. Low MOQs,
            transparent pricing, and flexible production.
          </p>

          <div>
            <Link
              href="/contact"
              className="inline-block relative bg-pink-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-pink-700 transition"
            >
              <span className="relative z-10">Let's Start</span>
              <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-sm text-white">
        <div className="w-px h-6 bg-white mb-1" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
