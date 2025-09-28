import OurStorySection from "@/app/components/OurStory/OurStory";
import TeamSection from "@/app/components/Team/Team";
import NewsSection from "@/app/components/NewsSection";
import ContactSection from "@/app/components/ContactSection/ContactSection";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import PageHero from "@/app/components/PageHero";

export default function About() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us" }
  ];

  return (
    <div className="contact-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* About Page Content */}
      <main className="contact-page-main">
        <PageHero 
          title="Where Science Meets Entrepreneurial Vision"
          subtitle="Founded by scientists who understand both complex formulation and business success. We're not just manufacturers—we're partners in turning beauty visions into reality."
        />

        <OurStorySection />
        <TeamSection />
        <NewsSection />
        <ContactSection />
      </main>
    </div>
  );
} 