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
  // Default how it works steps that appear on all product pages unless overridden in Sanity
  const defaultHowItWorks = {
    title: "How It Works",
    steps: [
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/7b956cbe9935b564c32bee125e175fc6e48f5d2c-100x100.png",
        imageAlt: "Pick Your Formula Icon",
        title: "Pick Your Formula",
        description: "Explore our formulas; tailor one to fit your brand."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/0d2f39c7741c165b4b738458a9bd571e8223b8e2-150x150.png",
        imageAlt: "Create Your Look Icon", 
        title: "Create Your Look",
        description: "Our team collaborates with you on standout packaging."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/7f2e692322a269f494e3d9c7774d7352ddabdcf4-120x120.png",
        imageAlt: "We Manufacture Icon",
        title: "We Manufacture", 
        description: "We ensure your product meets top quality standards."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/801d2b8c2059fc6acf4d72ad335d39ff798992be-150x150.png",
        imageAlt: "Your Market Debut Icon",
        title: "Your Market Debut",
        description: "Your customized products arrive, ready for market."
      }
    ]
  }

  // Use Sanity data if available, otherwise fall back to defaults
  const howItWorksData = {
    title: product?.howItWorks?.title || defaultHowItWorks.title,
    description: product?.howItWorks?.description || null,
    steps: product?.howItWorks?.steps && product.howItWorks.steps.length > 0
      ? product.howItWorks.steps
      : defaultHowItWorks.steps
  }

  return (
    <section className={styles.howItWorks}>
      <div className={styles.hitContainer}>
        <div className={styles.hitTitles}>
          <h2>{howItWorksData.title}</h2>
          {howItWorksData.description && <p>{howItWorksData.description}</p>}
        </div>
        <div className={styles.hitSteps}>
          {howItWorksData.steps.map((step: HowItWorksStep, index: number) => (
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