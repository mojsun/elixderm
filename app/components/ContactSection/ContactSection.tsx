"use client";

import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      projectDescription: formData.get('projectDescription') as string,
    };

    try {
      const response = await fetch('/api/home-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form className="contact-quick-form" onSubmit={handleSubmit}>
                  <div className="form-input-group">
                    <input 
                      type="text" 
                      name="name"
                      className="contact-input" 
                      placeholder="Your Name" 
                      required 
                      disabled={isSubmitting}
                    />
                    <input 
                      type="email" 
                      name="email"
                      className="contact-input" 
                      placeholder="Your Email Address" 
                      required 
                      disabled={isSubmitting}
                    />
                    <textarea 
                      name="projectDescription"
                      className="contact-textarea" 
                      placeholder="Tell us about your project..." 
                      rows={4} 
                      required
                      disabled={isSubmitting}
                    ></textarea>
                    <button 
                      type="submit" 
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
                {submitMessage && (
                  <div className={`submit-message ${submitStatus}`}>
                    {submitMessage}
                  </div>
                )}
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
