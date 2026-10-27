"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AutoplayVideo from "../AutoplayVideo/AutoplayVideo";
import styles from './HowItWorks.module.css';

const steps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description: "We start with a comprehensive consultation to understand your vision, target market, and specific requirements. Our team analyzes your needs and provides expert guidance on formulation possibilities, packaging options, and regulatory considerations.",
    media: {
      type: "video" as const,
      src: "/videos/discovery.mp4",
      poster: "/videos/discovery-poster.webp"
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
      src: "/videos/testing-video.mp4",
      poster: "/videos/testing-video-poster.webp"
    }
  },
  {
    number: "04",
    title: "Design & Packaging",
    description: "Our design team creates stunning packaging that reflects your brand identity. We handle everything from container selection to label design, ensuring your products stand out on shelves and online.",
    media: {
      type: "video" as const,
      src: "/videos/design.mp4",
      poster: "/videos/design-poster.webp"
    }
  },
  {
    number: "05",
    title: "Production & Delivery",
    description: "We manufacture your products with precision and care, maintaining strict quality control throughout the process. Your finished products are carefully packaged and delivered ready for market launch.",
    media: {
      type: "video" as const,
      src: "/videos/packaging.mp4",
      poster: "/videos/packaging-poster.webp"
    }
  }
];

export default function HowItWorks(): React.JSX.Element {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepIndexRef = useRef(0);

  // The steps panel sticks below the navbar while the page scrolls through
  // the taller track, and the step shown follows how far through it the
  // visitor is. The page itself always scrolls normally.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = track.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-top / scrollable, 0), 1) : 0;
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      if (index === stepIndexRef.current) return;
      setScrollDirection(index > stepIndexRef.current ? 'down' : 'up');
      stepIndexRef.current = index;
      setCurrentStepIndex(index);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section id="how-it-works-section" className={styles.section}>
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

        <div
          ref={trackRef}
          className={styles.track}
          style={{ '--step-count': steps.length } as React.CSSProperties}
        >
          <div className={styles.panel}>
            {/* Minimalist Progress Bar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Steps Container */}
            <div className={styles.stepsContainer}>
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
                        <AutoplayVideo
                          src={step.media.src}
                          poster={step.media.poster}
                          className={styles.stepImage}
                          active={index === currentStepIndex}
                        />
                      ) : (
                        <Image
                          src={step.media.src}
                          alt={step.media.alt || step.title}
                          width={1024}
                          height={1024}
                          sizes="(max-width: 768px) 320px, 600px"
                          className={styles.stepImage}
                        />
                      )}
                    </div>

                  </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
