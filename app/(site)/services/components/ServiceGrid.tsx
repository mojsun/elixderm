import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/types/Service'
import styles from './ServiceGrid.module.css'

interface ServiceGridProps {
  services: Service[]
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  // Handle empty state
  if (!services || services.length === 0) {
    return (
      <section className={styles.serviceGrid}>
        <div className={styles.gridContainer}>
          <div className={styles.emptyState}>
            <h3>No Services Available</h3>
            <p>We&apos;re working on adding new services. Please check back soon or contact us for custom solutions.</p>
          </div>
        </div>
      </section>
    )
  }

  const renderService = (service: Service) => {
    // Get service image and details from hero section
    const serviceImage = service.hero?.image
    const serviceImageAlt = service.hero?.imageAlt || `${service.name} service image`
    const serviceHeading = service.hero?.heading || service.name
    const serviceDescription = service.hero?.description || `Discover our ${service.name} solutions`

    return (
      <Link 
        key={service._id} 
        href={`/services/${service.slug}`}
        className={styles.serviceCard}
      >
        <div className={styles.imageContainer}>
          {serviceImage ? (
            <Image
              src={serviceImage}
              alt={serviceImageAlt}
              width={400}
              height={250}
              className={styles.serviceImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        <div className={styles.cardContent}>
          <h3 className={styles.serviceTitle}>{serviceHeading}</h3>
          <p className={styles.serviceDescription}>{serviceDescription}</p>
          <div className={styles.ctaContainer}>
            <span className={styles.ctaText}>
              Learn more about this service
              <svg 
                className={styles.arrowIcon} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className={styles.serviceGrid}>
      <div className={styles.serviceGridContainer}>
        <div className={styles.gridContainer}>
          {services.map(renderService)}
        </div>
      </div>
    </section>
  )
}
