import { getWhoWeHelp, getWhoWeHelps } from '@/sanity/sanity-utils'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import WhoWeHelpHero from '@/app/components/WhoWeHelpHero/WhoWeHelpHero'
import WhoWeHelpValue from '@/app/components/WhoWeHelpValue/WhoWeHelpValue'
import WhoWeHelpImageSlider from '@/app/components/WhoWeHelpImageSlider/WhoWeHelpImageSlider'
import WhoWeHelpHowItWorks from '@/app/components/WhoWeHelpHowItWorks/WhoWeHelpHowItWorks'
import WhoWeHelpTopCTA from '@/app/components/WhoWeHelpTopCTA/WhoWeHelpTopCTA'
import WhoWeHelpFeatures from '@/app/components/WhoWeHelpFeatures/WhoWeHelpFeatures'
import WhoWeHelpMiddleCTA from '@/app/components/WhoWeHelpMiddleCTA/WhoWeHelpMiddleCTA'
import WhoWeHelpFAQ from '@/app/components/WhoWeHelpFAQ/WhoWeHelpFAQ'
import WhoWeHelpBottomCTA from '@/app/components/WhoWeHelpBottomCTA/WhoWeHelpBottomCTA'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const whoWeHelp = await getWhoWeHelp(slug)
  
  if (!whoWeHelp) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
  
  // Get the first slider image as OG image, fallback to hero image
  const ogImage = whoWeHelp.slider?.images?.[0]?.url || whoWeHelp.hero?.image
  const ogImageAlt = whoWeHelp.slider?.images?.[0]?.alt || whoWeHelp.hero?.imageAlt || `${whoWeHelp.name} image`
  
  return {
    title: whoWeHelp.seo?.metaTitle || whoWeHelp.name,
    description: whoWeHelp.seo?.metaDescription || `Learn how we help ${whoWeHelp.name}`,
    robots: {
      index: !whoWeHelp.seo?.noIndex,
      follow: !whoWeHelp.seo?.noIndex,
    },
    openGraph: {
      title: whoWeHelp.seo?.metaTitle || whoWeHelp.name,
      description: whoWeHelp.seo?.metaDescription || `Learn how we help ${whoWeHelp.name}`,
      url: `${baseUrl}/who-we-help/${whoWeHelp.slug}`,
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
      title: whoWeHelp.seo?.metaTitle || whoWeHelp.name,
      description: whoWeHelp.seo?.metaDescription || `Learn how we help ${whoWeHelp.name}`,
      images: ogImage ? [
        {
          url: ogImage,
          alt: ogImageAlt,
        }
      ] : [],
    },
    alternates: {
      canonical: `${baseUrl}/who-we-help/${whoWeHelp.slug}`,
    },
  }
}

export default async function WhoWeHelpPage({ params }: Props) {
  const { slug } = await params
  const whoWeHelp = await getWhoWeHelp(slug)

  if (!whoWeHelp) {
    return notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Who We Help', href: '/who-we-help' },
    { label: whoWeHelp.name }
  ]

  return (
    <div className="who-we-help-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="who-we-help-page-main" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* 1. Nav - handled by layout */}
        {/* 2. Breadcrumb - above */}
        {/* 3. Hero section with h1 and subheading with an image on right side */}
        <WhoWeHelpHero whoWeHelp={whoWeHelp} />
        
        {/* 4. A section with h2 and text and four icons exactly like product value section */}
        <WhoWeHelpValue whoWeHelp={whoWeHelp} />
        
        {/* 5. 3 images like product image slider section */}
        <WhoWeHelpImageSlider whoWeHelp={whoWeHelp} />
        
        {/* 6. How it works section exactly similar to how it works section of services page */}
        <WhoWeHelpHowItWorks whoWeHelp={whoWeHelp} />
        
        {/* 7. Product top cta */}
        <WhoWeHelpTopCTA whoWeHelp={whoWeHelp} />
        
        {/* 8. Product features section from product page */}
        <WhoWeHelpFeatures whoWeHelp={whoWeHelp} />
        
        {/* 9. Middle CTA of product page */}
        <WhoWeHelpMiddleCTA whoWeHelp={whoWeHelp} />
        
        {/* 10. FAQ section */}
        <WhoWeHelpFAQ whoWeHelp={whoWeHelp} />
        
        {/* 11. Bottom cta */}
        <WhoWeHelpBottomCTA whoWeHelp={whoWeHelp} />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const whoWeHelps = await getWhoWeHelps()
  return whoWeHelps.map((whoWeHelp) => ({
    slug: whoWeHelp.slug,
  }))
}
