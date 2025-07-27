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
    <section className="hero-section relative flex items-center justify-center overflow-hidden min-h-[80vh] md:min-h-[70vh] sm:min-h-[65vh] mx-8 md:mx-6 sm:mx-6 rounded-b-[2rem] py-8 md:py-8 sm:py-0">
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <video
          className="hero-video absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover z-[1] will-change-transform"
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
          className="video-overlay absolute inset-0 z-[2] backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.35) 0%, 
              rgba(16, 185, 129, 0.20) 25%,
              rgba(0, 0, 0, 0.40) 50%,
              rgba(16, 185, 129, 0.15) 75%,
              rgba(0, 0, 0, 0.35) 100%
            )`
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-[3] max-w-[1200px] mx-auto px-8 md:px-6 sm:px-6 text-center">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-heading font-bold text-white mb-6 md:mb-5 sm:mb-5 text-[clamp(1.91rem,3.8vw,3.06rem)] leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            <span className="block opacity-0 translate-y-[50px] animate-title-reveal-1 text-white">
              For the beauty brands thinking bigger{' '}
            </span>
            <span className="block opacity-0 translate-y-[50px] animate-title-reveal-2 bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
                  }}>
              we manufacture what others won&apos;t.
            </span>
          </h1>

          <p className="font-medium text-[clamp(1.1rem,2vw,1.3rem)] leading-relaxed text-gray-200 mb-10 md:mb-8 sm:mb-8 font-medium text-center max-w-[700px] mx-auto opacity-0 translate-y-[30px] animate-subtitle-reveal drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Boutique manufacturing for indie beauty brands. Low MOQs, transparent pricing, and flexible production.
          </p>

          <div className="opacity-0 translate-y-[30px] animate-cta-reveal">
            <Link
              href="/contact-us"
                             className="group relative inline-flex items-center text-white no-underline rounded-full font-semibold overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 md:hover:-translate-y-0.5 sm:hover:-translate-y-0.5 active:-translate-y-0.5 gap-3 md:gap-2 sm:gap-2 px-8 md:px-7 sm:px-6 py-4 md:py-[14px] sm:py-3 text-lg md:text-base sm:text-base font-semibold bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300"
            >
              <span className="relative z-10">Let&apos;s Start</span>
              <div
                className="cta-ripple absolute top-1/2 left-1/2 w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white/20 transition-all duration-500 group-hover:w-[300px] group-hover:h-[300px]"
              />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
                 <div className="absolute bottom-8 md:bottom-2 sm:bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-scroll-reveal">
          <div className="text-white/60 text-sm mb-2 font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-line-move"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
