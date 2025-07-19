"use client";

import React, { useEffect, useRef, useState } from "react";

export default function PhilosophySection(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const philosophyValues = [
    "Strict confidentiality guaranteed",
    "Unique formulations advantage", 
    "Amazon launch support",
    "Competitive edge secured",
  ];

  const maxIndex = philosophyValues.length - 1;

  const updateActiveValue = (newIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (newIndex < 0 || newIndex > maxIndex || newIndex === currentIndex) {
      if (newIndex < 0 || newIndex > maxIndex) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        return false;
      }
      return false;
    }
    
    setCurrentIndex(newIndex);
    return true;
  };

  const handlePhilosophyScroll = (event: WheelEvent) => {
    if (!isScrolling) return;
    
    const delta = event.deltaY;
    let success = false;
    
    if (delta > 0) {
      // Scroll down - next value
      success = updateActiveValue(currentIndex + 1, 'next');
      
      if (!success && currentIndex === maxIndex) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        setTimeout(() => {
          window.scrollBy(0, 100);
        }, 50);
      }
    } else {
      // Scroll up - previous value
      success = updateActiveValue(currentIndex - 1, 'prev');
      
      if (!success && currentIndex === 0) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        setTimeout(() => {
          window.scrollBy(0, -100);
        }, 50);
      }
    }
    
    if (success) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setIsScrolling(true);
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', handlePhilosophyScroll, { passive: false });
          } else if (!entry.isIntersecting) {
            setIsScrolling(false);
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', handlePhilosophyScroll);
          }
        });
      },
      {
        threshold: [0.3, 0.6, 0.8],
        rootMargin: '-5% 0px -5% 0px',
      }
    );

    observer.observe(section);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrolling) return;
      
      let success = false;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        success = updateActiveValue(currentIndex + 1, 'next');
        if (success) e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        success = updateActiveValue(currentIndex - 1, 'prev');
        if (success) e.preventDefault();
      }
      
      if (!success) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handlePhilosophyScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, isScrolling, maxIndex]);

  return (
    <section 
      ref={sectionRef}
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
            Your Manufacturing Partner
          </h2>
          
          {/* Philosophy Values */}
          <div className="philosophy-values relative w-full flex items-center justify-center" style={{ height: '120px' }}>
            {philosophyValues.map((text, index) => (
              <div
                key={index}
                className={`philosophy-value absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full ${
                  index === currentIndex 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                data-index={index}
              >
                <span className="value-text relative font-bold text-center whitespace-nowrap leading-none transition-transform duration-300 ease-in-out hover:scale-102"
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                  {text}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 opacity-60"
                       style={{
                         width: '60px',
                         background: 'linear-gradient(90deg, transparent, #10b981, transparent)'
                       }} />
                </span>
              </div>
            ))}
          </div>
          
          {/* Scroll Instruction */}
          <div className="scroll-instruction absolute left-1/2 transform -translate-x-1/2 text-grayish-light font-medium opacity-80"
               style={{
                 bottom: '1rem',
                 fontSize: '0.85rem',
                 animation: 'fade-pulse 2s ease-in-out infinite'
               }}>
            Scroll to explore our advantages
          </div>
          
        </div>
      </div>
    </section>
  );
}
