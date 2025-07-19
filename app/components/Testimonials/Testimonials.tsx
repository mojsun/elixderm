"use client";
import { useState } from "react";

type Persona = "influencer" | "doctor" | "amazon-seller" | "startup";

const personas: Record<
  Persona,
  {
    quote: string;
    avatar: string;
    title: string;
    stats: { number: string; trend: string; label: string }[];
  }
> = {
  influencer: {
    quote:
      "Working with Elixderm made launching my skincare line actually doable. The low MOQs let me test products without breaking the bank, and their team answered every newbie question I had.",
    avatar: "BI",
    title: "Beauty Influencer, 500K followers",
    stats: [
      { number: "92%", trend: "↗", label: "Follower engagement" },
      { number: "45%", trend: "↗", label: "Product sales increase" },
    ],
  },
  doctor: {
    quote:
      "The formulations meet the standards I need for my practice. Their regulatory guidance helped navigate the compliance requirements, and patients have responded well to the products.",
    avatar: "MD",
    title: "Dermatologist, Private Practice",
    stats: [
      { number: "98%", trend: "↗", label: "Patient satisfaction" },
      { number: "15+", trend: "↗", label: "Years partnership" },
    ],
  },
  "amazon-seller": {
    quote:
      "As an Amazon seller, the low MOQs were crucial for testing new products. Their launch support and knowledge of Amazon requirements helped streamline the process and improve our rankings.",
    avatar: "AS",
    title: "Amazon FBA Seller, Beauty Category",
    stats: [
      { number: "3x", trend: "↗", label: "Revenue growth" },
      { number: "4.8★", trend: "↗", label: "Amazon rating" },
    ],
  },
  startup: {
    quote:
      "Starting a beauty brand felt overwhelming until I found Elixderm. Their startup-friendly approach and transparent pricing helped us launch without maxing out credit cards.",
    avatar: "SU",
    title: "Startup Founder, Beauty Brand",
    stats: [
      { number: "6 mo", trend: "↗", label: "Time to market" },
      { number: "150%", trend: "↗", label: "First year growth" },
    ],
  },
};

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function Testimonials() {
  const [active, setActive] = useState<Persona>("influencer");

  const getPersonaLabel = (persona: Persona) => {
    switch (persona) {
      case "influencer": return "Influencer";
      case "doctor": return "Practitioner";
      case "amazon-seller": return "Amazon Seller";
      case "startup": return "Founder";
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Hear From People Just Like You</h2>
          <p className="testimonials-subtitle">
            Real feedback from entrepreneurs, creators, and business owners who&apos;ve worked with us
          </p>
        </div>
        
        <div className="persona-selector">
          {(["influencer", "doctor", "amazon-seller", "startup"] as Persona[]).map((persona) => (
            <button
              key={persona}
              onClick={() => setActive(persona)}
              className={`persona-btn ${active === persona ? "active" : ""}`}
              data-persona={persona}
            >
              {getPersonaLabel(persona)}
            </button>
          ))}
        </div>
        
        <div className="testimonial-showcase">
          {(["influencer", "doctor", "amazon-seller", "startup"] as Persona[]).map((persona) => {
            const testimonial = personas[persona];
            const isActive = active === persona;
            
            return (
              <div
                key={persona}
                className={`testimonial-active-card ${!isActive ? "hidden" : ""}`}
                id={`testimonial-${persona}`}
              >
                <div className="testimonial-content-main">
                  <div className="star-rating">
                    {Array(5).fill(null).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="testimonial-quote">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="testimonial-author-info">
                    <div className="author-avatar">
                      <div className="avatar-circle">{testimonial.avatar}</div>
                    </div>
                    <div className="author-details">
                      <div className="author-title">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-stats">
                  {testimonial.stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-number">
                        {stat.number} <span className="stat-trend">{stat.trend}</span>
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
