import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import PageHero from "@/app/components/PageHero";
import { getProducts, getServices, getWhoWeHelps } from "@/sanity/sanity-utils";
import { getProjects } from "@/sanity/sanity-utils";
import { createClient } from "next-sanity";
import { Product } from "@/types/Product";
import { Project } from "@/types/project";
import { Service } from "@/types/Service";
import { WhoWeHelp } from "@/types/WhoWeHelp";

type Page = {
  _id: string;
  title: string;
  slug: string;
};

const client = createClient({
  projectId: '7v67lu84',
  dataset: 'production',
  apiVersion: '2025-07-17',
  useCdn: false,
});

export default async function Sitemap() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Sitemap" }
  ];

  // Fetch dynamic content from Sanity
  const [products, projects, services, whoWeHelps, pages] = await Promise.all([
    getProducts(),
    getProjects(),
    getServices(),
    getWhoWeHelps(),
    client.fetch(`*[_type == "page" && defined(slug.current)] {
      _id,
      title,
      "slug": slug.current
    }`)
  ]);

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
      <section className="py-20 !px-10 mt-10 mb-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          {/* Main Pages */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Main Pages
            </h2>
            <p className="text-gray-600 mb-8">
              Essential information about Elixderm and our services.
            </p>
            
            <div className="space-y-3">
              <Link href="/" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                Home
              </Link>
              <Link href="/about" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                About Us
              </Link>
              <Link href="/products" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                Products
              </Link>
              <Link href="/services" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                Services
              </Link>
              <Link href="/who-we-help" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                Who We Help
              </Link>
              <Link href="/contact-us" className="block text-emerald-600 hover:text-emerald-700 text-lg">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Products Section */}
          {products && products.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Private Label Products
              </h2>
              <p className="text-gray-600 mb-8">
                Private Label Product types we can manufacture for your brand with custom formulations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-4">
                {products.map((product: Product) => (
                  <Link 
                    key={product._id}
                    href={`/products/${product.slug}`} 
                    className="flex items-start text-emerald-600 hover:text-emerald-700 text-lg group"
                  >
                    <span className="text-emerald-500 mr-3 mt-1 text-sm group-hover:text-emerald-600 transition-colors">
                      •
                    </span>
                    <span className="flex-1">
                      {product.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {services && services.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 mb-8">
                Comprehensive cosmetic manufacturing and development services for your brand.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-4">
                {services.map((service: Service) => (
                  <Link 
                    key={service._id}
                    href={`/services/${service.slug}`} 
                    className="flex items-start text-emerald-600 hover:text-emerald-700 text-lg group"
                  >
                    <span className="text-emerald-500 mr-3 mt-1 text-sm group-hover:text-emerald-600 transition-colors">
                      •
                    </span>
                    <span className="flex-1">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Who We Help Section */}
          {whoWeHelps && whoWeHelps.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Who We Help
              </h2>
              <p className="text-gray-600 mb-8">
                Discover how we help different types of businesses and entrepreneurs bring their beauty vision to life.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-4">
                {whoWeHelps.map((whoWeHelp: WhoWeHelp) => (
                  <Link 
                    key={whoWeHelp._id}
                    href={`/who-we-help/${whoWeHelp.slug}`} 
                    className="flex items-start text-emerald-600 hover:text-emerald-700 text-lg group"
                  >
                    <span className="text-emerald-500 mr-3 mt-1 text-sm group-hover:text-emerald-600 transition-colors">
                      •
                    </span>
                    <span className="flex-1">
                      {whoWeHelp.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Projects
              </h2>
              <p className="text-gray-600 mb-8">
                Real examples of products we&apos;ve created for our clients.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {projects.map((project: Project) => (
                  <Link 
                    key={project._id}
                    href={`/projects/${project.slug}`} 
                    className="block text-emerald-600 hover:text-emerald-700 text-lg"
                  >
                    {project.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Pages Section */}
          {pages && pages.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Other Pages
              </h2>
              <p className="text-gray-600 mb-8">
                Additional resources and information pages.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {pages.map((page: Page) => (
                  <Link 
                    key={page._id}
                    href={`/${page.slug}`} 
                    className="block text-emerald-600 hover:text-emerald-700 text-lg"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
} 