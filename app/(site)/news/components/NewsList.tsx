'use client'

import { useState, useMemo } from 'react'
import { News } from '@/types/News'
import NewsItem from './NewsItem'
import FilterControls, { DateFilter } from './FilterControls'
import styles from './NewsList.module.css'

interface NewsListProps {
  newsItems: News[]
}

export default function NewsList({ newsItems }: NewsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' })

  // Filter and search logic
  const filteredNewsItems = useMemo(() => {
    if (!newsItems || newsItems.length === 0) return []

    let filtered = [...newsItems]

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        (item.content && item.content.some(block => {
          if ('children' in block && Array.isArray(block.children)) {
            return block.children.some((child: { text?: string }) => 
              child.text && child.text.toLowerCase().includes(searchLower)
            )
          }
          return false
        }))
      )
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const currentTime = now.getTime()

      filtered = filtered.filter(item => {
        const itemDate = new Date(item.publishDate)
        const itemTime = itemDate.getTime()

        switch (dateFilter) {
          case 'custom':
            if (customDateRange.start && customDateRange.end) {
              const startDate = new Date(customDateRange.start)
              const endDate = new Date(customDateRange.end)
              endDate.setHours(23, 59, 59, 999) // Include the entire end date
              return itemTime >= startDate.getTime() && itemTime <= endDate.getTime()
            }
            return true
          default:
            return true
        }
      })
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

    return filtered
  }, [newsItems, searchTerm, dateFilter, customDateRange])

  if (!newsItems || newsItems.length === 0) {
    return (
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <h2>No News Available</h2>
            <p>We haven&apos;t published any news yet. Check back soon for the latest updates!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          customDateRange={customDateRange}
          onCustomDateRangeChange={setCustomDateRange}
          totalResults={filteredNewsItems.length}
        />

        {filteredNewsItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No Articles Found</h2>
            <p>No articles match your current filters. Try adjusting your search terms or date range.</p>
          </div>
        ) : (
          <div className={styles.newsList}>
            {filteredNewsItems.map((newsItem) => (
              <NewsItem 
                key={newsItem._id} 
                newsItem={newsItem} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
