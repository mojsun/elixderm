import { getProjects } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "../components/ContactSection/ContactSection";
import QuoteCTA from "../components/CTA/Cta";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Partner from "../components/Partner/Partner";
import Philosophy from "../components/Philosophy/Philosophy";
import Testimonials from "../components/Testimonials/Testimonials";
import WhyElixderm from "../components/WhyElixderm/WhyElixderm";

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="w-full">
      <Hero />
      <Philosophy />
      <WhyElixderm />
      <HowItWorks />
      <QuoteCTA />
      <Partner />
      <Testimonials />
      
      {/* Projects Section */}
      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="projects-title">Featured Projects</h2>
            <p className="projects-subtitle">
              Discover our latest work and innovative solutions
            </p>
          </div>
          
          <div className="projects-grid">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="project-card"
              >
                {project.image && (
                  <div className="project-image-container">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={750}
                      height={300}
                      className="project-image"
                    />
                  </div>
                )}
                
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <ContactSection />
    </main>
  );
}
