import React from "react";
import FeatureSection from "@/app/components/FeatureSection";

const OurStorySection: React.FC = () => {
  const storyFeatures = [
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          biotech
        </span>
      ),
      title: "Science-First Foundation",
      description: "PhD scientists bringing clinical precision to beauty"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          handshake
        </span>
      ),
      title: "Boutique Approach",
      description: "Personalized partnerships with dedicated attention"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          approval_delegation
        </span>
      ),
      title: "Transparency First",
      description: "Clear processes and honest pricing, no surprises"
    },
    {
      icon: (
        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
          lightbulb
        </span>
      ),
      title: "Innovation-Driven",
      description: "Cutting-edge science with entrepreneurial flexibility"
    }
  ];

  return (
    <FeatureSection
      title="Our Story"
      description="Elixderm was born from a simple observation: most beauty manufacturers operate like factories, prioritizing volume over vision. As scientists and entrepreneurs ourselves, we knew there was a better way to bridge the gap between complex chemistry and market success."
      features={storyFeatures}
      enableAnimation={false}
      className="our-story-section"
    />
  );
};

export default OurStorySection; 