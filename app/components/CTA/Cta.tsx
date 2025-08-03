import Link from "next/link";

export default function QuoteCTA(): React.JSX.Element {
  return (
    <section className="cta-quote-section">
      <div className="cta-quote-container">
        <Link 
          href="/contact-us" 
          className="cta-quote-link"
        >
          <div className="cta-quote-content">
            
            <div className="cta-quote-text">
              <h3 className="cta-quote-title">
                Get a custom quote tailored to your project needs
              </h3>
            </div>

            <div className="cta-quote-arrow">
              <svg 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1" 
                viewBox="0 0 800 800"
              >
                <g 
                  strokeWidth="9" 
                  stroke="currentColor" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  transform="rotate(315, 400, 400)"
                >
                  <line x1="175" y1="175" x2="625" y2="625" markerEnd="url(#SvgjsMarker1748)" />
                </g>
                <defs>
                  <marker 
                    markerWidth="15" 
                    markerHeight="15" 
                    refX="7.5" 
                    refY="7.5" 
                    viewBox="0 0 15 15" 
                    orient="auto" 
                    id="SvgjsMarker1748"
                  >
                    <polygon points="0,15 7.5,7.5 0,0 15,7.5" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
