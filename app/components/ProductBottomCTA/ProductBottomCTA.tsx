import Link from 'next/link'
import styles from './ProductBottomCTA.module.css'
import { Product } from '@/types/Product'

interface ProductBottomCTAProps {
  product: Product
}

export default function ProductBottomCTA({ product }: ProductBottomCTAProps) {
  const bottomCTA = product?.bottomCTA || { text: '', buttonText: '' }

  return (
    <Link href="/contact-us">
      <section className={styles.ctaRow2}>
        <div className={styles.ctaContainer}>
          <p>{bottomCTA.text || 'Loading...'}</p>
          <button className={styles.ctaRowButton}>
            {bottomCTA.buttonText || 'Loading...'}
          </button>
        </div>
      </section>
    </Link>
  )
} 