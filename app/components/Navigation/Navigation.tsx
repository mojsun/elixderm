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
          Elixderm
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
