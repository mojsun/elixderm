export type Author = {
  _id: string
  _createdAt: string
  name: string
  slug: string
  image: {
    url: string
    alt: string
  }
  title: string
  bio: string
  linkedinUrl?: string
  expertise?: string[]
  featured?: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}
