"use client";

import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Bring Your Vision to Life
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Video */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/contact.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Tell Us About Your Project
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white font-bold py-3 rounded-md hover:bg-pink-700 transition"
                >
                  Send Message
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Free consultation • No commitment • Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
