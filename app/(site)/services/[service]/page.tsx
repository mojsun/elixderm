import { getService, getServices } from '@/sanity/sanity-utils'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import ServiceHero from '@/app/components/ServiceHero/ServiceHero'
import ServiceFeaturesOverview from '@/app/components/ServiceFeaturesOverview/ServiceFeaturesOverview'
import ServiceValue from '@/app/components/ServiceValue/ServiceValue'
import ServiceSpecialties from '@/app/components/ServiceSpecialties/ServiceSpecialties'
import ServiceProcess from '@/app/components/ServiceProcess/ServiceProcess'
import ServiceCTARow from '@/app/components/ServiceCTARow/ServiceCTARow'
import ServiceProductRange from '@/app/components/ServiceProductRange/ServiceProductRange'
import ServiceMiddleCTA from '@/app/components/ServiceMiddleCTA/ServiceMiddleCTA'
import ServiceFAQ from '@/app/components/ServiceFAQ/ServiceFAQ'

type Props = {
  params: Promise<{ service: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = await getService(serviceSlug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
  
  // Get the hero image as OG image
  const ogImage = service.hero?.image
  const ogImageAlt = service.hero?.imageAlt || `${service.name} service image`
  
  return {
    title: service.seo?.metaTitle || service.name,
    description: service.seo?.metaDescription || `Learn more about ${service.name}`,
    robots: {
      index: !service.seo?.noIndex,
      follow: !service.seo?.noIndex,
    },
    openGraph: {
      title: service.seo?.metaTitle || service.name,
      description: service.seo?.metaDescription || `Learn more about ${service.name}`,
      url: `${baseUrl}/services/${service.slug}`,
      siteName: 'Elixderm',
      type: 'website',
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo?.metaTitle || service.name,
      description: service.seo?.metaDescription || `Learn more about ${service.name}`,
      images: ogImage ? [
        {
          url: ogImage,
          alt: ogImageAlt,
        }
      ] : [],
    },
    alternates: {
      canonical: `${baseUrl}/services/${service.slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params
  const service = await getService(serviceSlug)

  if (!service) {
    return notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.name }
  ]

  return (
    <div className="service-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="service-page-main" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <ServiceHero service={service} />
        <ServiceFeaturesOverview service={service} />
        <ServiceValue service={service} />
        <ServiceSpecialties service={service} />
        <ServiceProcess service={service} />
        <ServiceCTARow service={service} type="top" />
        <ServiceProductRange service={service} />
        <ServiceMiddleCTA service={service} />
        <ServiceFAQ service={service} />
        <ServiceCTARow service={service} type="bottom" />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    service: service.slug,
  }))
}
