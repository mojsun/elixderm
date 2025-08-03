import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHero({ title, subtitle, className = "" }: PageHeroProps) {
  return (
    <div className={`${styles.heroSection} ${className}`}>
      <div className={styles.heroWrapper}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && (
          <p className={styles.heroSubtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
} 