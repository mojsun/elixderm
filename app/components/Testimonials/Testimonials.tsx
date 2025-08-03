"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { TrendingUpIcon, StarIcon } from "../icons/MaterialIcons";

type Persona = "influencer" | "doctor" | "amazon-seller" | "startup";

const personas: Record<
  Persona,
  {
    quote: string;
    avatar: string;
    title: string;
    stats: { number: string; trend: "up" | "down" | "stable"; label: string }[];
  }
> = {
  influencer: {
    quote:
      "Working with Elixderm made launching my skincare line actually doable. The low MOQs let me test products without breaking the bank, and their team answered every newbie question I had.",
    avatar: "BI",
    title: "Beauty Influencer, 500K followers",
    stats: [
      { number: "92%", trend: "up", label: "Follower engagement" },
      { number: "45%", trend: "up", label: "Product sales increase" },
    ],
  },
  doctor: {
    quote:
      "The formulations meet the standards I need for my practice. Their regulatory guidance helped navigate the compliance requirements, and patients have responded well to the products.",
    avatar: "MD",
    title: "Dermatologist, Private Practice",
    stats: [
      { number: "98%", trend: "up", label: "Patient satisfaction" },
      { number: "15+", trend: "up", label: "Years partnership" },
    ],
  },
  "amazon-seller": {
    quote:
      "As an Amazon seller, the low MOQs were crucial for testing new products. Their launch support and knowledge of Amazon requirements helped streamline the process and improve our rankings.",
    avatar: "AS",
    title: "Amazon FBA Seller, Beauty Category",
    stats: [
      { number: "3x", trend: "up", label: "Revenue growth" },
      { number: "4.8★", trend: "up", label: "Amazon rating" },
    ],
  },
  startup: {
    quote:
      "Starting a beauty brand felt overwhelming until I found Elixderm. Their startup-friendly approach and transparent pricing helped us launch without maxing out credit cards.",
    avatar: "SU",
    title: "Startup Founder, Beauty Brand",
    stats: [
      { number: "6 mo", trend: "up", label: "Time to market" },
      { number: "150%", trend: "up", label: "First year growth" },
    ],
  },
};





export default function Testimonials() {
  const [active, setActive] = useState<Persona>("influencer");
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Memoize the personas array to prevent dependency issues
  const personas_array = useMemo(() => 
    ["influencer", "doctor", "amazon-seller", "startup"] as Persona[], 
    []
  );
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      

    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality for desktop
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      autoPlayRef.current = setInterval(() => {
        setActive(current => {
          const currentIndex = personas_array.indexOf(current);
          const nextIndex = (currentIndex + 1) % personas_array.length;
          return personas_array[nextIndex];
        });
      }, 3000); // Auto-switch every 3 seconds
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [personas_array]);

  // Reset auto-play timer when user interacts
  const resetAutoPlay = () => {
    // Clear existing timers
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    
    // Restart after a delay
    resetTimeoutRef.current = setTimeout(() => {
      autoPlayRef.current = setInterval(() => {
        setActive(current => {
          const currentIndex = personas_array.indexOf(current);
          const nextIndex = (currentIndex + 1) % personas_array.length;
          return personas_array[nextIndex];
        });
      }, 3000); // Auto-switch every 3 seconds
    }, 5000); // Wait 5 seconds before restarting auto-play
  };

  // Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = personas_array.indexOf(active);
      let nextIndex;
      
      if (isLeftSwipe) {
        // Swipe left - go to next
        nextIndex = (currentIndex + 1) % personas_array.length;
      } else {
        // Swipe right - go to previous
        nextIndex = currentIndex === 0 ? personas_array.length - 1 : currentIndex - 1;
      }
      
      setActive(personas_array[nextIndex]);
      resetAutoPlay();
    }
  };

  const handlePersonaClick = (persona: Persona) => {
    setActive(persona);
    resetAutoPlay();
  };

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
          {personas_array.map((persona) => (
            <button
              key={persona}
              onClick={() => handlePersonaClick(persona)}
              className={`persona-btn ${active === persona ? "active" : ""}`}
              data-persona={persona}
            >
              {getPersonaLabel(persona)}
            </button>
          ))}
        </div>
        
        <div 
          className="testimonial-showcase"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {personas_array.map((persona) => {
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
                        {stat.number} 
                        <span className="stat-trend">
                          {stat.trend === "up" && <TrendingUpIcon size={20} />}
                          {stat.trend === "down" && <TrendingUpIcon size={20} className="rotate-180" />}
                          {stat.trend === "stable" && <span>→</span>}
                        </span>
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {isMobile && (
          <>
            <div className="slider-indicators">
              {personas_array.map((persona, index) => (
                <button
                  key={persona}
                  className={`slider-dot ${active === persona ? "active" : ""}`}
                  onClick={() => handlePersonaClick(persona)}
                  aria-label={`Go to ${getPersonaLabel(persona)} testimonial`}
                />
              ))}
            </div>
            

          </>
        )}
      </div>
    </section>
  );
}
