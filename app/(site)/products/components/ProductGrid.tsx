import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/Product'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
}

// Category titles mapping
const categoryTitles: Record<string, string> = {
  'hair-care': 'Hair Care',
  'body-care': 'Body Care & Wellness', 
  'specialized': 'Specialized Lines',
  'skin-care': 'Face & Skin Care'
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <section className={styles.productGrid}>
        <div className={styles.gridContainer}>
          <div className={styles.emptyState}>
            <h3>No Products Available</h3>
            <p>We&apos;re working on adding new private label products. Please check back soon or contact us for custom solutions.</p>
          </div>
        </div>
      </section>
    )
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'specialized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  // Ensure consistent category order
  const categories = ['hair-care', 'body-care', 'specialized', 'skin-care']

  const renderProduct = (product: Product) => {
    // Get the first slider image as OG image, with fallback
    const productImage = product.slider?.images?.[0]?.url
    const productImageAlt = product.slider?.images?.[0]?.alt || `${product.name} product image`
    const productHeading = product.hero?.heading || product.name
    const productDescription = product.hero?.description || `Discover our ${product.name} solutions`

    return (
      <Link 
        key={product._id} 
        href={`/products/${product.slug}`}
        className={styles.productCard}
      >
        <div className={styles.imageContainer}>
          {productImage ? (
            <Image
              src={productImage}
              alt={productImageAlt}
              width={400}
              height={300}
              className={styles.productImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        <div className={styles.cardContent}>
          <h3 className={styles.productTitle}>{productHeading}</h3>
          <p className={styles.productDescription}>{productDescription}</p>
          <div className={styles.ctaContainer}>
            <span className={styles.ctaText}>
              Explore this product
              <svg 
                className={styles.arrowIcon} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className={styles.productGrid}>
      <div className={styles.productGridContainer}>
        {categories.map(category => {
          const categoryProducts = productsByCategory[category]
          
          // Only render category if it has products
          if (!categoryProducts || categoryProducts.length === 0) {
            return null
          }

          return (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>{categoryTitles[category] || category}</h2>
                <div className={styles.categoryDivider}></div>
              </div>
              
              <div className={styles.gridContainer}>
                {categoryProducts.map(renderProduct)}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
