import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li>
                <Link href="/" className="footer-link">
                  About Elixderm
                </Link>
              </li>
              <li className="footer-address">
                <div className="address-container">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="location-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="address-text">
                    123 Innovation Drive<br />
                    Mississauga, ON L5M 2B5<br />
                    Canada
                  </span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">What We Do</h3>
            <ul className="footer-links">
              <li>
                <Link href="#" className="footer-link">
                  Private Label Manufacturing
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Custom Formulation
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Packaging & Labeling
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Regulatory Support
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Dropshipping & Fulfillment
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li>
                <Link href="#" className="footer-link">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Starter Kits
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li className="footer-tools-separator"></li>
              <li>
                <Link href="#" className="footer-link footer-tool">
                  Cost Estimator Tool
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link footer-tool">
                  AI Label Tool
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="mailto:hello@elixderm.com" className="footer-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  hello@elixderm.com
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </Link>
              </li>
            </ul>
            
            <div className="newsletter-subscription">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-description">Get industry insights and exclusive content</p>
              <form className="newsletter-form" id="newsletter-form">
                <div className="newsletter-input-group">
                  <input type="email" className="newsletter-input" placeholder="Enter your email" required />
                  <button type="submit" className="newsletter-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-logo">
              <Link href="/" className="footer-brand">Elixderm</Link>
              <p className="footer-tagline">Professional Beauty Solutions</p>
            </div>
            <div className="footer-legal">
              <p className="footer-copyright">© 2025 Elixderm. All rights reserved.</p>
              <div className="footer-legal-links">
                <Link href="#" className="footer-legal-link">Privacy Policy</Link>
                <Link href="#" className="footer-legal-link">Terms of Service</Link>
                <Link href="#" className="footer-legal-link">Cookie Policy</Link>
                <Link href="#" className="footer-legal-link">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
