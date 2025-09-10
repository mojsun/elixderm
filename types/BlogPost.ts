import { PortableTextBlock } from "sanity"
import { Author } from "./Author"

export type BlogPost = {
  _id: string
  _createdAt: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: {
    url: string
    alt: string
  }
  author?: Author | string
  publishedAt: string
  category: 'beauty-trends' | 'skincare' | 'haircare' | 'formulation-tips' | 'industry-news' | 'manufacturing' | 'sustainability'
  content: PortableTextBlock[]
  readingTime?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
  featured?: boolean
}

export type BlogCategory = {
  title: string
  value: string
  description?: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { title: 'Beauty Trends', value: 'beauty-trends', description: 'Latest trends in the beauty industry' },
  { title: 'Skincare', value: 'skincare', description: 'Tips and insights about skincare formulation' },
  { title: 'Haircare', value: 'haircare', description: 'Hair care products and formulation techniques' },
  { title: 'Formulation Tips', value: 'formulation-tips', description: 'Expert tips for cosmetic formulation' },
  { title: 'Industry News', value: 'industry-news', description: 'Latest news from the beauty industry' },
  { title: 'Manufacturing', value: 'manufacturing', description: 'Manufacturing processes and insights' },
  { title: 'Sustainability', value: 'sustainability', description: 'Sustainable practices in beauty manufacturing' },
]
