"use client";

import React, { useEffect } from "react";
import Image from "next/image";

const TeamSection: React.FC = () => {
  useEffect(() => {
    const teamCards = document.querySelectorAll('.team-card');
    
    const teamObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });
    
    teamCards.forEach(card => {
      teamObserver.observe(card);
    });

    return () => {
      teamObserver.disconnect();
    };
  }, []);
  return (
    <div className="team-section">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title" style={{ color: '#1f2937' }}>Meet Our Team</h2>
          <p className="team-subtitle" style={{ color: '#6b7280' }}>
            The scientists, innovators, and strategists behind your success
          </p>
        </div>
        
        <div className="team-cards-grid">
          {/* Dr. Rasoul Soleimani */}
          <div className="team-card">
            <div className="card-header">
              <div className="member-photo">
                <Image 
                  src="/images/rasoul-soleimani.webp" 
                  alt="Dr. Rasoul Soleimani" 
                  width={60}
                  height={60}
                  loading="lazy"
                />
              </div>
              <div className="member-details">
                <div className="member-name-row">
                  <h3 className="member-name" style={{ color: '#1f2937' }}>Dr. Rasoul Soleimani</h3>
                  <a 
                    href="https://www.linkedin.com/in/rasoul-soleimani-m-sc-ph-d-93260547/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkedin-link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="member-title">Founder & Chief Formulator</p>
              </div>
            </div>
            <div className="card-content">
              <p className="member-description">
                Chemical & Biochemical Engineer with 15+ years in pharmaceutical and cosmetic development. 
                Founded ELAN Healthcare and now leads ElixDerm&apos;s scientific innovation with a focus on 
                natural, high-performance formulations backed by rigorous research.
              </p>
            </div>
          </div>
          
          {/* Richa Vyas */}
          <div className="team-card">
            <div className="card-header">
              <div className="member-photo">
                <div className="member-avatar">
                  <div className="avatar-circle">RV</div>
                </div>
              </div>
              <div className="member-details">
                <div className="member-name-row">
                  <h3 className="member-name" style={{ color: '#1f2937' }}>Richa Vyas</h3>
                  <a href="https://www.linkedin.com/in/richa-vyas-7b84ab185/ " target="_blank" rel="noopener noreferrer" className="linkedin-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="member-title">Regulatory Affairs Specialist</p>
              </div>
            </div>
            <div className="card-content">
              <p className="member-description">
                Expert navigator of Canadian health regulations with specialized knowledge in Natural Health Products, 
                Veterinary Health Products, and pet care labeling. Richa ensures seamless product licensing and 
                Health Canada submissions, bringing strategic regulatory insight that accelerates your market entry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection; 