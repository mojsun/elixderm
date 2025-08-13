import Image from 'next/image'
import styles from './ServiceProductRange.module.css'
import { Service } from '@/types/Service'

interface ServiceProductRangeProps {
  service: Service
}

export default function ServiceProductRange({ service }: ServiceProductRangeProps) {
  if (!service?.productRange?.items?.length) {
    return null
  }

  const items = service.productRange.items
  const leftItems = items.slice(0, Math.ceil(items.length / 2))
  const rightItems = items.slice(Math.ceil(items.length / 2))

  return (
    <div className={styles.featuresParent}>
      <div className={styles.hitTitles}>
        <h2>{service.productRange.heading}</h2>
        <p>{service.productRange.description}</p>
      </div>
      
      {/* Desktop Layout */}
      <section className={styles.productFeatures}>
        <div className={styles.featuresContainer}>
          {leftItems.map((item, index) => (
            <div key={index}>
              <div className={styles.featureHolder}>
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.imageAlt || item.title}
                    width={75}
                    height={75}
                  />
                )}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.featuresContainer}>
          {rightItems.map((item, index) => (
            <div key={index}>
              <div className={styles.featureHolder}>
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.imageAlt || item.title}
                    width={75}
                    height={75}
                  />
                )}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Layout */}
      <section className={styles.productFeaturesMobile}>
        <div className={styles.featureHolderMobile}>
          <div className={styles.featuresContainer}>
            {leftItems.map((item, index) => (
              <div key={index} className={styles.featureHolder}>
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.imageAlt || item.title}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.featuresContainer}>
            {rightItems.map((item, index) => (
              <div key={index} className={styles.featureHolder}>
                {item.image && (
                  <Image 
                    src={item.image} 
                    alt={item.imageAlt || item.title}
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
