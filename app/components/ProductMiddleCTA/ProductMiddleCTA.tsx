import styles from './ProductMiddleCTA.module.css'

interface ProductMiddleCTAProps {
  product: any // Will be typed properly later
}

export default function ProductMiddleCTA({ product }: ProductMiddleCTAProps) {
  const middleCTA = product?.middleCTA || {}

  return (
    <section className={styles.middleCta}>
      <div>
        <div className={styles.blobContainer}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#05966930" 
              d="M63.1,-38.8C70,-24.4,55.8,-0.2,41.8,16.3C27.7,32.7,13.9,41.5,-3.8,43.7C-21.5,45.9,-43,41.6,-54,26.9C-64.9,12.3,-65.2,-12.8,-54.4,-29.3C-43.6,-45.9,-21.8,-54,3.1,-55.8C28.1,-57.6,56.2,-53.1,63.1,-38.8Z" 
              transform="translate(100 100)" 
            />
          </svg>
        </div>
        <img src={middleCTA.image} alt={middleCTA.imageAlt} />
      </div>
      <div className={styles.mctaText}>
        <p>{middleCTA.subheading}</p>
        <h2>{middleCTA.heading}</h2>

        <a href="/contact-us">
          <button>
            <span>{middleCTA.ctaText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1422 800">
              <g strokeWidth="19" stroke="#10b981" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(315, 711, 400)">
                <line x1="386" y1="75" x2="1036" y2="725" markerEnd="url(#SvgjsMarker1411)"></line>
              </g>
              <defs>
                <marker markerWidth="15" markerHeight="15" refX="7.5" refY="7.5" viewBox="0 0 15 15" orient="auto" id="SvgjsMarker1411">
                  <polygon points="0,15 7.5,7.5 0,0 15,7.5" fill="#10b981"></polygon>
                </marker>
              </defs>
            </svg>
          </button>
        </a>
      </div>
    </section>
  )
} 