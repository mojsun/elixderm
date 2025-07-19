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
  // Duplicate logos for seamless loop
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

export default function PartnersSection(): React.JSX.Element {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-content">
          <h2 className="partners-title">Powered by Premium Partners</h2>
          <p className="partners-subtitle">
            Quality ingredients from trusted suppliers for superior formulations
          </p>
          
          <div className="partners-logos-wrapper">
            <div className="partners-logos-track">
              {partners.map((partner, index) => (
                <div key={index} className="partner-logo">
                  <img 
                    src={partner.src} 
                    alt={partner.alt} 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
