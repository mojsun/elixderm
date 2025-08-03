import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import PageHero from "@/app/components/PageHero";

export default function Sitemap() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Sitemap" }
  ];

  return (
    <main className="w-full">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <PageHero 
        title="Sitemap"
        subtitle="Navigate through all pages on our website"
      />

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