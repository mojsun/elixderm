import React from "react";

const partners = [
  {
    src: "https://aminforoutan.com/wp-content/uploads/2025/03/sel-logo-1.webp",
    alt: "SEL",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2023/12/nissanusa-logo-1.png",
    alt: "Nissan USA",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2024/04/infiniti-logo.png",
    alt: "Infiniti",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2023/12/moz-logo.png",
    alt: "Moz",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2024/04/jnj-logo.png",
    alt: "Johnson & Johnson",
  },
  // Repeat for looping effect
  {
    src: "https://aminforoutan.com/wp-content/uploads/2025/03/sel-logo-1.webp",
    alt: "SEL",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2023/12/nissanusa-logo-1.png",
    alt: "Nissan USA",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2024/04/infiniti-logo.png",
    alt: "Infiniti",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2023/12/moz-logo.png",
    alt: "Moz",
  },
  {
    src: "https://aminforoutan.com/wp-content/uploads/2024/04/jnj-logo.png",
    alt: "Johnson & Johnson",
  },
];

export default function PartnersSection(): JSX.Element {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Powered by Premium Partners
        </h2>
        <p className="text-gray-600 mb-10">
          Quality ingredients from trusted suppliers for superior formulations
        </p>

        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-8 w-[200%]">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
