import React from "react";

const partners = [
  {
    src: "/images/logos/casf-logo.png",
    alt: "BASF",
    url: "https://www.basf.com/ca/en"
  },
  {
    src: "/images/logos/croda-logo.png",
    alt: "Croda",
    url: "https://www.croda.com/en-gb"
  },
  {
    src: "/images/logos/evonik-logo.png",
    alt: "Evonik",
    url: "https://www.evonik.com/en.html"
  },
  {
    src: "/images/logos/ashland-logo.png",
    alt: "Ashland",
    url: "https://www.ashland.com/"
  },
  {
    src: "/images/logos/tri-k-logo.png",
    alt: "Tri-K Industries",
    url: "https://www.tri-k.com/"
  },
  {
    src: "/images/logos/seppic-logo.png",
    alt: "Seppic",
    url: "https://www.seppic.com/en-US/"
  },
  {
    src: "/images/logos/selco-logo.png",
    alt: "GFN-Selco",
    url: "https://www.gfn-selco.de/EN"
  },
  {
    src: "/images/logos/biocogent-logo.png",
    alt: "Biocogent",
    url: "https://www.biocogent.com/"
  },
  // Duplicate logos for seamless loop
  {
    src: "/images/logos/casf-logo.png",
    alt: "BASF",
    url: "https://www.basf.com/ca/en"
  },
  {
    src: "/images/logos/croda-logo.png",
    alt: "Croda",
    url: "https://www.croda.com/en-gb"
  },
  {
    src: "/images/logos/evonik-logo.png",
    alt: "Evonik",
    url: "https://www.evonik.com/en.html"
  },
  {
    src: "/images/logos/ashland-logo.png",
    alt: "Ashland",
    url: "https://www.ashland.com/"
  },
  {
    src: "/images/logos/tri-k-logo.png",
    alt: "Tri-K Industries",
    url: "https://www.tri-k.com/"
  },
  {
    src: "/images/logos/seppic-logo.png",
    alt: "Seppic",
    url: "https://www.seppic.com/en-US/"
  },
  {
    src: "/images/logos/selco-logo.png",
    alt: "GFN-Selco",
    url: "https://www.gfn-selco.de/EN"
  },
  {
    src: "/images/logos/biocogent-logo.png",
    alt: "Biocogent",
    url: "https://www.biocogent.com/"
  },
];

export default function PartnersSection(): React.JSX.Element {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-content">
          <h2 className="partners-title">Premium Ingredient Partners</h2>
          <p className="partners-subtitle">
          Trusted suppliers providing world-class raw materials for exceptional formulations
          </p>
          
          <div className="partners-logos-wrapper">
            <div className="partners-logos-track">
              {partners.map((partner, index) => (
                <div key={index} className="partner-logo">
                  <a href={partner.url} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={partner.src} 
                      alt={partner.alt} 
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
