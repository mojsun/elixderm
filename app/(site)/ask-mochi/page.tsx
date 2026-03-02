'use client'

import { useState } from 'react'
import MochiChat from '@/app/components/MochiChat/MochiChat'
import styles from './AskMochi.module.css'

type Phase = 'landing' | 'chat'

const TRUST_ITEMS = [
  'Private label & custom formulation',
  'Trained on 500+ manufacturing inquiries',
  'Instant answers, no form required',
]

const CAPABILITIES = [
  {
    title: 'Formulation & Development',
    body: 'Ingredients, custom formulas, vegan and organic options, and product appearance.',
  },
  {
    title: 'MOQs, Pricing & Samples',
    body: 'Minimum orders, pricing tiers, sample availability, and bulk production volumes.',
  },
  {
    title: 'Packaging, Compliance & Logistics',
    body: 'Labeling, Health Canada requirements, shipping, and production timelines.',
  },
]

export default function AskMochiPage() {
  const [phase, setPhase] = useState<Phase>('landing')

  const handleStart = () => {
    setPhase('chat')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      {phase === 'landing' && (
        <>
          <section className={styles.heroSection}>
            <h1 className={styles.headline}>
              Hi, I&apos;m{' '}
              <span className={styles.headlineMochi}>Mochi</span>
            </h1>

            <p className={styles.tagline}>
              Elixderm&apos;s Formulation &amp; Manufacturing Specialist
            </p>

            <p className={styles.description}>
              Ask anything about private label manufacturing — formulations, MOQs,
              packaging, lead times, compliance, and more. Get real answers
              instantly, no waiting.
            </p>

            <p className={styles.trustRow}>
              {TRUST_ITEMS.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className={styles.trustPipe}> | </span>}
                  {item}
                </span>
              ))}
            </p>

            <button className={styles.ctaBtn} onClick={handleStart}>
              Start Chatting
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </button>
          </section>

          {/* Capabilities section */}
          <section className={styles.capabilitiesSection}>
            <div className={styles.capabilitiesInner}>
              <div className={styles.capabilitiesHeader}>
                <h2 className={styles.capabilitiesTitle}>
                  Built to Answer, Not to Redirect.
                </h2>
                <p className={styles.capabilitiesSubtitle}>
                  Mochi is trained on Elixderm&apos;s complete manufacturing knowledge base.
                  Ask anything about your project and get a real, informed answer — instantly.
                </p>
              </div>

              <div className={styles.capGrid}>
                {CAPABILITIES.map((cap) => (
                  <div key={cap.title} className={styles.capCard}>
                    <h3 className={styles.capTitle}>{cap.title}</h3>
                    <p className={styles.capBody}>{cap.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {phase === 'chat' && (
        <div className={styles.chatSection}>
          <MochiChat standalone onBack={() => setPhase('landing')} />
        </div>
      )}
    </div>
  )
}
