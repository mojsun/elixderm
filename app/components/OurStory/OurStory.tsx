"use client";

import React, { useEffect } from "react";

const OurStorySection: React.FC = () => {
  useEffect(() => {
    const storyFeatureCards = document.querySelectorAll('.story-feature-card');
    
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });
    
    storyFeatureCards.forEach(card => {
      storyObserver.observe(card);
    });

    return () => {
      storyObserver.disconnect();
    };
  }, []);
  const storyFeatures = [
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>,
      title: "Science-First Foundation",
      description: "Founded by PhD scientists with 15+ years in pharmaceutical development, bringing clinical precision to beauty"
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>,
      title: "Boutique Approach",
      description: "Personalized manufacturing partnerships, not mass production. Every client gets dedicated attention and custom solutions"
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>,
      title: "Transparency First",
      description: "Clear processes, honest pricing, and open communication. No hidden fees, no surprises—just genuine partnership"
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L13.09 8.26L22 9L17 14L18.18 23L12 19.77L5.82 23L7 14L2 9L10.91 8.26L12 2Z"/>
      </svg>,
      title: "Innovation-Driven",
      description: "Combining cutting-edge formulation science with entrepreneurial flexibility to create breakthrough beauty products"
    }
  ];

  return (
    <section 
      className="why-different-section section-padding"
      style={{
        padding: '6rem 0',
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
                Our Story
              </h2>
              <p className="why-different-intro text-grayish text-xl leading-relaxed max-w-lg font-normal">
                Elixderm was born from a simple observation: most beauty manufacturers operate like factories, 
                prioritizing volume over vision. As scientists and entrepreneurs ourselves, we knew there was a better way 
                to bridge the gap between complex chemistry and market success.
              </p>
            </div>
            
                         {/* Right Content */}
             <div className="why-different-right w-full">
               <div className="features-container relative mt-8" style={{ height: 'auto', overflow: 'visible' }}>
                 <div className="features-grid grid grid-cols-2 gap-8 relative">
                  {storyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="feature-card story-feature-card relative overflow-hidden rounded-2xl p-8 transition-all duration-600 ease-out opacity-0 translate-y-8"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(16, 185, 129, 0.1)',
                        height: '240px'
                      }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                           style={{
                             background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(5, 150, 105, 0.02) 100%)'
                           }} />
                      
                                             {/* Feature Icon */}
                       <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ease-out"
                            style={{
                              background: 'linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%)',
                              marginBottom: '2rem'
                            }}>
                         {feature.icon}
                       </div>
                      
                      {/* Content */}
                      <div className="feature-content relative z-10">
                        <h3 className="feature-title font-heading font-semibold text-lg text-grayish-dark mb-3 leading-tight">
                          {feature.title}
                        </h3>
                        <p className="feature-description text-grayish text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection; 