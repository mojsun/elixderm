import Link from 'next/link'
import Image from 'next/image'
import { WhoWeHelp } from '@/types/WhoWeHelp'
import styles from './WhoWeHelpGrid.module.css'

interface WhoWeHelpGridProps {
  whoWeHelps: WhoWeHelp[]
}

export default function WhoWeHelpGrid({ whoWeHelps }: WhoWeHelpGridProps) {
  if (!whoWeHelps?.length) {
    return (
      <div className={styles.emptyState}>
        <p>No target audiences available at the moment.</p>
      </div>
    )
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {whoWeHelps.map((whoWeHelp) => (
            <Link key={whoWeHelp._id} href={`/who-we-help/${whoWeHelp.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {whoWeHelp.hero?.image && (
                  <Image
                    src={whoWeHelp.hero.image}
                    alt={whoWeHelp.hero.imageAlt || whoWeHelp.name}
                    fill
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{whoWeHelp.name}</h3>
                <p className={styles.description}>{whoWeHelp.hero?.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
