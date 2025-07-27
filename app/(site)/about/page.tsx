import Link from "next/link";
import OurStorySection from "@/app/components/OurStory/OurStory";
import TeamSection from "@/app/components/Team/Team";
import ContactSection from "@/app/components/ContactSection/ContactSection";

export default function About() {
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
            <span className="breadcrumb-active">About Us</span>
          </nav>
        </div>
      </div>

      {/* About Page Content */}
      <main className="contact-page-main">
        <div className="contact-hero-section">
          <div className="contact-hero-wrapper">
            <h1 className="contact-page-title">Where Science Meets Entrepreneurial Vision</h1>
            <p className="contact-page-subtitle">
              Founded by scientists who understand both complex formulation and business success. We're not just manufacturers—we're partners in turning beauty visions into reality.
            </p>
          </div>
        </div>

        <OurStorySection />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
} 