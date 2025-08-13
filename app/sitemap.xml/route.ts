import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '7v67lu84',
  dataset: 'production',
  apiVersion: '2025-07-17',
  useCdn: false,
})

interface SitemapURL {
  url: string
  lastModified: string
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

type SitemapPage = {
  _id: string
  name: string
  slug: string
  _updatedAt: string
}

type SitemapProject = {
  _id: string
  name: string
  slug: string
  _updatedAt: string
}

type SitemapProduct = {
  _id: string
  name: string
  slug: string
  _updatedAt: string
}

type SitemapService = {
  _id: string
  name: string
  slug: string
  _updatedAt: string
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
    const sitemap: SitemapURL[] = []

    // Static pages with their priorities and change frequencies
    const staticPages = [
      { 
        url: '/', 
        changeFreq: 'daily' as const, 
        priority: 1.0,
        lastModified: new Date().toISOString()
      },
      { 
        url: '/about', 
        changeFreq: 'monthly' as const, 
        priority: 0.8,
        lastModified: new Date().toISOString()
      },
      { 
        url: '/products', 
        changeFreq: 'weekly' as const, 
        priority: 0.9,
        lastModified: new Date().toISOString()
      },
      { 
        url: '/services', 
        changeFreq: 'weekly' as const, 
        priority: 0.9,
        lastModified: new Date().toISOString()
      },
      { 
        url: '/contact-us', 
        changeFreq: 'monthly' as const, 
        priority: 0.9,
        lastModified: new Date().toISOString()
      },
      { 
        url: '/sitemap', 
        changeFreq: 'weekly' as const, 
        priority: 0.3,
        lastModified: new Date().toISOString()
      },
    ]

    // Add static pages to sitemap
    staticPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}${page.url}`,
        lastModified: page.lastModified,
        changeFreq: page.changeFreq,
        priority: page.priority
      })
    })

    // Fetch dynamic pages from Sanity
    const [pages, projects, products, services] = await Promise.all([
      // Pages
      client.fetch(`*[_type == "page" && defined(slug.current)] {
        _id,
        title,
        "slug": slug.current,
        _updatedAt
      }`),
      // Projects
      client.fetch(`*[_type == "project" && defined(slug.current)] {
        _id,
        name,
        "slug": slug.current,
        _updatedAt
      }`),
      // Products
      client.fetch(`*[_type == "product" && defined(slug.current)] {
        _id,
        name,
        "slug": slug.current,
        _updatedAt
      }`),
      // Services
      client.fetch(`*[_type == "service" && defined(slug.current)] {
        _id,
        name,
        "slug": slug.current,
        _updatedAt
      }`)
    ])

    // Add dynamic pages
    pages.forEach((page: SitemapPage) => {
      sitemap.push({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page._updatedAt).toISOString(),
        changeFreq: 'weekly',
        priority: 0.7
      })
    })

    // Add projects
    projects.forEach((project: SitemapProject) => {
      sitemap.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project._updatedAt).toISOString(),
        changeFreq: 'monthly',
        priority: 0.6
      })
    })

    // Add products
    products.forEach((product: SitemapProduct) => {
      sitemap.push({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product._updatedAt).toISOString(),
        changeFreq: 'weekly',
        priority: 0.8
      })
    })

    // Add services
    services.forEach((service: SitemapService) => {
      sitemap.push({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service._updatedAt).toISOString(),
        changeFreq: 'weekly',
        priority: 0.8
      })
    })

    // Sort by priority (highest first) then by URL
    sitemap.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority
      }
      return a.url.localeCompare(b.url)
    })

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemap.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
} 