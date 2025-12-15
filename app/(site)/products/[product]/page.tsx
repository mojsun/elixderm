import { getProduct, getProducts } from '@/sanity/sanity-utils'
import { Product } from '@/types/Product'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import ProductHero from '@/app/components/ProductHero/ProductHero'
import ProductValue from '@/app/components/ProductValue/ProductValue'
import ProductImageSlider from '@/app/components/ProductImageSlider/ProductImageSlider'
import ProductHowItWorks from '@/app/components/ProductHowItWorks/ProductHowItWorks'
import ProductTopCTA from '@/app/components/ProductTopCTA/ProductTopCTA'
import ProductFeatures from '@/app/components/ProductFeatures/ProductFeatures'
import ProductMiddleCTA from '@/app/components/ProductMiddleCTA/ProductMiddleCTA'
import ProductOptionsModule from '@/app/components/ProductOptionsModule/ProductOptionsModule'
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
  
  // Get the first slider image as OG image, fallback to hero image
  const ogImage = product.slider?.images?.[0]?.url || product.hero?.image
  const ogImageAlt = product.slider?.images?.[0]?.alt || product.hero?.imageAlt || `${product.name} product image`
  
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
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo?.metaTitle || product.name,
      description: product.seo?.metaDescription || `Learn more about ${product.name}`,
      images: ogImage ? [
        {
          url: ogImage,
          alt: ogImageAlt,
        }
      ] : [],
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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name }
  ]

  return (
    <div className="product-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="product-page-main" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <ProductHero product={product} />
        <ProductValue product={product} />
        <ProductImageSlider product={product} />
        <ProductHowItWorks product={product} />
        <ProductTopCTA product={product} />
        <ProductFeatures product={product} />
        <ProductMiddleCTA product={product} />
        {product.productOptions && (
          <ProductOptionsModule 
            options={product.productOptions}
          />
        )}
        <ProductFAQ product={product} />
        <ProductBottomCTA product={product} />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    product: product.slug,
  }))
} 