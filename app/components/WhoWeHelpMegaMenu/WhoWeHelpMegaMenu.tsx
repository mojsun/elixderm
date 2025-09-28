'use client'

import Link from 'next/link'
import styles from './WhoWeHelpMegaMenu.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpMegaMenuProps {
  whoWeHelps?: WhoWeHelp[]
  isOpen?: boolean
  onClose?: () => void
}

// Default who we help items as fallback (based on your specific requirements)
const defaultWhoWeHelps: WhoWeHelp[] = [
  { _id: '1', _createdAt: new Date(), name: 'Barbershops & Men\'s Grooming Brands', slug: 'barbershops-mens-grooming', menuName: 'Barbershops & Men\'s Grooming Brands', category: 'beauty-professionals', showInMenu: true },
  { _id: '2', _createdAt: new Date(), name: 'Tattoo Studios', slug: 'tattoo-studios', menuName: 'Tattoo Studios', category: 'beauty-professionals', showInMenu: true },
  { _id: '3', _createdAt: new Date(), name: 'Organic Skincare Shops', slug: 'organic-skincare-shops', menuName: 'Organic Skincare Shops', category: 'retail-businesses', showInMenu: true },
  { _id: '4', _createdAt: new Date(), name: 'Professional Beauty Distributors & Wholesalers', slug: 'beauty-distributors-wholesalers', menuName: 'Professional Beauty Distributors & Wholesalers', category: 'distributors', showInMenu: true },
  { _id: '5', _createdAt: new Date(), name: 'Pet Groomers & Pet Retailers', slug: 'pet-groomers-retailers', menuName: 'Pet Groomers & Pet Retailers', category: 'specialized-markets', showInMenu: true },
]

// Category titles mapping
const categoryTitles: Record<string, string> = {
  'beauty-professionals': 'Beauty & Grooming Professionals',
  'retail-businesses': 'Retail Businesses',
  'distributors': 'Distributors & Wholesalers',
  'specialized-markets': 'Specialized Markets'
}

export default function WhoWeHelpMegaMenu({ 
  whoWeHelps = defaultWhoWeHelps, 
  isOpen = false,
  onClose 
}: WhoWeHelpMegaMenuProps) {
  // Filter items that should show in menu
  const menuWhoWeHelps = whoWeHelps.filter(item => item.showInMenu !== false)
  
  // Group items by category
  const whoWeHelpsByCategory = menuWhoWeHelps.reduce((acc, item) => {
    const category = item.category || 'beauty-professionals'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, WhoWeHelp[]>)

  // Using 3 main categories to organize your specific client types
  const categories = ['beauty-professionals', 'retail-businesses', 'distributors', 'specialized-markets']
  const columns = categories.map(category => ({
    title: categoryTitles[category],
    items: whoWeHelpsByCategory[category] || []
  }))

  const handleLinkClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className={`${styles.megaMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.megaMenuHeader}>
        <p className={styles.megaMenuMainTitle}>Industries & Clients We Serve</p>
      </div>
      
      <div className={styles.megaMenuContent}>
        {columns.map((column, columnIndex) => (
          // Only render column if it has items
          column.items.length > 0 && (
            <div key={columnIndex} className={styles.megaMenuColumn}>
              <p className={styles.megaMenuTitle}>{column.title}</p>
              <ul className={styles.megaMenuList}>
                {column.items.map((item) => (
                  <li key={item._id}>
                    <Link 
                      href={`/who-we-help/${item.slug}`}
                      className={styles.megaMenuItem}
                      onClick={handleLinkClick}
                    >
                      {item.menuName || item.name}
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
          href="/who-we-help" 
          className={styles.megaMenuMainCta}
          onClick={handleLinkClick}
        >
          <span className={styles.ctaText}>View All Client Types</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
    </div>
  )
}
