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
      className="how-it-works-section relative w-full overflow-hidden py-32"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <div className="how-it-works-container mx-auto px-8" style={{ maxWidth: '1400px' }}>
        
        {/* Header */}
        <div className="how-it-works-header grid grid-cols-1 lg:grid-cols-2 gap-16 mb-4 items-start">
          <div className="how-it-works-left">
            <h2 className="how-it-works-title font-heading font-extrabold leading-tight"
                style={{
                  fontSize: '4rem',
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              How it Works
            </h2>
          </div>
          
          <div className="how-it-works-right">
            <p className="how-it-works-subtitle text-xl text-grayish leading-relaxed font-medium">
              Our streamlined process takes you from concept to market-ready product in just 5 simple steps. 
              Each phase is designed to maximize quality while minimizing complexity and timeline.
            </p>
          </div>
        </div>

                {/* Steps Container */}
        <div className="how-it-works-steps relative mt-25" style={{ minHeight: '60vh' }}>
          
          {/* Show only current step */}
          <div className="step-item w-full h-full">
            <div className="step-content grid grid-cols-1 lg:grid-cols-2 gap-16 h-full items-center">
              
              {/* Step Info */}
              <div className="step-info p-8">
                                                                <div className="step-number w-10 h-10 flex items-center justify-center font-bold text-lg rounded-full mb-4 flex-shrink-0"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                       letterSpacing: '0.1em'
                     }}>
                  {steps[currentStepIndex].number}
                </div>
                
                <h3 className="step-title font-heading font-bold text-dark leading-tight mb-6"
                    style={{ fontSize: '2.5rem' }}>
                  {steps[currentStepIndex].title}
                </h3>
                
                <p className="step-description text-lg text-grayish leading-relaxed font-medium mb-8">
                  {steps[currentStepIndex].description}
                </p>
              </div>

              {/* Step Visual */}
              <div className="step-visual flex items-center justify-center h-full p-8">
                <div className="step-image-container w-full h-auto flex items-center justify-center transition-transform duration-300 hover:scale-105 bg-gray-50 rounded-3xl" style={{ minHeight: '300px' }}>
                  {steps[currentStepIndex].media.type === 'video' ? (
                    <video 
                      className="step-image w-full h-auto rounded-3xl transition-all duration-300 shadow-lg bg-white"
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover'
                      }}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      onError={(e) => console.error('Video failed to load:', steps[currentStepIndex].media.src, e)}
                      onLoadStart={() => console.log('Video loading started:', steps[currentStepIndex].media.src)}
                    >
                      <source src={steps[currentStepIndex].media.src} type="video/mp4" />
                      <div className="flex items-center justify-center h-64 bg-gray-200 rounded-3xl">
                        <p className="text-gray-500">Video: {steps[currentStepIndex].title}</p>
                      </div>
                    </video>
                  ) : (
                    <img 
                      src={steps[currentStepIndex].media.src} 
                      alt={steps[currentStepIndex].media.alt || steps[currentStepIndex].title} 
                      className="step-image w-full h-auto rounded-3xl transition-all duration-300 shadow-lg bg-white"
                      style={{
                        maxHeight: '400px',
                        objectFit: 'cover'
                      }}
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
        <div className="scroll-instruction fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center text-grayish text-sm font-medium z-50 opacity-0 invisible transition-all duration-300 px-8 py-4 rounded-full"
             style={{
               background: 'rgba(255, 255, 255, 0.9)',
               backdropFilter: 'blur(10px)',
               border: '1px solid rgba(0, 0, 0, 0.1)'
             }}>
          <span>Scroll to explore each step</span>
          <div className="scroll-progress w-25 h-1 mx-auto mt-2 rounded-full overflow-hidden"
               style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
            <div 
              className="scroll-progress-bar h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
