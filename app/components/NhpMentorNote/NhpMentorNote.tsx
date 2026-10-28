import TrackedLink from '../TrackedLink/TrackedLink'
import styles from './NhpMentorNote.module.css'

/**
 * Short note on the Regulatory Support page about NHP Mentor, which is in beta.
 * Update or remove it when NHP Mentor launches.
 */
export default function NhpMentorNote() {
  return (
    <section className={styles.note} aria-labelledby="nhp-mentor-note-title">
      <p className={styles.label}>Beta</p>
      <h2 id="nhp-mentor-note-title" className={styles.title}>NHP Mentor</h2>
      <p className={styles.text}>
        NHP Mentor is a regulatory support initiative for natural health products that we are
        developing to complement our team&apos;s expertise and hands-on regulatory support. It is in
        beta and not yet finalized, so our regulatory team remains your point of contact for
        guidance on your products.
      </p>
      <TrackedLink
        href="https://www.nhpmentor.com"
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        event="nhp_mentor_click"
        eventParams={{ link_location: 'regulatory_support_note' }}
      >
        nhpmentor.com
        <span aria-hidden="true"> ↗</span>
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </TrackedLink>
    </section>
  )
}
