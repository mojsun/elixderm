export interface ProductOptions {
  _id: string
  _type: 'productOptions'
  name: string
  title: string
  subtitle?: string
  plan1: {
    title: string
    features: string[]
  }
  plan2: {
    title: string
    features: string[]
    featured?: boolean
  }
  plan3: {
    title: string
    features: string[]
  }
  ctaText: string
}
