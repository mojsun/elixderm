import Image from 'next/image'
import styles from './ServiceFeaturesOverview.module.css'
import { Service } from '@/types/Service'

interface ServiceFeaturesOverviewProps {
  service: Service
}

export default function ServiceFeaturesOverview({ service }: ServiceFeaturesOverviewProps) {
  if (!service?.featuresOverview?.items?.length) {
    return null
  }

  return (
    <section className={styles.howItWorks}>
      <div className={styles.hitContainer}></div>
      <div className={styles.hitSteps}>
        {service.featuresOverview.items.map((item, index) => (
          <div key={index} className={styles.hitStep}>
            {item.image && (
              <Image 
                src={item.image} 
                alt={item.imageAlt || item.title}
                width={85}
                height={85}
              />
            )}
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
