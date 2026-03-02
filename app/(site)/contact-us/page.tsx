'use client';

import { useState, useEffect, useRef } from 'react';
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import PageHero from "@/app/components/PageHero";
import MochiChat from "@/app/components/MochiChat/MochiChat";
import styles from './ContactTransition.module.css';

type Phase = 'form' | 'processing' | 'chat';
type ProcessingSubState = 'steps' | 'success' | 'exiting';

const PROCESSING_STEPS = [
  'Receiving your project details',
  'Analyzing your requirements',
  'Connecting you to Mochi',
];

function ConfettiPiece({ style }: { style: React.CSSProperties }) {
  return <div className={styles.confettiPiece} style={style} />;
}

function Confetti() {
  const pieces = Array.from({ length: 80 }, (_, i) => {
    const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b', '#60a5fa', '#a78bfa', '#f472b6'];
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.8,
      duration: 2.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 7 + Math.random() * 8,
      rotation: Math.random() * 360,
      isRect: Math.random() > 0.5,
    };
  });

  return (
    <div className={styles.confettiContainer} aria-hidden="true">
      {pieces.map((p) => (
        <ConfettiPiece
          key={p.id}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: p.isRect ? `${p.size * 1.6}px` : `${p.size}px`,
            borderRadius: p.isRect ? '2px' : '50%',
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ContactUs() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact" }
  ];

  const [phase, setPhase] = useState<Phase>('form');
  const [processingSubState, setProcessingSubState] = useState<ProcessingSubState>('steps');
  const [processingStep, setProcessingStep] = useState(0);
  const [initialGreeting, setInitialGreeting] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetMarket: '',
    businessStage: '',
    hasBenchmarkProduct: '',
    packagingIdeas: '',
    hasBrand: '',
    productType: '',
    timeline: '',
    quantity: '',
    formulation: '',
    vision: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [contactSanityId, setContactSanityId] = useState('');
  const [submittedFormData, setSubmittedFormData] = useState(formData);

  // Scroll to top when leaving the form phase
  useEffect(() => {
    if (phase !== 'form') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [phase]);

  // Fetch personalized GPT greeting as soon as processing starts — runs in
  // parallel with the animation so it's ready (or nearly ready) when chat appears
  useEffect(() => {
    if (phase !== 'processing') return;
    setInitialGreeting(''); // reset for new submissions

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generateGreeting: true, formContext: submittedFormData }),
    })
      .then((r) => r.json())
      .then((data) => setInitialGreeting(data.reply ?? ''))
      .catch(() => setInitialGreeting('')) // MochiChat falls back to template on empty string
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Drive processing step animations, then transition sub-states
  useEffect(() => {
    if (phase !== 'processing') return;

    setProcessingSubState('steps');
    setProcessingStep(0);

    const STEP_BASE = 600 + PROCESSING_STEPS.length * 750 + 400;

    const stepTimers = PROCESSING_STEPS.map((_, i) =>
      setTimeout(() => setProcessingStep(i + 1), 600 + i * 750)
    );
    const successTimer  = setTimeout(() => setProcessingSubState('success'),  STEP_BASE);
    const exitTimer     = setTimeout(() => setProcessingSubState('exiting'),   STEP_BASE + 4800); // +1s vs before
    const chatTimer     = setTimeout(() => setPhase('chat'),                   STEP_BASE + 4800 + 700);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(successTimer);
      clearTimeout(exitTimer);
      clearTimeout(chatTimer);
    };
  }, [phase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmittedFormData({ ...formData });
        setContactSanityId(result.sanityId ?? '');
        setPhase('processing');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = submittedFormData.name?.split(' ')[0] || 'there';

  // ─── Non-form phases (processing + chat) ───────────────────────────────────
  // MochiChat is rendered once here and NEVER unmounted during the transition,
  // so conversation state is preserved when the processing banner fades out.
  if (phase === 'processing' || phase === 'chat') {
    const isSuccess = processingSubState === 'success' || processingSubState === 'exiting' || phase === 'chat';

    return (
      <div className="contact-page">

        {/* ── Processing banner (hidden once we reach chat phase) ── */}
        {phase === 'processing' && (
        <div className={`${styles.processingSection} ${processingSubState === 'exiting' ? styles.processingSectionExit : ''}`}>
          {!isSuccess ? (
            /* Loading card */
            <div className={styles.processingWrapper}>
              <div className={styles.processingCard}>
                <div className={styles.processingSpinner}>
                  <div className={styles.spinnerRing} />
                  <div className={styles.spinnerAvatar}>M</div>
                </div>
                <h2 className={styles.processingTitle}>Processing your inquiry</h2>
                <p className={styles.processingSubtitle}>Just a moment while we set things up for you...</p>
                <div className={styles.processingSteps}>
                  {PROCESSING_STEPS.map((step, i) => (
                    <div key={step} className={`${styles.processingStep} ${processingStep > i ? styles.processingStepDone : ''}`}>
                      <span className={styles.stepIcon}>
                        {processingStep > i ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                        ) : (
                          <span className={styles.stepDot} />
                        )}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Success banner — confetti lives inside so it anchors correctly */
            <div className={styles.successBanner}>
              <Confetti />
              <div className={styles.successBannerInner}>
                <div className={styles.successSteps}>
                  {PROCESSING_STEPS.map((step) => (
                    <div key={step} className={styles.successStep}>
                      <span className={styles.successStepIcon}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.successMessage}>
                  <div className={styles.successEmoji} aria-hidden="true">🎉</div>
                  <h2 className={styles.successTitle}>You&apos;re qualified, {firstName}!</h2>
                  <p className={styles.successBody}>
                    Your inquiry has been received and reviewed. You&apos;ve been matched with <strong>Mochi</strong> — Elixderm&apos;s specialist trained exclusively on our manufacturing process. Ask anything while our team prepares your file.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        )} {/* end phase === 'processing' */}

        {/* ── Mochi — slides in on success, stays mounted through chat phase ── */}
        {isSuccess && (
          <div className={phase === 'chat' ? styles.chatPage : styles.chatSlideIn}>
            <MochiChat
              formContext={submittedFormData}
              contactId={contactSanityId}
              onClose={() => setPhase('form')}
              initialGreeting={initialGreeting}
            />
          </div>
        )}
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="contact-page">
      <Breadcrumb items={breadcrumbItems} />
      <main className="contact-page-main">
        <PageHero
          title="Get Your Custom Beauty Manufacturing Quote"
          subtitle="Ready to launch your beauty brand? Fill out our form below and our manufacturing experts will help you understand your options for private label products, formulations, and packaging needs."
        />

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
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field">
                    <label htmlFor="company">Company Name *</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field">
                    <label htmlFor="targetMarket">What is your target market location? *</label>
                    <input
                      type="text" id="targetMarket" name="targetMarket" value={formData.targetMarket}
                      onChange={handleInputChange}
                      placeholder="e.g., USA, Arizona • Canada, Ontario • Europe, UK • Asia, Japan • etc."
                      required
                    />
                    <small style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                      You can specify country, state/province, city, or region
                    </small>
                  </div>

                  <div className="form-field">
                    <label htmlFor="businessStage">What stage is your business currently in? *</label>
                    <select id="businessStage" name="businessStage" value={formData.businessStage} onChange={handleInputChange} required>
                      <option value="">Select your business stage</option>
                      <option value="startup">Startup (Just getting started)</option>
                      <option value="early-stage">Early Stage (1-2 years, building initial products)</option>
                      <option value="scaling">Scaling (Growing rapidly, expanding product lines)</option>
                      <option value="established">Established Brand (3+ years, looking to expand/optimize)</option>
                      <option value="enterprise">Enterprise (Large company/corporation)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="hasBrand">Does your company have a brand? (logo, product name, etc.) *</label>
                    <select id="hasBrand" name="hasBrand" value={formData.hasBrand} onChange={handleInputChange} required>
                      <option value="">Please select</option>
                      <option value="yes-complete">Yes, we have a complete brand identity</option>
                      <option value="yes-partial">Yes, but it&apos;s still developing</option>
                      <option value="no-need-help">No, we need help creating one</option>
                      <option value="no-diy">No, we&apos;ll handle branding ourselves</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Do you have a benchmark product in the market that you want to be similar to? *</label>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="hasBenchmarkProduct" value="yes" checked={formData.hasBenchmarkProduct === 'yes'} onChange={handleInputChange} required />
                        Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="hasBenchmarkProduct" value="no" checked={formData.hasBenchmarkProduct === 'no'} onChange={handleInputChange} required />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="productType">What type of products are you looking to manufacture? *</label>
                    <select id="productType" name="productType" value={formData.productType} onChange={handleInputChange} required>
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
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} required>
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
                    <select id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} required>
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
                    <select id="formulation" name="formulation" value={formData.formulation} onChange={handleInputChange} required>
                      <option value="">Select formulation needs</option>
                      <option value="existing">Have existing formulas</option>
                      <option value="custom">Need custom formulation</option>
                      <option value="modify">Want to modify existing</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="packagingIdeas">Do you have any specific packaging ideas or preferences? *</label>
                    <textarea
                      id="packagingIdeas" name="packagingIdeas" value={formData.packagingIdeas}
                      onChange={handleInputChange}
                      placeholder="Describe your packaging vision, material preferences, size requirements, design ideas, sustainability goals, etc..."
                      rows={3} required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="vision">Tell us about your vision: *</label>
                    <textarea
                      id="vision" name="vision" value={formData.vision} onChange={handleInputChange}
                      placeholder="Describe your product concept, target market, or specific challenges you're facing..."
                      maxLength={500} required
                    />
                    <div className="char-counter">{formData.vision.length}/500</div>
                  </div>

                  {submitStatus === 'error' && (
                    <div style={{ padding: '1rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                      Sorry, there was an error. Please try again or contact us at hello@elixderm.com
                    </div>
                  )}

                  <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your Custom Quote'}
                    {!isSubmitting && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12,5 19,12 12,19"></polyline>
                      </svg>
                    )}
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
