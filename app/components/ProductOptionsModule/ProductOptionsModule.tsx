'use client'

import { useState } from 'react'
import styles from './ProductOptionsModule.module.css'

interface ProductOption {
  _id: string
  name: string
  title: string
  subtitle?: string
  plan1: {
    title: string
    features: string[]
  }
  plan2: {
    title: string
    features: string[]
    featured?: boolean
  }
  plan3: {
    title: string
    features: string[]
  }
  ctaText: string
}

interface ProductOptionsModuleProps {
  options: ProductOption
  showCheckbox?: boolean
}

export default function ProductOptionsModule({ options, showCheckbox = true }: ProductOptionsModuleProps) {
  const [isVisible, setIsVisible] = useState(!showCheckbox)

  if (!options) {
    return null
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsVisible(checked)
  }

  const handleCTAClick = () => {
    window.location.href = 'https://www.elixderm.com/contact-us'
  }

  const plans = [options.plan1, options.plan2, options.plan3].filter(plan => plan && plan.title)

  return (
    <section className={styles.optionsSection}>
      {showCheckbox && (
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
            <span className={styles.checkboxText}>
              Show product options and pricing plans
            </span>
          </label>
        </div>
      )}

      {isVisible && (
        <div className={styles.optionsContent}>
          <div className={styles.optionsContainer}>
            <div className={styles.optionsHeader}>
              <h2>{options.title}</h2>
              {options.subtitle && <p>{options.subtitle}</p>}
            </div>

            <div className={styles.plansGrid}>
              {plans.map((plan, index) => {
                const isFeatured = index === 1 && options.plan2?.featured
                return (
                  <div 
                    key={index} 
                    className={`${styles.planCard} ${isFeatured ? styles.featured : ''}`}
                  >
                    {isFeatured && (
                      <div className={styles.featuredBadge}>
                        Recommended
                      </div>
                    )}
                    
                    <div className={styles.planHeader}>
                      <h3 className={styles.planName}>{plan.title}</h3>
                    </div>

                    <div className={styles.planFeatures}>
                      {plan.features?.map((feature, featureIndex) => (
                        <div key={featureIndex} className={styles.feature}>
                          <span className={styles.featureText}>✓ {feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.ctaContainer}>
              <button 
                className={styles.ctaButton}
                onClick={handleCTAClick}
              >
                {options.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
