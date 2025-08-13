'use client'

import { useState, useEffect } from 'react'
import styles from './ServiceFAQ.module.css'
import { Service } from '@/types/Service'

interface ServiceFAQProps {
  service: Service
}

export default function ServiceFAQ({ service }: ServiceFAQProps) {
  const [activeItems, setActiveItems] = useState<number[]>([])

  // Generate FAQ Schema for SEO
  useEffect(() => {
    if (!service?.faq?.items?.length) return

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faq.items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }

    // Remove existing FAQ schema if any
    const existingSchema = document.querySelector('script[data-schema="service-faq"]')
    if (existingSchema) {
      existingSchema.remove()
    }

    // Add new FAQ schema
    const scriptTag = document.createElement('script')
    scriptTag.type = 'application/ld+json'
    scriptTag.setAttribute('data-schema', 'service-faq')
    scriptTag.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(scriptTag)

    // Cleanup function to remove schema when component unmounts
    return () => {
      const schemaToRemove = document.querySelector('script[data-schema="service-faq"]')
      if (schemaToRemove) {
        schemaToRemove.remove()
      }
    }
  }, [service?.faq?.items])

  const toggleFAQ = (index: number) => {
    setActiveItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  if (!service?.faq?.items?.length) {
    return null
  }

  return (
    <section className={styles.faq}>
      <div className={styles.faqContainer}>
        <div className={styles.faqTitle}>
          <h2>{service.faq.title}</h2>
          <p>{service.faq.subtitle}</p>
        </div>
        <div className={styles.faqAccordion}>
          {service.faq.items.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeItems.includes(index) ? styles.active : ''}`}
            >
              <h3 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.toggleIcon}>
                  {activeItems.includes(index) ? '-' : '+'}
                </span>
                <span>{item.question}</span>
              </h3>
              <div className={styles.faqAnswer}>
                <div className={styles.answerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
