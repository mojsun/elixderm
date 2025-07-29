"use client";

import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');
  
  // Controlled form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/home-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Your project inquiry has been submitted successfully!');
        
        // Clear the form inputs
        setFormData({
          name: '',
          email: '',
          projectDescription: ''
        });
        
        // Clear the success message after 5 seconds
        setTimeout(() => {
          setSubmitMessage('');
          setSubmitStatus('');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-main-title" style={{ color: '#1f2937' }}>Bring Your Vision to Life</h2>
        
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
              <h3 className="contact-title" style={{ color: '#1f2937' }}>Tell Us About Your Project</h3>
              
              <div className="contact-form-wrapper">
                <form className="contact-quick-form" onSubmit={handleSubmit}>
                  <div className="form-input-group">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-input" 
                      placeholder="Your Name" 
                      required 
                      disabled={isSubmitting}
                    />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-input" 
                      placeholder="Your Email Address" 
                      required 
                      disabled={isSubmitting}
                    />
                    <textarea 
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
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
