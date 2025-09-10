import { getAuthors, getFeaturedAuthors } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from "@/app/components/PageHero"
import Image from 'next/image'
import Link from 'next/link'

// Revalidate every 60 seconds
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Authors - Beauty Industry Experts',
  description: 'Meet our team of beauty industry experts, formulation chemists, and thought leaders sharing their knowledge and insights.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Authors - Beauty Industry Experts',
    description: 'Meet our team of beauty industry experts, formulation chemists, and thought leaders sharing their knowledge and insights.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn/author`,
    siteName: 'Elixderm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authors - Beauty Industry Experts',
    description: 'Meet our team of beauty industry experts, formulation chemists, and thought leaders sharing their knowledge and insights.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn/author`,
  },
}

export default async function AuthorsPage() {
  const [allAuthors, featuredAuthors] = await Promise.all([
    getAuthors(),
    getFeaturedAuthors()
  ])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'Authors' }
  ]

  return (
    <div className="authors-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="authors-page-main">
        <PageHero 
          title="Our Authors" 
          subtitle="Meet the beauty industry experts, formulation chemists, and thought leaders behind our insights and knowledge."
        />

        {/* Featured Authors Section */}
        {featuredAuthors.length > 0 && (
          <section className="featured-authors-section">
            <div className="container">
              <h2 className="featured-authors-title">Featured Authors</h2>
              <div className="featured-authors-grid">
                {featuredAuthors.map((author) => (
                  <article key={author._id} className="featured-author-card">
                    <Link href={`/learn/author/${author.slug}`} className="featured-author-link">
                      <div className="featured-author-image-container">
                        <Image
                          src={author.image.url}
                          alt={author.image.alt}
                          width={150}
                          height={150}
                          className="featured-author-image"
                        />
                      </div>
                      <div className="featured-author-content">
                        <h3 className="featured-author-name">{author.name}</h3>
                        <p className="featured-author-title">{author.title}</p>
                        <p className="featured-author-bio">{author.bio}</p>
                        
                        {author.expertise && author.expertise.length > 0 && (
                          <div className="featured-author-expertise">
                            {author.expertise.slice(0, 3).map((skill, index) => (
                              <span key={index} className="featured-expertise-tag">
                                {skill}
                              </span>
                            ))}
                            {author.expertise.length > 3 && (
                              <span className="featured-expertise-more">
                                +{author.expertise.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Authors Section */}
        <section className="all-authors-section">
          <div className="container">
            <h2 className="all-authors-title">All Authors</h2>
            <div className="all-authors-grid">
              {allAuthors.map((author) => (
                <article key={author._id} className="author-card">
                  <Link href={`/learn/author/${author.slug}`} className="author-link">
                    <div className="author-image-container">
                      <Image
                        src={author.image.url}
                        alt={author.image.alt}
                        width={120}
                        height={120}
                        className="author-image"
                      />
                    </div>
                    <div className="author-content">
                      <h3 className="author-name">{author.name}</h3>
                      <p className="author-title">{author.title}</p>
                      <p className="author-bio">{author.bio}</p>
                      
                      {author.expertise && author.expertise.length > 0 && (
                        <div className="author-expertise">
                          {author.expertise.slice(0, 2).map((skill, index) => (
                            <span key={index} className="expertise-tag">
                              {skill}
                            </span>
                          ))}
                          {author.expertise.length > 2 && (
                            <span className="expertise-more">
                              +{author.expertise.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {author.linkedinUrl && (
                        <div className="author-social">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            {allAuthors.length === 0 && (
              <div className="no-authors">
                <p>No authors found. Check back soon for expert insights!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
