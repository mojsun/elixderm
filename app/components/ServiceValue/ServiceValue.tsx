import Image from 'next/image'
import styles from './ServiceValue.module.css'
import { Service } from '@/types/Service'

interface ServiceValueProps {
  service: Service
}

export default function ServiceValue({ service }: ServiceValueProps) {
  if (!service?.value) {
    return null
  }

  return (
    <section className={styles.valueContainer}>
      <div className={styles.value}>
        <div className={styles.right}>
          <div className={styles.rightB}>
            {service.value.image && (
              <Image 
                src={service.value.image} 
                alt={service.value.imageAlt || 'Service value image'}
                width={400}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '400px',
                  objectFit: 'contain'
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.valueLeft}>
          <div className={styles.valueLeftText}>
            <h2>{service.value.heading}</h2>
            <p>{service.value.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
