import { getBlogPosts, getFeaturedBlogPosts } from '@/sanity/sanity-utils'
import { BlogPost, BLOG_CATEGORIES } from '@/types/BlogPost'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from "@/app/components/PageHero"
import Image from 'next/image'
import Link from 'next/link'

// Revalidate every 60 seconds
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Learn - Beauty Industry Insights & Tips',
  description: 'Discover the latest insights, trends, and expert tips in beauty manufacturing, formulation, and industry news from Elixderm.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Learn - Beauty Industry Insights & Tips',
    description: 'Discover the latest insights, trends, and expert tips in beauty manufacturing, formulation, and industry news from Elixderm.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn`,
    siteName: 'Elixderm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn - Beauty Industry Insights & Tips',
    description: 'Discover the latest insights, trends, and expert tips in beauty manufacturing, formulation, and industry news from Elixderm.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn`,
  },
}

export default async function LearnPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const params = await searchParams
  const selectedCategory = params?.category

  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPosts()
  ])

  // Filter posts by category if selected
  const filteredPosts = selectedCategory 
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Learn' }
  ]

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

  // Group posts by category for easy filtering
  const postsByCategory = allPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = []
    }
    acc[post.category].push(post)
    return acc
  }, {} as Record<string, BlogPost[]>)

  return (
    <div className="learn-page">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section - Full Width */}
      <PageHero 
        title="Learn How to Build & Grow Your Beauty Brand" 
        subtitle="Learn how to formulate, manufacture, and scale beauty products with expert guidance on regulations, packaging, pricing, and business strategy."
      />

      <main className="learn-page-main">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="featured-posts-section">
            <div className="container">
              <h2 className="section-title">Featured Articles</h2>
              <div className="featured-posts-grid">
                {featuredPosts.slice(0, 3).map((post) => (
                  <article key={post._id} className="featured-post-card">
                    <Link href={`/learn/${post.slug}`} className="featured-post-link">
                      {post.featuredImage && (
                        <div className="featured-post-image">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            width={400}
                            height={250}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <div className="featured-post-content">
                        <div className="featured-post-meta">
                          <span className="featured-post-category">
                            {getCategoryTitle(post.category)}
                          </span>
                          <time className="featured-post-date">
                            {formatDate(post.publishedAt)}
                          </time>
                        </div>
                        <h3 className="featured-post-title">{post.title}</h3>
                        {post.excerpt && (
                          <p className="featured-post-excerpt">{post.excerpt}</p>
                        )}
                        <div className="featured-post-footer">
                          <span className="featured-post-author">
                          By {typeof post.author === 'string' ? post.author : post.author?.name || 'Unknown'}
                        </span>
                          {post.readingTime && (
                            <span className="featured-post-reading-time">
                              {post.readingTime} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Browse Topics - Inline */}
        <section className="browse-topics-section">
          <div className="container">
            <div className="browse-topics-bar">
              <span className="browse-topics-label">Browse other topics:</span>
              <div className="topics-links">
                <Link
                  href="/learn"
                  className={`topic-badge ${!selectedCategory ? 'active' : ''}`}
                >
                  All ({allPosts.length})
                </Link>
                {BLOG_CATEGORIES.map((category) => {
                  const postsCount = postsByCategory[category.value]?.length || 0
                  if (postsCount === 0) return null
                  const isActive = selectedCategory === category.value
                  return (
                    <Link
                      key={category.value}
                      href={`/learn?category=${category.value}`}
                      className={`topic-badge ${isActive ? 'active' : ''}`}
                    >
                      {category.title} ({postsCount})
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* All Posts Section */}
        <section className="all-posts-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest Articles</h2>
              <p className="section-subtitle">Stay updated with the latest insights and trends in the beauty industry</p>
            </div>
            <div className="all-posts-grid">
              {filteredPosts.map((post) => (
                <article key={post._id} className="blog-post-card">
                  <Link href={`/learn/${post.slug}`} className="blog-post-link">
                    {post.featuredImage && (
                      <div className="blog-post-image">
                        <Image
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt}
                          width={350}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="blog-post-category">
                          {getCategoryTitle(post.category)}
                        </span>
                        <time className="blog-post-date">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <h3 className="blog-post-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="blog-post-excerpt">{post.excerpt}</p>
                      )}
                      <div className="blog-post-footer">
                        <span className="blog-post-author">
                          By {typeof post.author === 'string' ? post.author : post.author?.name || 'Unknown'}
                        </span>
                        {post.readingTime && (
                          <span className="blog-post-reading-time">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="no-posts">
                <div className="no-posts-content">
                  <h3>No articles found</h3>
                  <p>We&apos;re working on bringing you amazing content. Check back soon!</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
