'use client'

import Link from 'next/link'
import { Service } from '@/types/Service'
import styles from './ServicesMegaMenu.module.css'

interface ServicesMegaMenuProps {
  services: Service[]
  isOpen: boolean
  onClose: () => void
}

export default function ServicesMegaMenu({ services, isOpen, onClose }: ServicesMegaMenuProps) {
  if (!isOpen) return null

  return (
    <div className={`${styles.servicesMegaMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.servicesMenuContent}>
        {services.map((service) => (
          <div key={service._id} className={styles.serviceItem}>
            <Link 
              href={`/services/${service.slug}`}
              className={styles.serviceLink}
              onClick={onClose}
            >
              <p className={styles.serviceTitle}>
                {service.menuName || service.name}
                <span className={styles.serviceArrow}>→</span>
              </p>
              <p className={styles.serviceDescription}>
                {service.menuDescription || 'Learn more about this service'}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
