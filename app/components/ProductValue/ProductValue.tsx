import Image from 'next/image'
import styles from './ProductValue.module.css'
import { Product } from '@/types/Product'

interface ProductValueProps {
  product: Product
}

interface ValueImage {
  url: string
  alt: string
  heading: string
}

export default function ProductValue({ product }: ProductValueProps) {
  return (
    <section className={styles.valueContainer}>
      <div className={styles.value}>
        <div className={styles.valueLeft}>
          <div className={styles.valueLeftText}>
            <h2>{product?.value?.heading || 'Loading...'}</h2>
            <p>{product?.value?.description || 'Loading...'}</p>
          </div>
        </div>
        <div className={styles.valueRight}>
          <div className={styles.valueBox}>
            {product?.value?.images?.slice(0, 2)?.map((image: ValueImage, index: number) => (
              <div key={index} className={styles.valueHolder}>
                <Image src={image.url} alt={image.alt} width={200} height={150} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
          <div className={styles.valueBox}>
            {product?.value?.images?.slice(2, 4)?.map((image: ValueImage, index: number) => (
              <div key={index + 2} className={styles.valueHolder}>
                <Image src={image.url} alt={image.alt} width={200} height={150} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 