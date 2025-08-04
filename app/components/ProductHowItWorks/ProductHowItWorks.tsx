import styles from './ProductHowItWorks.module.css'

interface ProductHowItWorksProps {
  product: any // Will be typed properly later
}

export default function ProductHowItWorks({ product }: ProductHowItWorksProps) {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.hitContainer}>
        <div className={styles.hitTitles}>
          <h2>{product?.howItWorks?.title || 'Loading...'}</h2>
          <p>{product?.howItWorks?.description || 'Loading...'}</p>
        </div>
        <div className={styles.hitSteps}>
          {product?.howItWorks?.steps?.map((step: any, index: number) => (
            <div key={index} className={styles.hitStep}>
              <img src={step.imageUrl} alt={step.imageAlt} />
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 