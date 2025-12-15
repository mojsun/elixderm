'use client'

import { useState } from 'react'
import styles from './ProductOptionsModule.module.css'

interface ProductOption {
  _id: string
  name: string
  title?: string
  subtitle?: string
  plans: Plan[]
  cta: {
    text: string
    link: string
    openInNewTab?: boolean
  }
}

interface Plan {
  name: string
  description?: string
  products: {
    shampoos: number
    conditioners: number
  }
  labelIncluded: boolean
  packSizes: string[]
  timeline: string
  featured?: boolean
  price?: string
}

interface ProductOptionsModuleProps {
  options: ProductOption
  showCheckbox?: boolean
}

export default function ProductOptionsModule({ options, showCheckbox = true }: ProductOptionsModuleProps) {
  const [isVisible, setIsVisible] = useState(!showCheckbox)

  if (!options || !options.plans || options.plans.length === 0) {
    return null
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsVisible(checked)
  }

  const handleCTAClick = () => {
    if (options.cta.openInNewTab) {
      window.open(options.cta.link, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = options.cta.link
    }
  }

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
              <h2>{options.title || 'Choose Your Plan'}</h2>
              {options.subtitle && <p>{options.subtitle}</p>}
            </div>

            <div className={styles.plansGrid}>
              {options.plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}
                >
                  {plan.featured && (
                    <div className={styles.featuredBadge}>
                      Recommended
                    </div>
                  )}
                  
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    {plan.description && (
                      <p className={styles.planDescription}>{plan.description}</p>
                    )}
                    {plan.price && (
                      <div className={styles.planPrice}>{plan.price}</div>
                    )}
                  </div>

                  <div className={styles.planFeatures}>
                    <div className={styles.feature}>
                      <span className={styles.featureLabel}>Products:</span>
                      <span className={styles.featureValue}>
                        {plan.products.shampoos} Shampoo{plan.products.shampoos !== 1 ? 's' : ''} + {plan.products.conditioners} Conditioner{plan.products.conditioners !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className={styles.feature}>
                      <span className={styles.featureLabel}>Label:</span>
                      <span className={styles.featureValue}>
                        {plan.labelIncluded ? '✓ Included' : '✗ Not included'}
                      </span>
                    </div>

                    <div className={styles.feature}>
                      <span className={styles.featureLabel}>Pack Sizes:</span>
                      <span className={styles.featureValue}>
                        {plan.packSizes.join(', ')}
                      </span>
                    </div>

                    <div className={styles.feature}>
                      <span className={styles.featureLabel}>Timeline:</span>
                      <span className={styles.featureValue}>{plan.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaContainer}>
              <button 
                className={styles.ctaButton}
                onClick={handleCTAClick}
              >
                {options.cta.text}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
