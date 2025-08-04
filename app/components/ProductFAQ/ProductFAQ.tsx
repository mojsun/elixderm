'use client'

import { useState, useEffect } from 'react'
import styles from './ProductFAQ.module.css'
import { Product } from '@/types/Product'

interface ProductFAQProps {
  product: Product
}

interface FAQItem {
  question: string
  answer: string
}

export default function ProductFAQ({ product }: ProductFAQProps) {
  const [activeItems, setActiveItems] = useState<number[]>([])
  const faqs = product?.faq || {}

  const toggleFAQ = (index: number) => {
    setActiveItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Generate FAQ schema for SEO
  useEffect(() => {
    if (faqs.items && faqs.items.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.items.map((faq: FAQItem) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }

      // Remove existing FAQ schema if present
      const existingSchema = document.querySelector('script[data-schema="faq"]')
      if (existingSchema) {
        existingSchema.remove()
      }

      // Add new FAQ schema
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', 'faq')
      script.textContent = JSON.stringify(faqSchema)
      document.head.appendChild(script)

      // Cleanup on unmount
      return () => {
        const schemaElement = document.querySelector('script[data-schema="faq"]')
        if (schemaElement) {
          schemaElement.remove()
        }
      }
    }
  }, [faqs.items])

  return (
    <section className={styles.faq}>
      <div className={styles.faqContainer}>
        <div className={styles.faqTitle}>
          <h2>{faqs.title || 'Loading...'}</h2>
          <p>{faqs.subtitle || 'Loading...'}</p>
        </div>
        <div className={styles.faqAccordion}>
          {faqs.items?.map((faq: FAQItem, index: number) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeItems.includes(index) ? styles.active : ''}`}
            >
              <h3 className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                <span className={styles.toggleIcon}>
                  {activeItems.includes(index) ? '-' : '+'}
                </span>
                {faq.question}
              </h3>
              <div 
                className={styles.faqAnswer}
                style={{ 
                  maxHeight: activeItems.includes(index) ? '200px' : '0'
                }}
              >
                <div className={styles.answerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 