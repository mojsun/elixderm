'use client'

import { News } from '@/types/News'
import NewsItem from './NewsItem'
import styles from './NewsList.module.css'

interface NewsListProps {
  newsItems: News[]
}

export default function NewsList({ newsItems }: NewsListProps) {
  if (!newsItems || newsItems.length === 0) {
    return (
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <h2>No News Available</h2>
            <p>We haven't published any news yet. Check back soon for the latest updates!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.newsList}>
          {newsItems.map((newsItem) => (
            <NewsItem 
              key={newsItem._id} 
              newsItem={newsItem} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
