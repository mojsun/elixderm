import { PortableTextBlock } from "sanity"

export type Product = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
  seo: {
    metaTitle: string
    metaDescription: string
    noIndex: boolean
  }
  hero: {
    subheading: string
    heading: string
    description: string
    image: string
    imageAlt: string
  }
  value: {
    heading: string
    description: string
    images: Array<{
      url: string
      alt: string
      heading: string
    }>
  }
  slider: {
    images: Array<{
      url: string
      alt: string
    }>
  }
  howItWorks: {
    title: string
    description: string
    steps: Array<{
      imageUrl: string
      imageAlt: string
      title: string
      description: string
    }>
  }
  topCTA: {
    text: string
  }
  features: {
    heading: string
    subheading: string
    centerImage: {
      url: string
      alt: string
    }
    items: Array<{
      image: string
      imageAlt: string
      heading: string
      subheading: string
    }>
  }
  middleCTA: {
    subheading: string
    heading: string
    ctaText: string
    image: string
    imageAlt: string
  }
  faq: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  bottomCTA: {
    text: string
    buttonText: string
  }
} 