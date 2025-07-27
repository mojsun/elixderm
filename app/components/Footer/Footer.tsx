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
                <Link href="/about" className="footer-link">
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
                    1600 Aimco Blvd. Unit 4<br />
                    Mississauga, ON, Canada L4W 1V1
                  </span>
                </div>
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
            </ul>
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
                <Link href="/sitemap" className="footer-legal-link">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
