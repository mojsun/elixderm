'use client'

import { News, NewsContent } from '@/types/News'
import Image from 'next/image'
import styles from './NewsItem.module.css'

interface NewsItemProps {
  newsItem: News
}

export default function NewsItem({ newsItem }: NewsItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return months === 1 ? '1 month ago' : `${months} months ago`
    } else {
      const years = Math.floor(diffDays / 365)
      return years === 1 ? '1 year ago' : `${years} years ago`
    }
  }

  const renderContent = (content: NewsContent[]) => {
    return content.map((block: any, index: number) => {
      if (block._type === 'block') {
        // Handle text blocks
        const children = block.children || []
        const text = children.map((child: any) => child.text).join('')
        
        if (block.style === 'h3') {
          return <h3 key={index} className={styles.newsHeading}>{text}</h3>
        } else if (block.style === 'h4') {
          return <h4 key={index} className={styles.newsSubheading}>{text}</h4>
        } else if (block.style === 'blockquote') {
          return <blockquote key={index} className={styles.newsQuote}>{text}</blockquote>
        } else {
          return <p key={index} className={styles.newsText}>{text}</p>
        }
      } else if (block._type === 'image') {
        // Handle images
        const imageUrl = block.asset?.url
        if (!imageUrl) return null
        
        return (
          <div key={index} className={styles.newsImageContainer}>
            <Image
              src={imageUrl}
              alt={block.alt || 'News image'}
              width={600}
              height={400}
              className={styles.newsImage}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
            {block.caption && (
              <p className={styles.newsImageCaption}>{block.caption}</p>
            )}
          </div>
        )
      }
      
      return null
    })
  }

  return (
    <article className={styles.newsItem}>
      <div className={styles.newsContent}>
        <div className={styles.newsHeader}>
          <h2 className={styles.newsTitle}>{newsItem.title}</h2>
          <div className={styles.newsDate}>
            <time dateTime={newsItem.publishDate} className={styles.dateMain}>
              {formatDate(newsItem.publishDate)}
            </time>
            <span className={styles.dateRelative}>
              {getTimeAgo(newsItem.publishDate)}
            </span>
          </div>
        </div>
        
        <div className={styles.newsBody}>
          {renderContent(newsItem.content)}
        </div>
      </div>
    </article>
  )
}
