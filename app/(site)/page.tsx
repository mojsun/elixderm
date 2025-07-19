import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
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
    <div>
      <Hero />
      <Philosophy />
      <WhyElixderm />
      <HowItWorks />
      <QuoteCTA />
      <Partner />
      <Testimonials />
      <h2 className="mt-24 font-bold text-gray-700 text-3xl">My Projects</h2>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                width={750}
                height={300}
                className="object-cover rounded-lg border borde-gray-500"
              />
            )}

            <div className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              {project.name}
            </div>
          </Link>
        ))}
      </div>
      <ContactSection />
    </div>
  );
}
