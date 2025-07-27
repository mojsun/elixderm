"use client";

import React, { useState, useEffect, useRef } from "react";

export default function WhyElixderm(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleShowMore = () => {
    setIsScrolled(!isScrolled);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "MOQs starting at 25 units",
      description: "Perfect for testing markets and scaling gradually"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m21 12-6 0m-6 0-6 0"/>
        </svg>
      ),
      title: "Transparent pricing",
      description: "Clear, upfront costs with no hidden fees or surprises"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "No-pressure onboarding",
      description: "Consultative approach focused on your success"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6 0a2 2 0 0 0-2-2v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9z"/>
        </svg>
      ),
      title: "Custom formulations available",
      description: "Unique products tailored to your vision"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5,4.21 12,6.81 16.5,4.21"/>
          <polyline points="7.5,19.79 7.5,14.6 3,12"/>
          <polyline points="21,12 16.5,14.6 16.5,19.79"/>
        </svg>
      ),
      title: "Scalable packaging options",
      description: "From startup to enterprise-level production"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Regulatory support included",
      description: "Compliance guidance at every step"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden w-full py-24 md:py-16 sm:py-12 bg-gradient-to-br from-white to-light-DEFAULT"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-6 sm:px-4">
        <div className="w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] md:grid-cols-1 gap-16 md:gap-12 sm:gap-8 items-start">
          
            {/* Left Content */}
            <div className="lg:sticky lg:top-24 md:static">
              <h2 className="font-heading font-bold mb-8 md:mb-6 sm:mb-4 leading-tight text-[clamp(2.5rem,4vw,3.5rem)] md:text-[clamp(2rem,5vw,3rem)] sm:text-[clamp(1.8rem,6vw,2.5rem)] tracking-[-0.02em] bg-gradient-to-br from-dark-DEFAULT to-dark-light bg-clip-text text-transparent">
                Why Elixderm is Different
              </h2>
              <p className="text-grayish text-xl md:text-lg sm:text-base leading-relaxed max-w-lg font-normal">
                While other manufacturers focus on volume and standardization, we&apos;ve built our entire operation around flexibility, transparency, and genuine partnership. Here&apos;s what sets us apart in the beauty manufacturing landscape.
              </p>
            </div>
            
            {/* Right Content */}
            <div className="w-full">
              
              {/* Features Container */}
              <div className="relative overflow-hidden mt-8 md:mt-6 sm:mt-4 h-[600px] md:h-auto sm:h-auto">
                <div className={`grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8 md:gap-6 sm:gap-4 relative transition-transform duration-[800ms] ease-out h-[820px] md:h-auto sm:h-auto ${
                  isScrolled ? '' : ''
                }`}
                     style={{ 
                       transform: isScrolled ? 'translateY(-272px)' : 'translateY(0)'
                     }}>
                  
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`feature-card relative overflow-hidden rounded-2xl p-8 md:p-6 sm:p-4 transition-all duration-[600ms] cubic-bezier(0.4, 0, 0.2, 1) opacity-0 translate-y-8 bg-white/80 backdrop-blur-[10px] border border-primary-100/50 h-[240px] md:h-auto sm:h-auto shadow-lg hover:shadow-xl hover:-translate-y-2 hover:border-primary-200 hover:bg-white/95 group ${
                        index >= 4 ? 'md:block sm:block' : ''
                      }`}
                                             style={{
                         gridColumn: index % 2 === 0 ? '1' : '2',
                         gridRow: Math.floor(index / 2) + 1
                       }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary-50/50 to-primary-100/50" />
                      
                      {/* Feature Icon */}
                      <div className="relative z-10 w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ease-out bg-gradient-to-br from-primary-500 to-primary-400 mb-8 md:mb-6 sm:mb-4 group-hover:scale-105 group-hover:rotate-2">
                        <div className="transition-transform duration-300 group-hover:scale-105">
                          {feature.icon}
                        </div>
                      </div>
                      
                      {/* Feature Title */}
                      <h3 className="relative z-10 font-heading font-bold text-xl md:text-lg sm:text-base text-dark mb-3 md:mb-2 sm:mb-2 leading-tight transition-colors duration-300 group-hover:text-primary-500">
                        {feature.title}
                      </h3>
                      
                      {/* Feature Description */}
                      <p className="relative z-10 text-grayish text-base md:text-sm sm:text-sm leading-relaxed font-medium transition-colors duration-300 group-hover:text-dark-light">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                  
                </div>
              </div>
              
              {/* Show More Button */}
              <div className="mt-6 md:hidden sm:hidden text-center">
                <button 
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-2 py-2 bg-transparent text-grayish border-none text-sm font-normal cursor-pointer transition-colors duration-200 hover:text-primary-500 active:text-primary-600"
                >
                  <span>
                    {isScrolled ? 'See Our Core Features' : 'Discover What Makes Us Different'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isScrolled ? 'rotate-180' : ''
                    }`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
