"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from './HowItWorks.module.css';

export default function HowItWorks(): React.JSX.Element {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isContentReady, setIsContentReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef(0);
  const wheelAccumulator = useRef(0);
  const isScrollLocked = useRef(false);
  
  const steps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      description: "We start with a comprehensive consultation to understand your vision, target market, and specific requirements. Our team analyzes your needs and provides expert guidance on formulation possibilities, packaging options, and regulatory considerations.",
      media: {
        type: "video" as const,
        src: "/videos/discovery.mp4"
      }
    },
    {
      number: "02", 
      title: "Formula Development",
      description: "Our chemists create custom formulations tailored to your specifications. We develop prototypes, conduct stability testing, and refine the formula until it meets your exact requirements for performance, texture, and shelf life.",
      media: {
        type: "image" as const,
        src: "/images/formula-development.png",
        alt: "Formula Development Process"
      }
    },
    {
      number: "03",
      title: "Sample & Testing", 
      description: "We produce samples for your review and testing. You'll receive physical samples to evaluate texture, performance, and user experience. We iterate based on your feedback until the formulation is perfect.",
      media: {
        type: "video" as const,
        src: "/videos/testing-video.mp4"
      }
    },
    {
      number: "04",
      title: "Design & Packaging",
      description: "Our design team creates stunning packaging that reflects your brand identity. We handle everything from container selection to label design, ensuring your products stand out on shelves and online.",
      media: {
        type: "video" as const, 
        src: "/videos/design.mp4"
      }
    },
    {
      number: "05",
      title: "Production & Delivery",
      description: "We manufacture your products with precision and care, maintaining strict quality control throughout the process. Your finished products are carefully packaged and delivered ready for market launch.",
      media: {
        type: "video" as const,
        src: "/videos/packaging.mp4"
      }
    }
  ];

  const handleStepChange = useCallback((newIndex: number) => {
    if (newIndex === currentStepIndex || isScrollLocked.current) return;
    
    isScrollLocked.current = true;
    setIsScrolling(true);
    setCurrentStepIndex(newIndex);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set scrolling to false after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      isScrollLocked.current = false;
      wheelAccumulator.current = 0;
    }, 1200);
  }, [currentStepIndex]);

  // Handle wheel events for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !isInView) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.2;
      const isInSection = rect.top < threshold && rect.bottom > window.innerHeight - threshold;
      
      if (!isInSection) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Accumulate wheel delta for better detection of user intent
      wheelAccumulator.current += e.deltaY;
      
      // Require minimum scroll amount to trigger change
      const scrollThreshold = 50;
      if (Math.abs(wheelAccumulator.current) < scrollThreshold) return;
      
      if (isScrollLocked.current) return;
      
      const direction = wheelAccumulator.current > 0 ? 1 : -1;
      const newIndex = currentStepIndex + direction;
      
      if (newIndex >= 0 && newIndex < steps.length) {
        handleStepChange(newIndex);
        setScrollDirection(direction > 0 ? 'down' : 'up');
      } else if (newIndex >= steps.length || newIndex < 0) {
        // Exit the section
        isScrollLocked.current = true;
        setTimeout(() => {
          if (newIndex >= steps.length) {
            const nextSection = sectionRef.current?.nextElementSibling;
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            const prevSection = sectionRef.current?.previousElementSibling;
            if (prevSection) {
              prevSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }
          setTimeout(() => {
            isScrollLocked.current = false;
            wheelAccumulator.current = 0;
          }, 800);
        }, 100);
      }
    };

    // Add listener to window to catch all wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [currentStepIndex, isInView, handleStepChange, steps.length]);

  // Handle touch events for mobile with better tap detection
  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current || !isInView) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.2;
      const isInSection = rect.top < threshold && rect.bottom > window.innerHeight - threshold;
      
      if (isInSection) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!sectionRef.current || !isInView) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.2;
      const isInSection = rect.top < threshold && rect.bottom > window.innerHeight - threshold;
      
      if (!isInSection) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const touchDuration = Date.now() - touchStartTime;
      const now = Date.now();
      
      // Prevent double tap issues
      if (now - lastTouchEnd < 300) return;
      lastTouchEnd = now;
      
      // For tap-like scrolls (quick, small movements)
      const isTap = touchDuration < 300 && Math.abs(diff) < 30;
      
      // For swipe gestures
      const velocity = Math.abs(diff) / touchDuration;
      const isSwipe = Math.abs(diff) > 50 && velocity > 0.3;
      
      if (!isTap && !isSwipe) return;
      
      if (isScrollLocked.current) return;
      
      e.preventDefault();
      
      // Determine direction
      let direction = 0;
      if (isTap) {
        // For taps, check which half of screen was tapped
        const screenMidpoint = window.innerHeight / 2;
        direction = touchEndY > screenMidpoint ? 1 : -1;
      } else {
        // For swipes, use the swipe direction
        direction = diff > 0 ? 1 : -1;
      }
      
      const newIndex = currentStepIndex + direction;
      
      if (newIndex >= 0 && newIndex < steps.length) {
        handleStepChange(newIndex);
        setScrollDirection(direction > 0 ? 'down' : 'up');
      } else if (newIndex >= steps.length || newIndex < 0) {
        // Allow exit from section
        isScrollLocked.current = true;
        setTimeout(() => {
          if (newIndex >= steps.length) {
            const nextSection = sectionRef.current?.nextElementSibling;
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            const prevSection = sectionRef.current?.previousElementSibling;
            if (prevSection) {
              prevSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }
          setTimeout(() => {
            isScrollLocked.current = false;
          }, 800);
        }, 100);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentStepIndex, isInView, handleStepChange, steps.length]);

  // Track if the section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.1;
          setIsInView(inView);
          if (inView && !isContentReady) {
            // Delay interaction to ensure content is loaded
            setTimeout(() => setIsContentReady(true), 500);
          } else if (!inView) {
            setIsContentReady(false);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isContentReady]);

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <section 
      ref={sectionRef}
      id="how-it-works-section" 
      className={styles.section}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className="how-it-works-left">
            <h2 className={`${styles.title} font-heading font-extrabold leading-tight`}>
              How it Works
            </h2>
          </div>
          
          <div className="how-it-works-right">
            <p className={`${styles.subtitle} text-xl text-grayish leading-relaxed font-medium`}>
              Our streamlined process takes you from concept to market-ready product in just 5 simple steps. 
              Each phase is designed to maximize quality while minimizing complexity and timeline.
            </p>
          </div>
        </div>

        {/* Minimalist Progress Bar */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Steps Container */}
        <div ref={containerRef} className={styles.stepsContainer}>
          <div className={styles.stepsWrapper}>
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`${styles.step} ${index === currentStepIndex ? styles.stepActive : ''} ${scrollDirection ? styles[`step${scrollDirection === 'down' ? 'Next' : 'Prev'}`] : ''}`}
                style={{
                  transform: `translateY(${(index - currentStepIndex) * 100}%)`,
                  opacity: index === currentStepIndex ? 1 : 0,
                  pointerEvents: index === currentStepIndex ? 'auto' : 'none'
                }}
              >
                <div className={styles.stepContent}>
                
                {/* Step Info */}
                <div className={`${styles.stepInfo}`}>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepNumber}>
                      {step.number}
                    </div>
                    <h3 className={styles.stepTitle}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>
                </div>

                {/* Step Visual */}
                <div className={styles.stepImageContainer}>
                  {step.media.type === 'video' ? (
                    <video 
                      key={step.media.src}
                      className={styles.stepImage}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src={step.media.src} type="video/mp4" />
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <p className="text-gray-500">Video: {step.title}</p>
                      </div>
                    </video>
                  ) : (
                    <img 
                      key={step.media.src}
                      src={step.media.src} 
                      alt={step.media.alt || step.title} 
                      className={styles.stepImage}
                      loading="lazy"
                    />
                  )}
                </div>
                
              </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
