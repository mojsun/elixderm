'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import ProductsMegaMenu from '@/app/components/ProductsMegaMenu'
import ServicesMegaMenu from '@/app/components/ServicesMegaMenu'
import WhoWeHelpMegaMenu from '@/app/components/WhoWeHelpMegaMenu'
import styles from './Navigation.module.css'
import { getMenuProducts, getMenuServices, getMenuWhoWeHelps } from '@/sanity/sanity-utils'
import { Product } from '@/types/Product'
import { Service } from '@/types/Service'
import { WhoWeHelp } from '@/types/WhoWeHelp'

export default function Navigation() {
  const pathname = usePathname()
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const [isWhoWeHelpMenuOpen, setIsWhoWeHelpMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuProducts, setMenuProducts] = useState<Product[]>([])
  const [menuServices, setMenuServices] = useState<Service[]>([])
  const [menuWhoWeHelps, setMenuWhoWeHelps] = useState<WhoWeHelp[]>([])
  const productsMenuRef = useRef<HTMLLIElement>(null)
  const servicesMenuRef = useRef<HTMLLIElement>(null)
  const whoWeHelpMenuRef = useRef<HTMLLIElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleProductsMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsProductsMenuOpen(true)
    setIsServicesMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }

  const handleProductsMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsMenuOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const handleServicesMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsServicesMenuOpen(true)
    setIsProductsMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }

  const handleServicesMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const handleWhoWeHelpMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsWhoWeHelpMenuOpen(true)
    setIsProductsMenuOpen(false)
    setIsServicesMenuOpen(false)
  }

  const handleWhoWeHelpMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsWhoWeHelpMenuOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsProductsMenuOpen(false)
    setIsServicesMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }

  const toggleProductsMobile = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen)
    setIsServicesMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }

  const toggleServicesMobile = () => {
    setIsServicesMenuOpen(!isServicesMenuOpen)
    setIsProductsMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }

  const toggleWhoWeHelpMobile = () => {
    setIsWhoWeHelpMenuOpen(!isWhoWeHelpMenuOpen)
    setIsProductsMenuOpen(false)
    setIsServicesMenuOpen(false)
  }

  // Fetch menu products, services, and who we help on component mount
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const [products, services, whoWeHelps] = await Promise.all([
          getMenuProducts(),
          getMenuServices(),
          getMenuWhoWeHelps()
        ])
        setMenuProducts(products)
        setMenuServices(services)
        setMenuWhoWeHelps(whoWeHelps)
      } catch (error) {
        console.error('Failed to fetch menu data:', error)
      }
    }
    
    fetchMenuData()
  }, [])

  // Close menus when clicking outside the navbar
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const targetNode = event.target as Node
      const clickedInsideNav = navRef.current?.contains(targetNode)

      if (!clickedInsideNav) {
        setIsMobileMenuOpen(false)
        setIsProductsMenuOpen(false)
        setIsServicesMenuOpen(false)
        setIsWhoWeHelpMenuOpen(false)
      }

      // Also collapse submenus when clicking anywhere outside their li elements (only on desktop)
      if (window.innerWidth > 768) {
        if (productsMenuRef.current && !productsMenuRef.current.contains(targetNode)) {
          setIsProductsMenuOpen(false)
        }
        if (servicesMenuRef.current && !servicesMenuRef.current.contains(targetNode)) {
          setIsServicesMenuOpen(false)
        }
        if (whoWeHelpMenuRef.current && !whoWeHelpMenuRef.current.contains(targetNode)) {
          setIsWhoWeHelpMenuOpen(false)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Close mobile menu when pathname changes (navigation)
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProductsMenuOpen(false)
    setIsServicesMenuOpen(false)
    setIsWhoWeHelpMenuOpen(false)
  }, [pathname])

  return (
    <nav className="navbar" id="navbar" ref={navRef}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-text">Elixderm</span>
          <svg 
            className="logo-maple-leaf" 
            fill="currentColor" 
            width="24" 
            height="24" 
            viewBox="0 0 14.00 14.00" 
            role="img" 
            focusable="false" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z"></path>
          </svg>
        </Link>
        
        <div 
          id="mobile-menu-toggle"
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={handleMobileMenuToggle}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
        
        <ul id="nav-menu" className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li 
            className={`nav-item ${styles.navItemWithDropdown}`}
            ref={servicesMenuRef}
            onMouseEnter={handleServicesMenuEnter}
            onMouseLeave={handleServicesMenuLeave}
          >
            <Link 
              href="/services" 
              className={`nav-link ${styles.navLinkWithDropdown}`}
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleServicesMobile()
                } else {
                  closeMobileMenu()
                }
              }}
            >
              Services
              <span className={styles.dropdownArrow}>⌄</span>
            </Link>
            
            <ServicesMegaMenu
              services={menuServices}
              isOpen={isServicesMenuOpen}
              onClose={closeMobileMenu}
            />
          </li>
          
          <li 
            className={`nav-item ${styles.navItemWithDropdown}`}
            ref={productsMenuRef}
            onMouseEnter={handleProductsMenuEnter}
            onMouseLeave={handleProductsMenuLeave}
          >
            <Link 
              href="/products" 
              className={`nav-link ${styles.navLinkWithDropdown}`}
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleProductsMobile()
                } else {
                  closeMobileMenu()
                }
              }}
            >
              Products
              <span className={styles.dropdownArrow}>⌄</span>
            </Link>
            
            <ProductsMegaMenu
              products={menuProducts}
              isOpen={isProductsMenuOpen}
              onClose={closeMobileMenu}
            />
          </li>
          
          <li 
            className={`nav-item ${styles.navItemWithDropdown}`}
            ref={whoWeHelpMenuRef}
            onMouseEnter={handleWhoWeHelpMenuEnter}
            onMouseLeave={handleWhoWeHelpMenuLeave}
          >
            <Link 
              href="/who-we-help" 
              className={`nav-link ${styles.navLinkWithDropdown}`}
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleWhoWeHelpMobile()
                } else {
                  closeMobileMenu()
                }
              }}
            >
              Who We Help
              <span className={styles.dropdownArrow}>⌄</span>
            </Link>
            
            <WhoWeHelpMegaMenu
              whoWeHelps={menuWhoWeHelps}
              isOpen={isWhoWeHelpMenuOpen}
              onClose={closeMobileMenu}
            />
          </li>

          <li className="nav-item">
            <Link href="/about" className="nav-link" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          
          <li className="nav-item">
            <Link href="/contact-us" className="nav-link cta-button" onClick={closeMobileMenu}>
              Get a Quote
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
