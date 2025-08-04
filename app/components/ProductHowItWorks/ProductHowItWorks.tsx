import Image from 'next/image'
import styles from './ProductHowItWorks.module.css'
import { Product } from '@/types/Product'

interface ProductHowItWorksProps {
  product: Product
}

interface HowItWorksStep {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}

export default function ProductHowItWorks({ product }: ProductHowItWorksProps) {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.hitContainer}>
        <div className={styles.hitTitles}>
          <h2>{product?.howItWorks?.title || 'Loading...'}</h2>
          <p>{product?.howItWorks?.description || 'Loading...'}</p>
        </div>
        <div className={styles.hitSteps}>
          {product?.howItWorks?.steps?.map((step: HowItWorksStep, index: number) => (
            <div key={index} className={styles.hitStep}>
              <Image src={step.imageUrl} alt={step.imageAlt} width={150} height={150} />
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 