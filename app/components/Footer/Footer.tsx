import Link from "next/link";
import styles from "./Footer.module.css";
import { getMenuServices } from "@/sanity/sanity-utils";

export default async function Footer() {
  const services = await getMenuServices();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Company</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Elixderm
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.footerLink}>
                  Latest News
                </Link>
              </li>
              <li className={styles.footerAddress}>
                <div className={styles.addressContainer}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.locationIcon}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className={styles.addressText}>
                    20 Newbridge road , unit # 9-11<br />
                    Etobicoke, M8Z 2L7
                  </span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>What we do</h3>
            <ul className={styles.footerLinks}>
              {services.map((service) => (
                <li key={service._id}>
                  <Link href={`/services/${service.slug}`} className={styles.footerLink}>
                    {service.menuName || service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className={styles.footerLink}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/who-we-help" className={styles.footerLink}>
                  Who We Help
                </Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Connect</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/contact-us" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="mailto:hello@elixderm.com" className={styles.footerLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  hello@elixderm.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <div className={styles.footerLogo}>
              <Link href="/" className={styles.footerBrand}>Elixderm</Link>
              <p className={styles.footerTagline}>Professional Beauty Solutions</p>
            </div>
            <div className={styles.footerLegal}>
              <p className={styles.footerCopyright}>© 2025 Elixderm. All rights reserved.</p>
              <div className={styles.footerLegalLinks}>
                <Link href="/sitemap" className={styles.footerLegalLink}>Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
