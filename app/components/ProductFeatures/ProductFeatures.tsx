import Image from 'next/image'
import styles from './ProductFeatures.module.css'
import { Product } from '@/types/Product'

interface ProductFeaturesProps {
  product: Product
}

interface Feature {
  image: string
  imageAlt: string
  heading: string
  subheading: string
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  const features = product?.features || { heading: '', subheading: '', centerImage: { url: '', alt: '' }, items: [] }
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
          {leftFeatures.map((feature: Feature, index: number) => (
            <div key={index}>
              <div className={styles.featureHolder}>
                <Image src={feature.image} alt={feature.imageAlt} width={120} height={120} />
                <div>
                  <h3>{feature.heading}</h3>
                  <p>{feature.subheading}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.productCenterContainer}>
          <Image 
            className={styles.productCenter} 
            src={features.centerImage?.url} 
            alt={features.centerImage?.alt}
            width={350}
            height={350}
          />
        </div>
        <div className={styles.featuresContainer}>
          {rightFeatures.map((feature: Feature, index: number) => (
            <div key={index + 3}>
              <div className={styles.featureHolder}>
                <Image src={feature.image} alt={feature.imageAlt} width={120} height={120} />
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
          <Image 
            className={styles.productCenter} 
            src={features.centerImage?.url} 
            alt={features.centerImage?.alt}
            width={350}
            height={350}
          />
        </div>
        <div className={styles.featureHolderMobile}>
          <div className={styles.featuresContainer}>
            {leftFeatures.map((feature: Feature, index: number) => (
              <div key={index}>
                <div className={styles.featureHolder}>
                  <Image src={feature.image} alt={feature.imageAlt} width={120} height={120} />
                  <div>
                    <h3>{feature.heading}</h3>
                    <p>{feature.subheading}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.featuresContainer}>
            {rightFeatures.map((feature: Feature, index: number) => (
              <div key={index + 3}>
                <div className={styles.featureHolder}>
                  <Image src={feature.image} alt={feature.imageAlt} width={120} height={120} />
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