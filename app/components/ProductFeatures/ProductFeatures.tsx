import styles from './ProductFeatures.module.css'

interface ProductFeaturesProps {
  product: any // Will be typed properly later
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  const features = product?.features || {}
  const leftFeatures = features.items?.slice(0, 3) || []
  const rightFeatures = features.items?.slice(3, 6) || []

  return (
    <div className={styles.featuresParent}>
      <div className={styles.hitTitles}>
        <h2>{features.heading || 'Loading...'}</h2>
        <p>{features.subheading || 'Loading...'}</p>
      </div>
      
      {/* Desktop Layout */}
      <section className={styles.productFeatures}>
        <div className={styles.featuresContainer}>
          {leftFeatures.map((feature: any, index: number) => (
            <div key={index}>
              <div className={styles.featureHolder}>
                <img src={feature.image} alt={feature.imageAlt} />
                <div>
                  <h3>{feature.heading}</h3>
                  <p>{feature.subheading}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.productCenterContainer}>
          <img 
            className={styles.productCenter} 
            src={features.centerImage?.url} 
            alt={features.centerImage?.alt} 
          />
        </div>
        <div className={styles.featuresContainer}>
          {rightFeatures.map((feature: any, index: number) => (
            <div key={index + 3}>
              <div className={styles.featureHolder}>
                <img src={feature.image} alt={feature.imageAlt} />
                <div>
                  <h3>{feature.heading}</h3>
                  <p>{feature.subheading}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Layout */}
      <section className={styles.productFeaturesMobile}>
        <div className={styles.productCenterContainer}>
          <img 
            className={styles.productCenter} 
            src={features.centerImage?.url} 
            alt={features.centerImage?.alt} 
          />
        </div>
        <div className={styles.featureHolderMobile}>
          <div className={styles.featuresContainer}>
            {leftFeatures.map((feature: any, index: number) => (
              <div key={index}>
                <div className={styles.featureHolder}>
                  <img src={feature.image} alt={feature.imageAlt} />
                  <div>
                    <h3>{feature.heading}</h3>
                    <p>{feature.subheading}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.featuresContainer}>
            {rightFeatures.map((feature: any, index: number) => (
              <div key={index + 3}>
                <div className={styles.featureHolder}>
                  <img src={feature.image} alt={feature.imageAlt} />
                  <div>
                    <h3>{feature.heading}</h3>
                    <p>{feature.subheading}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 