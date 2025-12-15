export interface ProductOptions {
  _id: string
  _type: 'productOptions'
  name: string
  title?: string
  subtitle?: string
  plans: ProductPlan[]
  cta: {
    text: string
    link: string
    openInNewTab?: boolean
  }
  showOnProducts?: Array<{
    _ref: string
    _type: 'reference'
  }>
}

export interface ProductPlan {
  name: string
  description?: string
  products: {
    shampoos: number
    conditioners: number
  }
  labelIncluded: boolean
  packSizes: string[]
  timeline: string
  featured?: boolean
  price?: string
}
