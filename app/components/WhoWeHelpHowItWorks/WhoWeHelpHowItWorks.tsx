import Image from 'next/image'
import styles from './WhoWeHelpHowItWorks.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpHowItWorksProps {
  whoWeHelp: WhoWeHelp
}

interface HowItWorksStep {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}

export default function WhoWeHelpHowItWorks({ whoWeHelp }: WhoWeHelpHowItWorksProps) {
  // Default how it works steps with the specified content
  const defaultHowItWorks = {
    title: "How It Works?",
    description: whoWeHelp?.howItWorks?.description || null,
    steps: [
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/7b956cbe9935b564c32bee125e175fc6e48f5d2c-100x100.png",
        imageAlt: "Consultation & Formulation Icon",
        title: "Consultation & Formulation",
        description: "Aligning your needs with formula creation."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/0d2f39c7741c165b4b738458a9bd571e8223b8e2-150x150.png",
        imageAlt: "Production & Optimization Icon", 
        title: "Production & Optimization",
        description: "Scale and refine your product."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/7f2e692322a269f494e3d9c7774d7352ddabdcf4-120x120.png",
        imageAlt: "Quality Assurance Icon",
        title: "Quality Assurance", 
        description: "Strict checks for high standards."
      },
      {
        imageUrl: "https://cdn.sanity.io/images/7v67lu84/production/801d2b8c2059fc6acf4d72ad335d39ff798992be-150x150.png",
        imageAlt: "Delivery & Feedback Icon",
        title: "Delivery & Feedback",
        description: "Receive and refine your product."
      }
    ]
  }

  // Use Sanity data if available, otherwise fall back to defaults
  const howItWorksData = {
    title: whoWeHelp?.howItWorks?.title || defaultHowItWorks.title,
    description: whoWeHelp?.howItWorks?.description || defaultHowItWorks.description,
    steps: whoWeHelp?.howItWorks?.steps && whoWeHelp.howItWorks.steps.length > 0
      ? whoWeHelp.howItWorks.steps
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
