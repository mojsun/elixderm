"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export default function HowItWorks(): React.JSX.Element {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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

  const maxStepIndex = steps.length - 1;

  const updateActiveStep = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex > maxStepIndex || newIndex === currentStepIndex) {
      if (newIndex < 0 || newIndex > maxStepIndex) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        if (sectionRef.current) {
          sectionRef.current.classList.remove('scroll-active');
        }
        return false;
      }
      return false;
    }
    
    setCurrentStepIndex(newIndex);
    return true;
  }, [maxStepIndex, currentStepIndex]);

  const handleHowItWorksScroll = useCallback((event: WheelEvent) => {
    if (!isScrolling) return;
    
    const delta = event.deltaY;
    let success = false;
    
    if (delta > 0) {
      // Scroll down - next step
      success = updateActiveStep(currentStepIndex + 1);
      
      if (!success && currentStepIndex === maxStepIndex) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        if (sectionRef.current) {
          sectionRef.current.classList.remove('scroll-active');
        }
        setTimeout(() => {
          window.scrollBy(0, 100);
        }, 50);
      }
    } else {
      // Scroll up - previous step
      success = updateActiveStep(currentStepIndex - 1);
      
      if (!success && currentStepIndex === 0) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        if (sectionRef.current) {
          sectionRef.current.classList.remove('scroll-active');
        }
        setTimeout(() => {
          window.scrollBy(0, -100);
        }, 50);
      }
    }
    
    if (success) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [isScrolling, updateActiveStep, currentStepIndex, maxStepIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            setIsScrolling(true);
            document.body.style.overflow = 'hidden';
            section.classList.add('scroll-active');
            window.addEventListener('wheel', handleHowItWorksScroll, { passive: false });
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.7) {
            setIsScrolling(false);
            document.body.style.overflow = 'auto';
            section.classList.remove('scroll-active');
            window.removeEventListener('wheel', handleHowItWorksScroll);
          }
        });
      },
      {
        threshold: [0.3, 0.6, 0.7, 0.8, 0.9],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    observer.observe(section);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrolling) return;
      
      let success = false;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        success = updateActiveStep(currentStepIndex + 1);
        if (success) e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        success = updateActiveStep(currentStepIndex - 1);
        if (success) e.preventDefault();
      }
      
      if (!success) {
        setIsScrolling(false);
        document.body.style.overflow = 'auto';
        section.classList.remove('scroll-active');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleHowItWorksScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentStepIndex, isScrolling, maxStepIndex, handleHowItWorksScroll, updateActiveStep]);

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <section 
      ref={sectionRef}
      id="how-it-works-section" 
      className="relative w-full overflow-hidden py-32 md:py-16 sm:py-12 min-h-screen flex justify-center items-center bg-gradient-to-br from-light-DEFAULT to-light-darker"
    >
      <div className="mx-auto px-8 md:px-6 sm:px-4 max-w-[1400px] w-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-16 md:gap-12 sm:gap-8 mb-4 md:mb-6 sm:mb-8 items-start">
          <div>
            <h2 className="font-heading font-extrabold leading-tight text-[4rem] md:text-[3rem] sm:text-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-600 bg-clip-text text-transparent m-0">
              How it Works
            </h2>
          </div>
          
          <div>
            <p className="text-xl md:text-lg sm:text-base text-grayish leading-relaxed font-medium m-0">
              Our streamlined process takes you from concept to market-ready product in just 5 simple steps. 
              Each phase is designed to maximize quality while minimizing complexity and timeline.
            </p>
          </div>
        </div>

        {/* Steps Container */}
        <div className="relative mt-25 md:mt-16 sm:mt-12 min-h-[60vh] md:min-h-0 sm:min-h-0 overflow-visible">
          
          {/* Show only current step */}
          <div className="relative w-full min-h-[400px] md:min-h-0 sm:min-h-0 opacity-100 translate-y-0 pointer-events-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-16 md:gap-12 sm:gap-8 h-full items-center">
              
              {/* Step Info */}
              <div className="p-8 md:p-6 sm:p-4">
                <div className="inline-block mb-4 md:mb-3 sm:mb-2 px-4 py-2 md:px-3 md:py-1.5 sm:px-2 sm:py-1 bg-primary-100/50 text-primary-500 rounded-xl tracking-[0.1em] text-lg md:text-base sm:text-sm font-bold">
                  {steps[currentStepIndex].number}
                </div>
                
                <h3 className="font-heading font-bold text-dark leading-tight mb-6 md:mb-4 sm:mb-3 text-[2.5rem] md:text-[2rem] sm:text-[1.75rem] m-0">
                  {steps[currentStepIndex].title}
                </h3>
                
                <p className="text-lg md:text-base sm:text-sm text-grayish leading-relaxed font-medium mb-8 md:mb-6 sm:mb-4 m-0">
                  {steps[currentStepIndex].description}
                </p>
              </div>

              {/* Step Visual */}
              <div className="flex items-center justify-center h-full p-8 md:p-6 sm:p-4">
                <div className="w-full h-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 md:hover:scale-102 sm:hover:scale-[1.01] bg-gray-50 rounded-3xl min-h-[300px] md:min-h-[250px] sm:min-h-[200px]">
                  {steps[currentStepIndex].media.type === 'video' ? (
                    <video 
                      className="w-full h-auto rounded-3xl transition-all duration-300 shadow-lg bg-white max-h-[400px] md:max-h-[300px] sm:max-h-[250px] object-cover"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      onError={(e) => console.error('Video failed to load:', steps[currentStepIndex].media.src, e)}
                      onLoadStart={() => console.log('Video loading started:', steps[currentStepIndex].media.src)}
                    >
                      <source src={steps[currentStepIndex].media.src} type="video/mp4" />
                      <div className="flex items-center justify-center h-64 md:h-48 sm:h-40 bg-gray-200 rounded-3xl">
                        <p className="text-gray-500 text-sm md:text-xs">Video: {steps[currentStepIndex].title}</p>
                      </div>
                    </video>
                  ) : (
                    <img 
                      src={steps[currentStepIndex].media.src} 
                      alt={steps[currentStepIndex].media.alt || steps[currentStepIndex].title} 
                      className="w-full h-auto rounded-3xl transition-all duration-300 shadow-lg bg-white max-h-[400px] md:max-h-[300px] sm:max-h-[250px] object-cover"
                      loading="lazy"
                      onError={(e) => console.error('Image failed to load:', steps[currentStepIndex].media.src, e)}
                      onLoad={() => console.log('Image loaded:', steps[currentStepIndex].media.src)}
                    />
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Scroll Instruction */}
        <div className="scroll-instruction fixed bottom-8 md:bottom-6 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-center text-grayish text-sm md:text-xs font-medium z-[100] opacity-0 invisible transition-all duration-300 px-8 md:px-6 sm:px-4 py-4 md:py-3 sm:py-2 rounded-full bg-white/90 backdrop-blur-[10px] border border-black/10">
          <span>Scroll to explore each step</span>
          <div className="w-25 md:w-20 sm:w-16 h-1 mx-auto mt-2 md:mt-1.5 sm:mt-1 rounded-full overflow-hidden bg-primary-200/50">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
