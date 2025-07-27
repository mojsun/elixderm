import Link from "next/link";

export default function Sitemap() {
  return (
    <main className="w-full">
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
            <span className="breadcrumb-active">Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="contact-hero-section">
        <div className="contact-hero-wrapper">
          <h1 className="contact-page-title">Sitemap</h1>
          <p className="contact-page-subtitle">Navigate through all pages on our website</p>
        </div>
      </div>

      {/* Sitemap Content */}
      <section className="py-20 mb-10">
        <div className="contact-hero-wrapper">
          <div className="text-center">
            
            {/* Main Pages */}
            <div className="mt-16 mb-16 p-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-12">
                Main Pages
              </h2>
              <div className="space-y-8">
                <div className="group">
                  <Link 
                    href="/" 
                    className="text-xl text-emerald-600 block py-4 px-6 rounded-lg "
                  >
                    Home
                  </Link>
                </div>
                <div className="group">
                  <Link 
                    href="/about" 
                    className="text-xl text-emerald-600  block py-4 px-6 rounded-lg "
                  >
                    About Us
                  </Link>
                </div>
                <div className="group">
                  <Link 
                    href="/contact-us" 
                    className="text-xl text-emerald-600 block py-4 px-6 rounded-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </main>
  );
} 