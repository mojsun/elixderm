"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-section') as HTMLElement;
      const heroHeight = hero?.offsetHeight || 0;
      
      if (scrolled < heroHeight) {
        const heroVideo = document.querySelector('.hero-video') as HTMLElement;
        const videoOverlay = document.querySelector('.video-overlay') as HTMLElement;
        
        if (heroVideo) {
          // Subtle parallax effect for video
          const videoSpeed = 0.3;
          heroVideo.style.transform = `translate(-50%, -50%) translateY(${scrolled * videoSpeed}px)`;
        }
        
        if (videoOverlay) {
          // Increase overlay opacity as user scrolls
          const overlayOpacity = Math.min(0.8, 0.3 + (scrolled / heroHeight) * 0.5);
          videoOverlay.style.opacity = overlayOpacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set loaded class for animations
    document.body.classList.add('loaded');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden" style={{ minHeight: '80vh', margin: '0 2rem', borderRadius: '0 0 2rem 2rem' }}>
      {/* Background Video */}
      <div className="hero-background absolute inset-0 pointer-events-none z-[1]">
        <video
          className="hero-video absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover z-[1]"
          style={{ transform: 'translate(-50%, -50%)' }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/leaf-elix.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          className="video-overlay absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.35) 0%, 
              rgba(16, 185, 129, 0.20) 25%,
              rgba(0, 0, 0, 0.40) 50%,
              rgba(16, 185, 129, 0.15) 75%,
              rgba(0, 0, 0, 0.35) 100%
            )`,
            backdropFilter: 'blur(1px)'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="hero-container relative z-[3] max-w-[1200px] mx-auto px-8 text-center">
        <div className="hero-content max-w-[900px] mx-auto">
          <h1 className="hero-title font-heading font-bold text-white" 
              style={{ 
                fontSize: 'clamp(1.91rem, 3.8vw, 3.06rem)',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
            <span className="title-line block opacity-0 transform translate-y-[50px] animate-title-reveal-1"
                  style={{ color: 'white' }}>
              For the beauty brands thinking bigger{' '}
            </span>
            <span className="title-line highlight block opacity-0 transform translate-y-[50px] animate-title-reveal-2"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                    textShadow: 'none'
                  }}>
              we manufacture what others won't.
            </span>
          </h1>

          <p className="hero-subtitle font-medium max-w-[700px] mx-auto opacity-0 transform translate-y-[30px] animate-subtitle-reveal"
             style={{
               fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
               lineHeight: '1.6',
               color: '#e5e7eb',
               marginBottom: '2.5rem',
               textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
               fontWeight: '500',
               textAlign: 'center'
             }}>
            Boutique manufacturing for indie beauty brands. Low MOQs, transparent pricing, and flexible production.
          </p>

          <div className="hero-cta opacity-0 transform translate-y-[30px] animate-cta-reveal">
            <Link
              href="/contact-us"
              className="cta-primary group relative inline-flex items-center text-white no-underline rounded-full font-semibold overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 active:-translate-y-0.5"
              style={{
                gap: '0.75rem',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
              }}
            >
                              <span className="cta-text relative z-10">Let's Start</span>
              <div 
                className="cta-ripple absolute top-1/2 left-1/2 w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  transition: 'width 0.6s ease, height 0.6s ease'
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-scroll-reveal z-[3]"
           style={{ 
             bottom: '0.5rem',
             gap: '0.25rem',
             color: 'rgba(209, 213, 219, 0.6)'
           }}>
        <div 
          className="scroll-line animate-scroll-line-move"
          style={{
            width: '1px',
            height: '20px',
            background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.4), transparent)'
          }}
        />
        <span className="scroll-text"
              style={{
                fontSize: '0.7rem',
                fontWeight: '400',
                letterSpacing: '0.3px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                opacity: '0.8'
              }}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
