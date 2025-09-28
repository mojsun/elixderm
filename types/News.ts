import { PortableTextBlock } from "sanity"

export type NewsContent = PortableTextBlock | {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: any
  crop?: any
}

export type News = {
  _id: string
  _createdAt: Date
  title: string
  content: NewsContent[]
  publishDate: string
  isPublished?: boolean
}
