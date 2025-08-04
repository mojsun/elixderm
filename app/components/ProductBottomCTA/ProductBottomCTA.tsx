import styles from './ProductBottomCTA.module.css'

interface ProductBottomCTAProps {
  product: any // Will be typed properly later
}

export default function ProductBottomCTA({ product }: ProductBottomCTAProps) {
  const bottomCTA = product?.bottomCTA || {}

  return (
    <a href="/contact-us">
      <section className={styles.ctaRow2}>
        <div className={styles.ctaContainer}>
          <p>{bottomCTA.text || 'Loading...'}</p>
          <button className={styles.ctaRowButton}>
            {bottomCTA.buttonText || 'Loading...'}
          </button>
        </div>
      </section>
    </a>
  )
} 