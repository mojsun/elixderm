import Link from 'next/link'
import Image from 'next/image'
import styles from './WhoWeHelpHero.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpHeroProps {
  whoWeHelp: WhoWeHelp
}

export default function WhoWeHelpHero({ whoWeHelp }: WhoWeHelpHeroProps) {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.leftText}>
            <p>{whoWeHelp?.hero?.subheading || 'Loading...'}</p>
            <h1>{whoWeHelp?.hero?.heading || 'Loading...'}</h1>
            <p>{whoWeHelp?.hero?.description || 'Loading...'}</p>
            
            <div className={styles.buttonsHolder}>
              <Link href="/contact-us">
                <button className={styles.heroCTAButton}>Get a Quote</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightB}>
            {whoWeHelp?.hero?.image && (
              <Image 
                src={whoWeHelp.hero.image} 
                alt={whoWeHelp?.hero?.imageAlt || 'Who we help image'}
                width={400}
                height={300}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
