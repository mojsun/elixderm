'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './WhoWeHelpImageSlider.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpImageSliderProps {
  whoWeHelp: WhoWeHelp
}

interface SliderImage {
  url: string
  alt: string
}

export default function WhoWeHelpImageSlider({ whoWeHelp }: WhoWeHelpImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = whoWeHelp?.slider?.images || []

  if (!images.length) {
    return null
  }

  const move = (step: number) => {
    const totalSlides = images.length
    let newSlide = currentSlide + step
    if (newSlide < 0) newSlide = totalSlides - 1
    if (newSlide >= totalSlides) newSlide = 0
    setCurrentSlide(newSlide)
  }

  return (
    <section className={styles.imageSlider}>
      <div 
        className={styles.slides}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image: SliderImage, index: number) => (
          <div key={index} className={styles.slide}>
            <Image src={image.url} alt={image.alt} width={600} height={400} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className={styles.prev} onClick={() => move(-1)}>
            ❮
          </button>
          <button className={styles.next} onClick={() => move(1)}>
            ❯
          </button>
        </>
      )}
    </section>
  )
}
