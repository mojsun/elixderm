"use client";

import React, { useEffect, useState } from "react";

export default function PhilosophySection(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const philosophyValues = [
    "Strict confidentiality guaranteed",
    "Unique formulations advantage", 
    "Amazon launch support",
    "Competitive edge secured",
  ];

  const maxIndex = philosophyValues.length - 1;

  // Auto-advance slides every 2.4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 1800); // Change slide every 2.4 seconds

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section 
      id="philosophy-section" 
      className="philosophy-section relative flex items-center justify-center overflow-hidden py-8"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        height: '50vh'
      }}
    >
      <div className="philosophy-container w-full h-full flex items-center justify-center max-w-full mx-auto px-8">
        <div className="philosophy-content text-center w-full mx-auto relative flex flex-col items-center justify-center" style={{ height: '300px' }}>
          
          {/* Philosophy Title */}
          <h2 className="philosophy-title font-heading font-semibold text-grayish transition-all duration-600 ease-in-out"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
                marginBottom: '3rem'
              }}>
            Manufacturing Partner Promise
          </h2>
          
          {/* Philosophy Values */}
          <div className="philosophy-values relative w-full flex items-center justify-center" style={{ height: '120px' }}>
            {philosophyValues.map((text, index) => (
              <div
                key={index}
                className={`philosophy-value absolute inset-0 flex items-center justify-center w-full ${
                  index === currentIndex 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transition: 'all 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: index === currentIndex ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                }}
                data-index={index}
              >
                <span className="value-text relative font-bold text-center whitespace-nowrap leading-none transition-all duration-[480ms] ease-out"
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        transform: index === currentIndex ? 'scale(1) rotateX(0deg)' : 'scale(0.9) rotateX(5deg)',
                        filter: index === currentIndex ? 'blur(0px)' : 'blur(1px)',
                      }}>
                  {text}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-[480ms] ease-out"
                       style={{
                         width: index === currentIndex ? '80px' : '0px',
                         background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                         opacity: index === currentIndex ? 1 : 0,
                       }} />
                </span>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
