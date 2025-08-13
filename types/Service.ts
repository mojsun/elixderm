import { PortableTextBlock } from "sanity"

export type Service = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  menuName?: string
  menuDescription?: string
  showInMenu?: boolean
  menuOrder?: number
  category?: 'formulation' | 'research' | 'testing' | 'consulting'
  seo?: {
    metaTitle: string
    metaDescription: string
    noIndex: boolean
  }
  hero?: {
    subheading?: string
    heading?: string
    description?: string
    ctaText?: string
    ctaUrl?: string
    image?: string
    imageAlt?: string
  }
  featuresOverview?: {
    items: Array<{
      image: string
      imageAlt: string
      title: string
      description: string
    }>
  }
  value?: {
    heading: string
    description: string
    image: string
    imageAlt: string
  }
  specialties?: {
    heading: string
    description: string
    items: Array<{
      image: string
      imageAlt: string
      title: string
      description: string
    }>
  }
  process?: {
    title: string
    description: string
    steps: Array<{
      image: string
      imageAlt: string
      title: string
      description: string
    }>
  }
  topCTA?: {
    text: string
    url: string
  }
  productRange?: {
    heading: string
    description: string
    items: Array<{
      image: string
      imageAlt: string
      title: string
      description: string
    }>
  }
  middleCTA?: {
    subheading: string
    heading: string
    ctaText: string
    ctaUrl: string
    image: string
    imageAlt: string
  }
  faq?: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  bottomCTA?: {
    text: string
    buttonText: string
    url: string
  }
}
