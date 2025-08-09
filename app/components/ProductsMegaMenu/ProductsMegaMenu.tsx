'use client'

import Link from 'next/link'
import styles from './ProductsMegaMenu.module.css'
import { Product } from '@/types/Product'

interface ProductsMegaMenuProps {
  products?: Product[]
  isOpen?: boolean
  onClose?: () => void
}

// Default products list based on the user's requirements (fallback)
const defaultProducts: Product[] = [
  { _id: '1', _createdAt: new Date(), name: 'Private Label Body Scrub', slug: 'private-label-body-scrubs', menuName: 'Body Scrub', category: 'body-care', showInMenu: true },
  { _id: '2', _createdAt: new Date(), name: 'Private Label Castor Oil', slug: 'private-label-castor-oil', menuName: 'Castor Oil', category: 'specialized', showInMenu: true },
  { _id: '3', _createdAt: new Date(), name: 'Private Label Conditioners', slug: 'private-label-hair-conditioner', menuName: 'Conditioners', category: 'hair-care', showInMenu: true },
  { _id: '4', _createdAt: new Date(), name: 'Private Label Dandruff Shampoo and Conditioners', slug: 'private-label-dandruff-shampoo-conditioner', menuName: 'Dandruff Shampoo & Conditioners', category: 'hair-care', showInMenu: true },
  { _id: '5', _createdAt: new Date(), name: 'Private Label Massage Oil', slug: 'private-label-massage-oil', menuName: 'Massage Oil', category: 'body-care', showInMenu: true },
  { _id: '6', _createdAt: new Date(), name: 'Private Label Men\'s Hair Products', slug: 'private-label-men-hair-care', menuName: 'Men\'s Hair Products', category: 'hair-care', showInMenu: true },
  { _id: '7', _createdAt: new Date(), name: 'Private Label Natural Hair Products', slug: 'private-label-natural-hair-products', menuName: 'Natural Hair Products', category: 'hair-care', showInMenu: true },
  { _id: '8', _createdAt: new Date(), name: 'Private Label Organic Hair Products', slug: 'private-label-organic-hair-products', menuName: 'Organic Hair Products', category: 'hair-care', showInMenu: true },
  { _id: '9', _createdAt: new Date(), name: 'Private Label Pet\'s Hair Products', slug: 'private-label-pet-hair-products', menuName: 'Pet Hair Products', category: 'specialized', showInMenu: true },
  { _id: '10', _createdAt: new Date(), name: 'Private Label Soap Bars', slug: 'private-label-soap-bar', menuName: 'Soap Bars', category: 'body-care', showInMenu: true },
  { _id: '11', _createdAt: new Date(), name: 'Private Label Vegan Haircare', slug: 'private-label-vegan-hair-care', menuName: 'Vegan Haircare', category: 'hair-care', showInMenu: true },
]

// Category titles mapping
const categoryTitles: Record<string, string> = {
  'hair-care': 'Hair Care',
  'body-care': 'Body Care & Wellness',
  'specialized': 'Specialized Lines',
  'skin-care': 'Face & Skin Care'
}

export default function ProductsMegaMenu({ 
  products = defaultProducts, 
  isOpen = false,
  onClose 
}: ProductsMegaMenuProps) {
  // Filter products that should show in menu
  const menuProducts = products.filter(product => product.showInMenu !== false)
  
  // Group products by category
  const productsByCategory = menuProducts.reduce((acc, product) => {
    const category = product.category || 'specialized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  // Ensure we have 4 columns like reference
  const categories = ['hair-care', 'body-care', 'specialized', 'skin-care']
  const columns = categories.map(category => ({
    title: categoryTitles[category],
    products: productsByCategory[category] || []
  }))

  const handleLinkClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className={`${styles.megaMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.megaMenuHeader}>
        <p className={styles.megaMenuMainTitle}>Private Label Products We Manufacture</p>
      </div>
      
      <div className={styles.megaMenuContent}>
        {columns.map((column, columnIndex) => (
          // Only render column if it has products
          column.products.length > 0 && (
            <div key={columnIndex} className={styles.megaMenuColumn}>
              <h4 className={styles.megaMenuTitle}>{column.title}</h4>
              <ul className={styles.megaMenuList}>
                {column.products.map((product) => (
                  <li key={product._id}>
                    <Link 
                      href={`/products/${product.slug}`}
                      className={styles.megaMenuItem}
                      onClick={handleLinkClick}
                    >
                      {product.menuName || product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
      
      <div className={styles.megaMenuFooter}>
        <Link 
          href="/products" 
          className={styles.megaMenuMainCta}
          onClick={handleLinkClick}
        >
          <span className={styles.ctaText}>View All Products</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
    </div>
  )
}