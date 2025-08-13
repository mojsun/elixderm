import { getServices } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from "@/app/components/PageHero"
import ServiceGrid from './components/ServiceGrid'

export const metadata: Metadata = {
  title: 'Our Services - Cosmetic Formulation & Manufacturing',
  description: 'Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Our Services - Cosmetic Formulation & Manufacturing',
    description: 'Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/services`,
    siteName: 'Elixderm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Cosmetic Formulation & Manufacturing',
    description: 'Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/services`,
  },
}

export default async function ServicesPage() {
  const services = await getServices()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services' }
  ]

  return (
    <div className="services-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="services-page-main">
        <PageHero 
          title="Our Services" 
          subtitle="Discover our comprehensive range of cosmetic formulation services designed to bring your beauty vision to life."
        />
        
        <ServiceGrid services={services} />
      </main>
    </div>
  )
}
