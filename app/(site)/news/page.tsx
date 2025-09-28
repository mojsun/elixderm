import { Metadata } from 'next'
import { getNews } from '@/sanity/sanity-utils'
import PageHero from '@/app/components/PageHero'
import Breadcrumb from '@/app/components/Breadcrumb'
import NewsList from './components/NewsList'

export const metadata: Metadata = {
  title: 'Latest News & Updates | Elixderm - Cosmetic Manufacturing News',
  description: 'Stay updated with the latest news, announcements, and industry insights from Elixderm. Get the newest updates on our cosmetic manufacturing services and company developments.',
  keywords: 'Elixderm news, cosmetic manufacturing updates, beauty industry news, company announcements, manufacturing insights',
  openGraph: {
    title: 'Latest News & Updates | Elixderm',
    description: 'Stay updated with the latest news, announcements, and industry insights from Elixderm.',
    type: 'website',
    siteName: 'Elixderm',
    locale: 'en_US',
    url: 'https://elixderm.com/news',
  },
  twitter: {
    card: 'summary',
    title: 'Latest News & Updates | Elixderm',
    description: 'Stay updated with the latest news, announcements, and industry insights from Elixderm.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://elixderm.com/news',
  },
}

export default async function NewsPage() {
  const newsItems = await getNews()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News' }
  ]

  return (
    <div className="news-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="news-page-main">
        <PageHero 
          title="Latest News & Updates" 
          subtitle="Stay informed with the latest developments, announcements, and insights from Elixderm. Discover what's new in cosmetic manufacturing and our company milestones."
        />
        
        <NewsList newsItems={newsItems} />
      </main>
    </div>
  )
}
