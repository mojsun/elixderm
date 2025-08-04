import Link from 'next/link'
import styles from './ProductTopCTA.module.css'
import { Product } from '@/types/Product'

interface ProductTopCTAProps {
  product: Product
}

export default function ProductTopCTA({ product }: ProductTopCTAProps) {
  return (
    <Link href="/contact-us">
      <section className={styles.ctaRow}>
        <p>{product?.topCTA?.text || 'Loading...'}</p>
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