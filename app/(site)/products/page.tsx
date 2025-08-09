import { getProducts } from '@/sanity/sanity-utils'
import { Product } from '@/types/Product'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Breadcrumb/Breadcrumb'
import PageHero from "@/app/components/PageHero"
import ProductGrid from './components/ProductGrid'

export const metadata: Metadata = {
  title: 'Private Label Products - Custom Beauty Manufacturing',
  description: 'Discover our range of private label beauty products. Custom formulations, no MOQ requirements, and fast turnarounds for your brand.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Private Label Products - Custom Beauty Manufacturing',
    description: 'Discover our range of private label beauty products. Custom formulations, no MOQ requirements, and fast turnarounds for your brand.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/products`,
    siteName: 'Elixderm',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Products - Custom Beauty Manufacturing',
    description: 'Discover our range of private label beauty products. Custom formulations, no MOQ requirements, and fast turnarounds for your brand.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.elixderm.com'}/products`,
  },
}

export default async function ProductsPage() {
  const products = await getProducts()

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products' }
  ]

  return (
    <div className="products-page">
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="products-page-main">
        <PageHero 
          title="Private Label Products" 
          subtitle="Discover the type of private label products we can create for your brand. From skincare essentials to luxury treatments, take a look at our manufacturing capabilities."
        />
        
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
