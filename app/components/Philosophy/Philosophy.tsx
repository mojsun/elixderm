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
      className="relative flex items-center justify-center overflow-hidden py-8 h-[50vh] md:h-[40vh] sm:h-[35vh] bg-gradient-to-br from-light-DEFAULT to-light-gray md:py-6 sm:py-4"
    >
      <div className="w-full h-full flex items-center justify-center max-w-[95%] lg:max-w-full mx-auto px-8 md:px-6 sm:px-4">
        <div className="text-center w-full mx-auto relative flex flex-col items-center justify-center h-[300px] md:h-[250px] sm:h-[200px]">
          
          {/* Philosophy Title */}
          <h2 className="font-heading font-semibold text-grayish transition-all duration-[600ms] ease-in-out text-[clamp(1.8rem,3vw,2.5rem)] md:text-[clamp(1.5rem,4vw,2rem)] leading-[1.2] tracking-[-0.01em] mb-12 md:mb-8 sm:mb-6">
            Your Manufacturing Partner
          </h2>
          
          {/* Philosophy Values */}
          <div className="relative w-full flex items-center justify-center h-[120px] md:h-[100px] sm:h-[80px]">
            {philosophyValues.map((text, index) => (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full transition-all duration-[600ms] cubic-bezier(0.4, 0, 0.2, 1) ${
                  index === currentIndex 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}
                data-index={index}
              >
                <span className="relative font-[800] text-center whitespace-nowrap md:whitespace-normal lg:whitespace-normal leading-none transition-transform duration-300 ease-in-out hover:scale-[1.02] text-[clamp(2.5rem,5vw,4rem)] lg:text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(1.8rem,7vw,2.8rem)] sm:text-[clamp(1.5rem,8vw,2.5rem)] leading-[1.1] md:leading-[1.2] sm:leading-[1.3] tracking-[-0.02em] bg-gradient-to-r from-dark-DEFAULT via-dark-light to-dark-DEFAULT bg-clip-text text-transparent font-heading"
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      }}>
                  {text}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 opacity-60 w-[60px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                </span>
              </div>
            ))}
          </div>
          
          {/* Scroll Instruction */}
          <div className="absolute bottom-4 md:bottom-2 sm:bottom-2 left-1/2 transform -translate-x-1/2 text-grayish-light font-medium opacity-80 text-[0.85rem] md:text-xs animate-pulse">
            Scroll to explore our advantages
          </div>
          
        </div>
      </div>
    </section>
  );
}
