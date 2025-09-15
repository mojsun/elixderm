import { getWhoWeHelps } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from "@/app/components/PageHero"
import WhoWeHelpGrid from './components/WhoWeHelpGrid'

export const metadata: Metadata = {
  title: 'Who We Help - Cosmetic Manufacturing Solutions',
  description: 'Discover how we help different types of businesses and entrepreneurs bring their beauty vision to life with our cosmetic manufacturing solutions.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Who We Help - Cosmetic Manufacturing Solutions',
    description: 'Discover how we help different types of businesses and entrepreneurs bring their beauty vision to life with our cosmetic manufacturing solutions.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/who-we-help`,
    siteName: 'Elixderm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who We Help - Cosmetic Manufacturing Solutions',
    description: 'Discover how we help different types of businesses and entrepreneurs bring their beauty vision to life with our cosmetic manufacturing solutions.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/who-we-help`,
  },
}

export default async function WhoWeHelpPage() {
  const whoWeHelps = await getWhoWeHelps()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Who We Help' }
  ]

  return (
    <div className="who-we-help-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="who-we-help-page-main">
        <PageHero 
          title="Who We Help" 
          subtitle="We partner with diverse businesses and entrepreneurs to bring their unique beauty visions to life through our comprehensive cosmetic manufacturing solutions."
        />
        
        <WhoWeHelpGrid whoWeHelps={whoWeHelps} />
      </main>
    </div>
  )
}
