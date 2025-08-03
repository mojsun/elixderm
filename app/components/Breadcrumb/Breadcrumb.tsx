import Link from "next/link";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  baseUrl?: string; // Optional base URL override
}

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

export default function Breadcrumb({ items, baseUrl = 'https://elixderm.com' }: BreadcrumbProps) {
  // Generate structured data for SEO
  const generateStructuredData = () => {
    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && {
        "item": {
          "@type": "WebPage",
          "@id": `${baseUrl}${item.href}`
        }
      })
    }));

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* Visual Breadcrumb Component */}
      <div className={styles.pageBreadcrumb}>
        <div className={styles.breadcrumbWrapper}>
          <nav 
            className={styles.breadcrumbNav}
            aria-label="Breadcrumb navigation"
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                className={styles.breadcrumbItem}
              >
                {/* If item has href, render as link */}
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className={styles.breadcrumbLink}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbActive}>
                    {item.label}
                  </span>
                )}
                
                {/* Add divider if not last item */}
                {index < items.length - 1 && (
                  <span className={styles.breadcrumbDivider} aria-hidden="true">
                    <ChevronRightIcon />
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 