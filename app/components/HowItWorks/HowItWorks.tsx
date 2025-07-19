import React from "react";

export default function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="md:flex md:justify-between md:items-start mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How it Works
            </h2>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <p className="text-gray-700">
              Our streamlined process takes you from concept to market-ready
              product in just 5 simple steps. Each phase is designed to maximize
              quality while minimizing complexity and timeline.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {[
            {
              step: "01",
              title: "Discovery & Consultation",
              description:
                "We start with a comprehensive consultation to understand your vision, target market, and specific requirements. Our team analyzes your needs and provides expert guidance on formulation possibilities, packaging options, and regulatory considerations.",
              videoSrc: "./videos/discovery.mp4",
            },
            {
              step: "02",
              title: "Formula Development",
              description:
                "Our chemists create custom formulations tailored to your specifications. We develop prototypes, conduct stability testing, and refine the formula until it meets your exact requirements for performance, texture, and shelf life.",
              imageSrc: "/images/formula-development.png",
            },
            {
              step: "03",
              title: "Sample & Testing",
              description:
                "We produce samples for your review and testing. You'll receive physical samples to evaluate texture, performance, and user experience. We iterate based on your feedback until the formulation is perfect.",
              videoSrc: "/videos/testing-video.mp4",
            },
            {
              step: "04",
              title: "Design & Packaging",
              description:
                "Our design team creates stunning packaging that reflects your brand identity. We handle everything from container selection to label design, ensuring your products stand out on shelves and online.",
              videoSrc: "/videos/design.mp4",
            },
            {
              step: "05",
              title: "Production & Delivery",
              description:
                "We manufacture your products with precision and care, maintaining strict quality control throughout the process. Your finished products are carefully packaged and delivered ready for market launch.",
              videoSrc: "/videos/packaging.mp4",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="text-indigo-600 text-lg font-bold mb-1">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
              <div className="md:w-1/2">
                <div className="rounded overflow-hidden shadow-lg">
                  {item.videoSrc ? (
                    <video
                      className="w-full h-auto"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Instruction */}
        <div className="mt-16 text-center">
          <span className="text-gray-500 block mb-2">
            Scroll to explore each step
          </span>
          <div className="h-2 w-40 mx-auto bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-indigo-500 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
