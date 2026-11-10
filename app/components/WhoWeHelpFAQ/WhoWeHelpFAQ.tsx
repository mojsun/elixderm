'use client'

import { useState, useEffect, useId } from 'react'
import styles from './WhoWeHelpFAQ.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpFAQProps {
  whoWeHelp: WhoWeHelp
}

interface FAQItem {
  question: string
  answer: string
}

export default function WhoWeHelpFAQ({ whoWeHelp }: WhoWeHelpFAQProps) {
  const [activeItems, setActiveItems] = useState<number[]>([])
  const faqId = useId()
  const faqs = whoWeHelp?.faq || { title: '', subtitle: '', items: [] }
  
  // Default FAQ title that appears on all pages unless overridden in Sanity
  const faqData = {
    title: faqs.title || "Frequently Asked Questions",
    subtitle: faqs.subtitle || null,
    items: faqs.items || []
  }

  const toggleFAQ = (index: number) => {
    setActiveItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Generate FAQ schema for SEO
  useEffect(() => {
    if (faqData.items && faqData.items.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.items.map((faq: FAQItem) => ({
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
  }, [faqData.items])

  if (!faqData.items?.length) {
    return null
  }

  return (
    <section className={styles.faq}>
      <div className={styles.faqContainer}>
        <div className={styles.faqTitle}>
          <h2>{faqData.title}</h2>
          {faqData.subtitle && <p>{faqData.subtitle}</p>}
        </div>
        <div className={styles.faqAccordion}>
          {faqData.items?.map((faq: FAQItem, index: number) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeItems.includes(index) ? styles.active : ''}`}
            >
              <h3 className={styles.faqHeading}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeItems.includes(index)}
                  aria-controls={`${faqId}-answer-${index}`}
                >
                  <span className={styles.toggleIcon} aria-hidden="true">
                    {activeItems.includes(index) ? '-' : '+'}
                  </span>
                  <span>{faq.question}</span>
                </button>
              </h3>
              <div className={styles.faqAnswer} id={`${faqId}-answer-${index}`}>
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
