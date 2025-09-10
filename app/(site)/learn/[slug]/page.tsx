import { getBlogPost, getBlogPosts } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_CATEGORIES } from '@/types/BlogPost'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
  
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: `${baseUrl}/learn/${post.slug}`,
      siteName: 'Elixderm',
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [typeof post.author === 'string' ? post.author : post.author?.name || 'Unknown'],
      images: post.featuredImage ? [
        {
          url: post.featuredImage.url,
          alt: post.featuredImage.alt,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage.url] : [],
    },
    alternates: {
      canonical: `${baseUrl}/learn/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return notFound()
  }

  const categoryInfo = BLOG_CATEGORIES.find(cat => cat.value === post.category)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: post.title }
  ]


  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage?.url,
    "author": {
      "@type": "Person",
      "name": typeof post.author === 'string' ? post.author : post.author?.name || "Unknown"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elixderm",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/favicon.ico`
      }
    },
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post._createdAt).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/learn/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="blog-post-page">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hero Section with Featured Image or Simple Header */}
        {post.featuredImage ? (
          <div className="blog-hero-section">
            <div className="blog-hero-image">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={1400}
                height={700}
                priority
                className="blog-hero-img"
              />
            </div>
            <div className="blog-hero-overlay">
              <div className="blog-hero-content">
                <Link href={`/learn?category=${post.category}`} className="blog-hero-category">
                  {categoryInfo?.title || post.category}
                </Link>
                <h1 className="blog-hero-title">{post.title}</h1>
                <div className="blog-hero-meta">
                  <time dateTime={new Date(post.publishedAt).toISOString()} className="blog-hero-date">
                    {formattedDate}
                  </time>
                  {post.readingTime && (
                    <span className="blog-hero-reading-time">
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="blog-simple-header">
            <div className="blog-simple-content">
              <Link href={`/learn?category=${post.category}`} className="blog-simple-category">
                {categoryInfo?.title || post.category}
              </Link>
              <h1 className="blog-simple-title">{post.title}</h1>
              <div className="blog-simple-meta">
                <time dateTime={new Date(post.publishedAt).toISOString()} className="blog-simple-date">
                  {formattedDate}
                </time>
                {post.readingTime && (
                  <span className="blog-simple-reading-time">
                    {post.readingTime} min read
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="blog-post-article">
          <div className="blog-post-author-section">
            {typeof post.author === 'object' && post.author?.image ? (
              <Link href={`/learn/author/${post.author.slug}`} className="blog-post-author-link">
                <div className="blog-post-author-info">
                  <Image
                    src={post.author.image.url}
                    alt={post.author.image.alt}
                    width={50}
                    height={50}
                    className="blog-post-author-image"
                  />
                  <div className="blog-post-author-text">
                    <span className="blog-post-author-name">By {post.author.name}</span>
                    <span className="blog-post-author-title">{post.author.title}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="blog-post-author-fallback">
                <span className="blog-post-author-name">
                  By {typeof post.author === 'string' ? post.author : 'Unknown Author'}
                </span>
              </div>
            )}
          </div>
          
          <div className="blog-post-content">
            <PortableText value={post.content} />
          </div>
        </article>
        
        <div className="blog-post-navigation">
          <Link href="/learn" className="blog-post-back-link">
            ← Back to Learn
          </Link>
        </div>
      </div>
    </>
  )
}

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
