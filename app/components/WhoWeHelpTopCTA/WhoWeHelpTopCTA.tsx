import Link from 'next/link'
import styles from './WhoWeHelpTopCTA.module.css'
import { WhoWeHelp } from '@/types/WhoWeHelp'

interface WhoWeHelpTopCTAProps {
  whoWeHelp: WhoWeHelp
}

export default function WhoWeHelpTopCTA({ whoWeHelp }: WhoWeHelpTopCTAProps) {
  return (
    <Link href="/contact-us">
      <section className={styles.ctaRow}>
        <p>{whoWeHelp?.topCTA?.text || 'Ready to bring your cosmetic vision to life? Contact us today for a consultation.'}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800">
          <g strokeWidth="9" stroke="hsl(0, 0%, 100%)" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(315, 400, 400)">
            <line x1="175" y1="175" x2="625" y2="625" markerEnd="url(#SvgjsMarker1748)"></line>
          </g>
          <defs>
            <marker markerWidth="15" markerHeight="15" refX="7.5" refY="7.5" viewBox="0 0 15 15" orient="auto" id="SvgjsMarker1748">
              <polygon points="0,15 7.5,7.5 0,0 15,7.5" fill="hsl(0, 0%, 100%)"></polygon>
            </marker>
          </defs>
        </svg>
      </section>
    </Link>
  )
}
