import Link from 'next/link'
import styles from './NewsSection.module.css'

export default function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.newsContent}>
          <div className={styles.newsInfo}>
            <h3 className={styles.newsTitle}>Stay Updated</h3>
            <p className={styles.newsDescription}>
              Follow our latest developments, industry insights, and company milestones.
            </p>
          </div>
          <Link href="/news" className={styles.newsLink}>
            <span className={styles.linkText}>Latest News & Updates</span>
            <svg 
              className={styles.linkIcon} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
