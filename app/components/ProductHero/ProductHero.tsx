import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductHero.module.css'
import { Product } from '@/types/Product'

interface ProductHeroProps {
  product: Product
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.leftText}>
            <p>{product?.hero?.subheading || 'Loading...'}</p>
            <h1>{product?.hero?.heading || 'Loading...'}</h1>
            <p>{product?.hero?.description || 'Loading...'}</p>
            
            <div className={styles.buttonsHolder}>
              <Link href="/contact-us">
                <button className={styles.heroCTAButton}>Get a Quote</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightB}>
            {product?.hero?.image && (
              <Image 
                src={product.hero.image} 
                alt={product?.hero?.imageAlt || 'Product image'}
                width={400}
                height={300}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 