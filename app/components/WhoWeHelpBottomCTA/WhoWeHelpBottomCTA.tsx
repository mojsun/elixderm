import Link from 'next/link'
import styles from './WhoWeHelpBottomCTA.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpBottomCTAProps {
  whoWeHelp: WhoWeHelp
}

export default function WhoWeHelpBottomCTA({ whoWeHelp }: WhoWeHelpBottomCTAProps) {
  const bottomCTA = whoWeHelp?.bottomCTA || { text: '', buttonText: '' }

  return (
    <Link href="/contact-us">
      <section className={styles.ctaRow2}>
        <div className={styles.ctaContainer}>
          <p>{bottomCTA.text || 'Ready to start your cosmetic manufacturing journey? Get in touch with our experts today.'}</p>
          <button className={styles.ctaRowButton}>
            {bottomCTA.buttonText || 'Contact Us Now'}
          </button>
        </div>
      </section>
    </Link>
  )
}
