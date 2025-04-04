'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Update scroll state
      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
          setMobileMenuOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/70 backdrop-blur-md py-3 md:py-4' 
          : 'bg-transparent py-4 md:py-6'
      } transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" >
            <Image 
              src="/images/logo/altipace.svg" 
              alt="Altiplace Logo" 
              className="h-8 md:h-10 w-auto transition-all duration-300"
              width={120}
              height={40}
            />
          </Link>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4 lg:space-x-8">
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">
              Contact
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">
              Shop
            </Link>
            <Link href="/career" className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base">
              Career
            </Link>
          </div>

          {/* Right-aligned shop now button */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/shop" 
              className="hidden sm:block bg-white text-black px-4 sm:px-6 lg:px-8 py-2 rounded-full font-medium text-sm lg:text-base transition-all duration-200 hover:bg-black hover:text-white border border-transparent hover:border-white"
            >
              SHOP NOW
            </Link>

            {/* Hamburger menu button for mobile */}
            <button 
              className="hamburger-button md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div 
        className={`mobile-menu fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '64px' }} // Match header height
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-6">
            <Link 
              href="/about" 
              className="text-white hover:text-gray-300 transition-colors text-2xl font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-gray-300 transition-colors text-2xl font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/shop" 
              className="text-white hover:text-gray-300 transition-colors text-2xl font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/career" 
              className="text-white hover:text-gray-300 transition-colors text-2xl font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Career
            </Link>
            <Link 
              href="/shop" 
              className="mt-6 bg-white text-black px-8 py-3 rounded-full font-medium text-lg transition-all duration-200 hover:bg-black hover:text-white border border-transparent hover:border-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
