import { getAuthor, getAuthors, getBlogPostsByAuthor } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'

// Revalidate every 60 seconds
export const revalidate = 60
import { BLOG_CATEGORIES } from '@/types/BlogPost'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
  
  return {
    title: author.seo?.metaTitle || `${author.name} - ${author.title}`,
    description: author.seo?.metaDescription || author.bio,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: author.seo?.metaTitle || `${author.name} - ${author.title}`,
      description: author.seo?.metaDescription || author.bio,
      url: `${baseUrl}/learn/author/${author.slug}`,
      siteName: 'Elixderm',
      type: 'profile',
      images: [
        {
          url: author.image.url,
          alt: author.image.alt,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: author.seo?.metaTitle || `${author.name} - ${author.title}`,
      description: author.seo?.metaDescription || author.bio,
      images: [author.image.url],
    },
    alternates: {
      canonical: `${baseUrl}/learn/author/${author.slug}`,
    },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const [author, authorPosts] = await Promise.all([
    getAuthor(slug),
    getBlogPostsByAuthor(slug)
  ])

  if (!author) {
    return notFound()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCategoryTitle = (categoryValue: string) => {
    const category = BLOG_CATEGORIES.find(cat => cat.value === categoryValue)
    return category?.title || categoryValue
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'Authors', href: '/learn/author' },
    { label: author.name }
  ]

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title,
    "description": author.bio,
    "image": author.image.url,
    "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn/author/${author.slug}`,
    ...(author.linkedinUrl && {
      "sameAs": [author.linkedinUrl]
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="author-page">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Author Hero Section */}
        <div className="author-hero-section">
          <div className="author-hero-content">
            <div className="author-image-container">
              <Image
                src={author.image.url}
                alt={author.image.alt}
                width={200}
                height={200}
                priority
                className="author-image"
              />
            </div>
            
            <div className="author-info">
              <h1 className="author-name">{author.name}</h1>
              <p className="author-title">{author.title}</p>
              <p className="author-bio">{author.bio}</p>
              
              {author.expertise && author.expertise.length > 0 && (
                <div className="author-expertise">
                  <span className="expertise-label">Expertise:</span>
                  <div className="expertise-tags">
                    {author.expertise.map((skill, index) => (
                      <span key={index} className="expertise-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {author.linkedinUrl && (
                <div className="author-social">
                  <a
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author's Blog Posts */}
        <section className="author-posts-section">
          <div className="container">
            <h2 className="author-posts-title">
              Articles by {author.name} ({authorPosts.length})
            </h2>
            
            {authorPosts.length > 0 ? (
              <div className="author-posts-grid">
                {authorPosts.map((post) => (
                  <article key={post._id} className="author-post-card">
                    <Link href={`/learn/${post.slug}`} className="author-post-link">
                      {post.featuredImage && (
                        <div className="author-post-image">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            width={350}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <div className="author-post-content">
                        <div className="author-post-meta">
                          <span className="author-post-category">
                            {getCategoryTitle(post.category)}
                          </span>
                          <time className="author-post-date">
                            {formatDate(post.publishedAt)}
                          </time>
                        </div>
                        <h3 className="author-post-title">{post.title}</h3>
                        {post.excerpt && (
                          <p className="author-post-excerpt">{post.excerpt}</p>
                        )}
                        {post.readingTime && (
                          <span className="author-post-reading-time">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-posts">
                <p>{author.name} hasn&apos;t published any articles yet.</p>
              </div>
            )}
          </div>
        </section>
        
        <div className="author-navigation">
          <Link href="/learn/author" className="author-back-link">
            ← All Authors
          </Link>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}
