'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavbarScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.getElementById('navbar');

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
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when pathname changes (navigation)
  useEffect(() => {
    // Mobile menu closing is now handled by React state in Navigation.tsx
    // This effect is kept for potential future pathname-based logic
  }, [pathname]);

  return null;
} 