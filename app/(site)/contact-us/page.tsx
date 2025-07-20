'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productType: '',
    timeline: '',
    quantity: '',
    formulation: '',
    vision: '',
    budget: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! (This is just a demo - no actual submission)');
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb Navigation */}
      <div className="page-breadcrumb">
        <div className="breadcrumb-wrapper">
          <nav className="breadcrumb-nav">
            <Link href="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-divider">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </span>
            <span className="breadcrumb-active">Contact</span>
          </nav>
        </div>
      </div>

      {/* Contact Page Content */}
      <main className="contact-page-main">
        <div className="contact-hero-section">
          <div className="contact-hero-wrapper">
            <h1 className="contact-page-title">Get Your Custom Beauty Manufacturing Quote</h1>
            <p className="contact-page-subtitle">
              Ready to launch your beauty brand? Fill out our form below and our manufacturing experts will help you understand your options for private label products, formulations, and packaging needs.
            </p>
          </div>
        </div>

        <div className="contact-main-section">
          <div className="contact-main-wrapper">
            <div className="contact-layout">
              <div className="contact-information">
                <div className="contact-process">
                  <h3>What Happens Next?</h3>
                  <div className="process-timeline">
                    <div className="timeline-item">
                      <div className="timeline-number">1</div>
                      <div className="timeline-details">
                        <h4>We Review Your Project</h4>
                        <p>Our team analyzes your requirements and prepares initial recommendations</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-number">2</div>
                      <div className="timeline-details">
                        <h4>Schedule Consultation</h4>
                        <p>We arrange a detailed discussion about your goals and timeline</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-number">3</div>
                      <div className="timeline-details">
                        <h4>Receive Detailed Proposal</h4>
                        <p>Get a comprehensive proposal with transparent pricing and timeline</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-highlights">
                  <div className="highlight-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                    <span>GMP Certified Facility</span>
                  </div>
                  <div className="highlight-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>2-3 Business Day Response</span>
                  </div>
                  <div className="highlight-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                    <span>Flexible MOQs from 25 Units</span>
                  </div>
                  <div className="highlight-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>Transparent Pricing, No Hidden Fees</span>
                  </div>
                </div>
              </div>

              <div className="contact-form-area">
                <form className="contact-form-main" onSubmit={handleSubmit}>
                  <div className="form-heading">
                    <h2>Tell Us About Your Project</h2>
                    <p>We respond to all qualified inquiries within 2-3 business days</p>
                  </div>

                  <div className="form-field">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="company">Company Name *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="productType">What type of products are you looking to manufacture? *</label>
                    <select
                      id="productType"
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="hair-care">Hair Care</option>
                      <option value="skin-care">Skin Care</option>
                      <option value="body-care">Body Care</option>
                      <option value="specialized">Specialized Products</option>
                      <option value="multiple">Multiple Categories</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="timeline">What&apos;s your target launch timeline? *</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="12-plus-months">12+ months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="quantity">What&apos;s your estimated initial order quantity? *</label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select quantity range</option>
                      <option value="25-100">25-100 units</option>
                      <option value="100-500">100-500 units</option>
                      <option value="500-1000">500-1000 units</option>
                      <option value="1000-plus">1000+ units</option>
                      <option value="need-guidance">Need guidance</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="formulation">Do you have existing formulations or need custom development? *</label>
                    <select
                      id="formulation"
                      name="formulation"
                      value={formData.formulation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select formulation needs</option>
                      <option value="existing">Have existing formulas</option>
                      <option value="custom">Need custom formulation</option>
                      <option value="modify">Want to modify existing</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="vision">Tell us about your vision: *</label>
                    <textarea
                      id="vision"
                      name="vision"
                      value={formData.vision}
                      onChange={handleInputChange}
                      placeholder="Describe your product concept, target market, or specific challenges you're facing..."
                      maxLength={500}
                      required
                    ></textarea>
                    <div className="char-counter">{formData.vision.length}/500</div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="budget">What&apos;s your approximate budget range for this project? *</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5K</option>
                      <option value="5k-15k">$5K - $15K</option>
                      <option value="15k-30k">$15K - $30K</option>
                      <option value="30k-plus">$30K+</option>
                    </select>
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Get Your Custom Quote
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12,5 19,12 12,19"></polyline>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 