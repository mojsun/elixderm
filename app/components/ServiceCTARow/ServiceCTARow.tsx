import Link from 'next/link'
import styles from './ServiceCTARow.module.css'
import { Service } from '@/types/Service'

interface ServiceCTARowProps {
  service: Service
  type?: 'top' | 'bottom'
}

export default function ServiceCTARow({ service, type = 'top' }: ServiceCTARowProps) {
  if (type === 'bottom') {
    const ctaData = service?.bottomCTA
    if (!ctaData) {
      return null
    }

    return (
      <Link href={ctaData.url || '/contact-us'} target="_blank">
        <section className={styles.ctaRow2}>
          <div className={styles.ctaContainer}>
            <p>{ctaData.text}</p>
            <button className={styles.ctaRowButton}>
              {ctaData.buttonText || 'Book a Call Now!'}
            </button>
          </div>
        </section>
      </Link>
    )
  }

  const ctaData = service?.topCTA
  if (!ctaData) {
    return null
  }

  return (
    <Link href={ctaData.url || '/contact-us'} target="_blank">
      <section className={styles.ctaRow}>
        <p>{ctaData.text}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
          <g strokeWidth="9" stroke="hsl(0, 0%, 100%)" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(315, 400, 400)">
            <line x1="175" y1="175" x2="625" y2="625" markerEnd="url(#SvgjsMarker1748)"></line>
          </g>
          <defs>
            <marker markerWidth="15" markerHeight="15" refX="7.5" refY="7.5" viewBox="0 0 15 15" orient="auto" id="SvgjsMarker1748">
              <polygon points="0,15 7.5,7.5 0,0 15,7.5" fill="hsl(0, 0%, 100%)"></polygon>
            </marker>
          </defs>
        </svg>
      </section>
    </Link>
  )
}
