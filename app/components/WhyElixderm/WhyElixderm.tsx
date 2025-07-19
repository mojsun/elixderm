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
      className="why-different-section relative overflow-hidden py-24 w-full"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
            <div className="why-different-container mx-auto px-8">
        <div className="w-full max-w-full">
          <div className="why-different-content grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          
          {/* Left Content */}
          <div className="why-different-left lg:sticky lg:top-24">
            <h2 className="why-different-title font-heading font-bold mb-8 leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              Why Elixderm is Different
            </h2>
            <p className="why-different-intro text-grayish text-xl leading-relaxed max-w-lg font-normal">
              While other manufacturers focus on volume and standardization, we&apos;ve built our entire operation around flexibility, transparency, and genuine partnership. Here&apos;s what sets us apart in the beauty manufacturing landscape.
            </p>
          </div>
          
          {/* Right Content */}
          <div className="why-different-right w-full">
            
            {/* Features Container */}
            <div className="features-container relative overflow-hidden mt-8"
                 style={{ height: '520px' }}>
              <div className={`features-grid grid grid-cols-2 gap-8 relative transition-transform duration-800 ease-out ${
                isScrolled ? 'features-scrolled' : ''
              }`}
                   style={{ 
                     height: '780px',
                     transform: isScrolled ? 'translateY(-272px)' : 'translateY(0)'
                   }}>
                
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`feature-card relative overflow-hidden rounded-2xl p-8 transition-all duration-600 ease-out opacity-0 translate-y-8 ${
                      index >= 4 ? 'feature-card-hidden' : ''
                    }`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(16, 185, 129, 0.1)',
                      height: '240px',
                      gridColumn: index % 2 === 0 ? '1' : '2',
                      gridRow: Math.floor(index / 2) + 1
                    }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                         style={{
                           background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(5, 150, 105, 0.02) 100%)'
                         }} />
                    
                    {/* Feature Icon */}
                    <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white transition-all duration-300 ease-out"
                         style={{
                           background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                         }}>
                      {feature.icon}
                    </div>
                    
                    {/* Feature Title */}
                    <h3 className="feature-title font-heading font-bold text-xl text-dark mb-3 leading-tight transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Feature Description */}
                    <p className="feature-description text-grayish text-base leading-relaxed font-medium transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
                
              </div>
            </div>
            
            {/* Show More Button */}
            <div className="show-more-container mt-6 text-center">
              <button 
                onClick={handleShowMore}
                className="show-more-btn inline-flex items-center gap-2 py-2 bg-transparent text-grayish border-none text-sm font-normal cursor-pointer transition-colors duration-200 hover:text-primary active:text-secondary"
              >
                <span className="show-more-text">
                  {isScrolled ? 'See Our Core Features' : 'Discover What Makes Us Different'}
                </span>
                <svg 
                  className={`show-more-icon w-4 h-4 transition-transform duration-200 ${
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
