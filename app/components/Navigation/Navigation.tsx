'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ProductsMegaMenu from '@/app/components/ProductsMegaMenu'
import styles from './Navigation.module.css'
import { getMenuProducts } from '@/sanity/sanity-utils'
import { Product } from '@/types/Product'

export default function Navigation() {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuProducts, setMenuProducts] = useState<Product[]>([])
  const productsMenuRef = useRef<HTMLLIElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleProductsMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsProductsMenuOpen(true)
  }

  const handleProductsMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsMenuOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsProductsMenuOpen(false)
  }

  const toggleProductsMobile = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen)
  }

  // Fetch menu products on component mount
  useEffect(() => {
    async function fetchMenuProducts() {
      try {
        const products = await getMenuProducts()
        setMenuProducts(products)
      } catch (error) {
        console.error('Failed to fetch menu products:', error)
      }
    }
    
    fetchMenuProducts()
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
        setIsProductsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          Elixderm
        </Link>
        
        <div 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={handleMobileMenuToggle}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
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
