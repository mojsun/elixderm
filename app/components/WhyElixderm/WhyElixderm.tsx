import React from "react";
import FeatureSection from "@/app/components/FeatureSection";

export default function WhyElixderm(): React.JSX.Element {

  const features = [
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          inventory
        </span>
      ),
      title: "MOQs starting at 25 units", 
      description: "Perfect for testing markets and scaling gradually"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          price_check
        </span>
      ),
      title: "Transparent pricing",
      description: "Clear, upfront costs with no hidden fees or surprises"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          lab_research
        </span>
      ),
      title: "Custom formulations available",
      description: "Unique products tailored to your vision"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          balance
        </span>
      ),
      title: "Regulatory support included",
      description: "Compliance guidance at every step"
    }
  ];

  return (
    <FeatureSection
      title="Why Elixderm is Different"
      description="While other manufacturers focus on volume and standardization, we've built our entire operation around flexibility, transparency, and genuine partnership. Here's what sets us apart in the beauty manufacturing landscape."
      features={features}
      enableAnimation={false}
    />
  );
}
