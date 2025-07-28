'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavbarScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Function to close mobile menu
    const closeMobileMenu = () => {
      if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
    };

    // Mobile menu functionality
    const handleMobileMenuToggle = () => {
      if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      }
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (e: Event) => {
      if (navbar && !navbar.contains(e.target as Node)) {
        closeMobileMenu();
      }
    };

    // Scroll effect for navbar
    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    // Add event listeners
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', handleMobileMenuToggle);
    }
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners
    return () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener('click', handleMobileMenuToggle);
      }
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when pathname changes (navigation)
  useEffect(() => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
  }, [pathname]);

  return null;
} 