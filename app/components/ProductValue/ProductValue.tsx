import styles from './ProductValue.module.css'

interface ProductValueProps {
  product: any // Will be typed properly later
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
            {product?.value?.images?.slice(0, 2)?.map((image: any, index: number) => (
              <div key={index} className={styles.valueHolder}>
                <img src={image.url} alt={image.alt} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
          <div className={styles.valueBox}>
            {product?.value?.images?.slice(2, 4)?.map((image: any, index: number) => (
              <div key={index + 2} className={styles.valueHolder}>
                <img src={image.url} alt={image.alt} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 