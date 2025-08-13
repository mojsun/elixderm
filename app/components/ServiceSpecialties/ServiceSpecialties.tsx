'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './ServiceSpecialties.module.css'
import { Service } from '@/types/Service'

interface ServiceSpecialtiesProps {
  service: Service
}

export default function ServiceSpecialties({ service }: ServiceSpecialtiesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Update visible items based on screen size
  const updateVisibleItems = useCallback(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth
      if (screenWidth <= 768) {
        setVisibleItems(1)
      } else {
        setVisibleItems(3) // Always show 3 columns on desktop and tablet
      }
    }
  }, [])

  useEffect(() => {
    updateVisibleItems()
    window.addEventListener('resize', updateVisibleItems)
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [updateVisibleItems])

  // Reset slide position if it exceeds new bounds
  useEffect(() => {
    const items = service?.specialties?.items || []
    const totalSlides = Math.max(0, items.length - visibleItems)
    if (currentSlide > totalSlides) {
      setCurrentSlide(Math.max(0, totalSlides))
    }
  }, [currentSlide, visibleItems, service?.specialties?.items])

  if (!service?.specialties?.items?.length) {
    return null
  }

  const items = service.specialties.items
  const totalSlides = Math.max(0, items.length - visibleItems)

  const moveService = (step: number) => {
    let newSlide = currentSlide + step
    
    if (newSlide < 0) {
      newSlide = 0
    } else if (newSlide > totalSlides) {
      newSlide = totalSlides
    }

    setCurrentSlide(newSlide)
  }

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentSlide < totalSlides) {
      moveService(1) // swipe left = next slide
    }
    if (isRightSwipe && currentSlide > 0) {
      moveService(-1) // swipe right = previous slide
    }
  }

  // Calculate translate value
  // Each slide moves by the width of one item plus gap
  const itemWidthWithGap = visibleItems === 1 ? 100 : (100 / 3) // 33.333% for desktop, 100% for mobile
  const translateX = currentSlide * itemWidthWithGap

  return (
    <section className={styles.imageSlider}>
      <div className={styles.hitContainer}></div>
      <div className={styles.hitTitles}>
        <h2>{service.specialties.heading}</h2>
        <p>{service.specialties.description}</p>
      </div>
      
      <div 
        className={styles.sliderContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className={styles.formulations}
          style={{ 
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className={styles.formulation}
            >
              {item.image && (
                <Image 
                  src={item.image} 
                  alt={item.imageAlt || item.title}
                  width={75}
                  height={75}
                />
              )}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {currentSlide > 0 && (
        <button 
          className={styles.prevF} 
          onClick={() => moveService(-1)}
          aria-label="Previous specialty"
        >
          ❮
        </button>
      )}
      
      {currentSlide < totalSlides && (
        <button 
          className={styles.nextF} 
          onClick={() => moveService(1)}
          aria-label="Next specialty"
        >
          ❯
        </button>
      )}
    </section>
  )
}
