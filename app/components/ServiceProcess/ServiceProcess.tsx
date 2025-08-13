import Image from 'next/image'
import styles from './ServiceProcess.module.css'
import { Service } from '@/types/Service'

interface ServiceProcessProps {
  service: Service
}

export default function ServiceProcess({ service }: ServiceProcessProps) {
  if (!service?.process?.steps?.length) {
    return null
  }

  return (
    <section className={styles.howItWorks}>
      <div className={styles.hitContainer}></div>
      <div className={styles.hitTitles}>
        <h2>{service.process.title}</h2>
        <p>{service.process.description}</p>
      </div>
      <div className={styles.hitSteps}>
        {service.process.steps.map((step, index) => (
          <div key={index} className={styles.hitStep}>
            {step.image && (
              <Image 
                src={step.image} 
                alt={step.imageAlt || step.title}
                width={85}
                height={85}
              />
            )}
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
