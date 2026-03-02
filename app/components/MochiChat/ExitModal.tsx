'use client'

import styles from './MochiChat.module.css'

interface ExitModalProps {
  onConfirm: () => void
  onDecline: () => void
  isSecondChance?: boolean
}

export default function ExitModal({ onConfirm, onDecline, isSecondChance }: ExitModalProps) {
  return (
    <div className={styles.exitOverlay} role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
      <div className={styles.exitModal}>
        <div className={styles.exitModalIcon}>
          {isSecondChance ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          )}
        </div>

        {isSecondChance ? (
          <>
            <h3 id="exit-modal-title" className={styles.exitModalTitle}>Still sure?</h3>
            <p className={styles.exitModalBody}>
              You&apos;ve already put in the work filling out the form. A 15-minute call with our team costs you nothing and gets you real answers — pricing, timelines, formulation options, all of it.
            </p>
          </>
        ) : (
          <>
            <h3 id="exit-modal-title" className={styles.exitModalTitle}>Before you go</h3>
            <p className={styles.exitModalBody}>
              Our team can walk you through formulations, pricing, and production timelines on a quick 15-minute call — no commitment, just clarity.
            </p>
          </>
        )}

        <div className={styles.exitModalActions}>
          <button className={styles.exitBookBtn} onClick={onConfirm}>
            {isSecondChance ? 'Yes, book a call' : 'Book a Consultation Call'}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </button>
          <button className={styles.exitDeclineBtn} onClick={onDecline}>
            {isSecondChance ? 'Close anyway' : 'No thanks, keep chatting'}
          </button>
        </div>
      </div>
    </div>
  )
}
