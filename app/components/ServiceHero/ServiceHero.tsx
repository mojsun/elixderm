import Link from 'next/link'
import Image from 'next/image'
import styles from './ServiceHero.module.css'
import { Service } from '@/types/Service'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.leftText}>
            <p>{service?.hero?.subheading || 'Formulating Beauty Excellence'}</p>
            <h1>{service?.hero?.heading || service?.name || 'Loading...'}</h1>
            <p>{service?.hero?.description || 'Loading...'}</p>
            
            <div className={styles.buttonsHolder}>
              <Link href={service?.hero?.ctaUrl || '/contact-us'} target={service?.hero?.ctaUrl ? '_blank' : '_self'}>
                <button className={styles.heroCTAButton}>
                  {service?.hero?.ctaText || 'Book a Call'}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightB}>
            {service?.hero?.image && (
              <Image 
                src={service.hero.image} 
                alt={service?.hero?.imageAlt || `${service?.name} service image`}
                width={500}
                height={500}
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '500px',
                  objectFit: 'contain'
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
