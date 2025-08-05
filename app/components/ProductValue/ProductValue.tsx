import Image from 'next/image'
import styles from './ProductValue.module.css'
import { Product } from '@/types/Product'

interface ProductValueProps {
  product: Product
}

interface ValueImage {
  url: string
  alt: string
  heading: string
}

export default function ProductValue({ product }: ProductValueProps) {
  // Default values that appear on all product pages unless overridden in Sanity
  const defaultValues = {
    heading: "Why Choose Our Products?",
    images: [
      {
        url: "https://cdn.sanity.io/images/7v67lu84/production/7b956cbe9935b564c32bee125e175fc6e48f5d2c-100x100.png",
        alt: "Custom Formulations Icon",
        heading: "Custom Formulations"
      },
      {
        url: "https://cdn.sanity.io/images/7v67lu84/production/4f947cd3e5e6a597f7297428719be74d5be0e362-150x150.png", 
        alt: "No MOQ Requirement Icon",
        heading: "NO MOQ Requirement"
      },
      {
        url: "https://cdn.sanity.io/images/7v67lu84/production/d159230d702e6c8b5c4c700e3be48f2b306478e0-200x200.png",
        alt: "Fast Turnarounds Icon", 
        heading: "Fast Turnarounds"
      },
      {
        url: "https://cdn.sanity.io/images/7v67lu84/production/d0366041f5eed03c78e561c0daf34682181666e6-150x150.png",
        alt: "Cruelty-Free Practices Icon",
        heading: "Cruelty-Free Practices"
      }
    ]
  }

  // Use Sanity data if available, otherwise fall back to defaults
  const valueData = {
    heading: product?.value?.heading || defaultValues.heading,
    description: product?.value?.description || null,
    images: product?.value?.images && product.value.images.length > 0 
      ? product.value.images 
      : defaultValues.images
  }

  return (
    <section className={styles.valueContainer}>
      <div className={styles.value}>
        <div className={styles.valueLeft}>
          <div className={styles.valueLeftText}>
            <h2>{valueData.heading}</h2>
            {valueData.description && <p>{valueData.description}</p>}
          </div>
        </div>
        <div className={styles.valueRight}>
          <div className={styles.valueBox}>
            {valueData.images.slice(0, 2).map((image: ValueImage, index: number) => (
              <div key={index} className={styles.valueHolder}>
                <Image src={image.url} alt={image.alt} width={200} height={150} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
          <div className={styles.valueBox}>
            {valueData.images.slice(2, 4).map((image: ValueImage, index: number) => (
              <div key={index + 2} className={styles.valueHolder}>
                <Image src={image.url} alt={image.alt} width={200} height={150} />
                <h4>{image.heading}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 