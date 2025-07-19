"use client";

import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-main-title">Bring Your Vision to Life</h2>
        
        <div className="contact-content">
          <div className="contact-visual">
            <div className="contact-video-container">
              <video className="contact-video" autoPlay muted loop playsInline>
                <source src="/videos/contact.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="contact-form-content">
            <div className="contact-form-inner">
              <h3 className="contact-title">Tell Us About Your Project</h3>
              
              <div className="contact-form-wrapper">
                <form className="contact-quick-form">
                  <div className="form-input-group">
                    <input 
                      type="text" 
                      className="contact-input" 
                      placeholder="Your Name" 
                      required 
                    />
                    <input 
                      type="email" 
                      className="contact-input" 
                      placeholder="Your Email Address" 
                      required 
                    />
                    <textarea 
                      className="contact-textarea" 
                      placeholder="Tell us about your project..." 
                      rows={4} 
                      required
                    ></textarea>
                    <button type="submit" className="contact-submit-btn">
                      Send Message
                    </button>
                  </div>
                </form>
                <p className="contact-note">
                  Free consultation • No commitment • Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
