"use client";

import React, { useState } from "react";
import styles from "./FeatureSection.module.css";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title: string;
  description: string;
  features: Feature[];
  className?: string;
  enableAnimation?: boolean; // For WhyElixderm's scroll animation
  animationHeight?: string;
  maxInitialCards?: number; // How many cards to show initially before animation
}

export default function FeatureSection({
  title,
  description,
  features,
  className = "",
  enableAnimation = false,
  animationHeight = "600px",
  maxInitialCards = 4
}: FeatureSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    if (enableAnimation) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          {/* Left Content - Title & Description */}
          <div className={`${styles.leftContent} ${enableAnimation ? styles.sticky : ''}`}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>
          
          {/* Right Content - Features */}
          <div className={styles.rightContent}>
            
            {enableAnimation ? (
              // Animated version for WhyElixderm
              <div className={styles.featuresContainer} style={{ height: animationHeight }}>
                <div 
                  className={`${styles.featuresGrid} ${isExpanded ? styles.featuresExpanded : ''}`}
                  style={{ 
                    height: `${Math.ceil(features.length / 2) * 240 + (Math.ceil(features.length / 2) - 1) * 32}px`,
                    transform: isExpanded ? `translateY(-${(Math.ceil(features.length / 2) - Math.ceil(maxInitialCards / 2)) * 272}px)` : 'translateY(0)'
                  }}
                >
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`${styles.featureCard} ${index >= maxInitialCards ? styles.hiddenCard : ''}`}
                    >
                      <div className={styles.featureIcon}>
                        {feature.icon}
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Show More Button */}
                <div className={styles.toggleContainer}>
                  <button 
                    onClick={handleToggleExpanded}
                    className={styles.toggleButton}
                  >
                    <span>
                      {isExpanded ? 'See Our Core Features' : 'Discover What Makes Us Different'}
                    </span>
                    <svg 
                      className={`${styles.toggleIcon} ${isExpanded ? styles.rotated : ''}`} 
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
            ) : (
              // Simple version for OurStory
              <div className={styles.simpleContainer}>
                <div className={styles.simpleGrid}>
                  {features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        {feature.icon}
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
} 