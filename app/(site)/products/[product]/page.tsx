import { getProduct, getProducts } from '@/sanity/sanity-utils'
import { Product } from '@/types/Product'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductHero from '@/app/components/ProductHero/ProductHero'
import ProductValue from '@/app/components/ProductValue/ProductValue'
import ProductImageSlider from '@/app/components/ProductImageSlider/ProductImageSlider'
import ProductHowItWorks from '@/app/components/ProductHowItWorks/ProductHowItWorks'
import ProductTopCTA from '@/app/components/ProductTopCTA/ProductTopCTA'
import ProductFeatures from '@/app/components/ProductFeatures/ProductFeatures'
import ProductMiddleCTA from '@/app/components/ProductMiddleCTA/ProductMiddleCTA'
import ProductFAQ from '@/app/components/ProductFAQ/ProductFAQ'
import ProductBottomCTA from '@/app/components/ProductBottomCTA/ProductBottomCTA'

type Props = {
  params: Promise<{ product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: productSlug } = await params
  const product = await getProduct(productSlug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'
  
  return {
    title: product.seo?.metaTitle || product.name,
    description: product.seo?.metaDescription || `Learn more about ${product.name}`,
    robots: {
      index: !product.seo?.noIndex,
      follow: !product.seo?.noIndex,
    },
    openGraph: {
      title: product.seo?.metaTitle || product.name,
      description: product.seo?.metaDescription || `Learn more about ${product.name}`,
      url: `${baseUrl}/products/${product.slug}`,
      siteName: 'Elixderm',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo?.metaTitle || product.name,
      description: product.seo?.metaDescription || `Learn more about ${product.name}`,
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { product: productSlug } = await params
  const product = await getProduct(productSlug)

  if (!product) {
    return notFound()
  }

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <ProductHero product={product} />
      <ProductValue product={product} />
      <ProductImageSlider product={product} />
      <ProductHowItWorks product={product} />
      <ProductTopCTA product={product} />
      <ProductFeatures product={product} />
      <ProductMiddleCTA product={product} />
      <ProductFAQ product={product} />
      <ProductBottomCTA product={product} />
    </main>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    product: product.slug,
  }))
} 