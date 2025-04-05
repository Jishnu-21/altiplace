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
          ? 'bg-black/70 backdrop-blur-md py-2 md:py-3' 
          : 'bg-transparent py-3 md:py-4'
      } transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/images/logo/altipace.svg" 
              alt="Altiplace Logo" 
              className="h-7 md:h-8 w-auto transition-all duration-300"
              width={110}
              height={35}
            />
          </Link>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-3 lg:space-x-6 max-w-[40%]">
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-xs lg:text-sm">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-xs lg:text-sm">
              Contact
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300 transition-colors text-xs lg:text-sm">
              Shop
            </Link>
            <Link href="/career" className="text-white hover:text-gray-300 transition-colors text-xs lg:text-sm">
              Career
            </Link>
          </div>

          {/* Right-aligned shop now button */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link 
              href="/shop" 
              className="hidden sm:block bg-white text-black px-3 sm:px-4 lg:px-6 py-1.5 rounded-full font-medium text-xs lg:text-sm transition-all duration-200 hover:bg-black hover:text-white border border-transparent hover:border-white"
            >
              SHOP NOW
            </Link>

            {/* Hamburger menu button for mobile */}
            <button 
              className="hamburger-button md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none overflow-hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span 
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              ></span>
              <span 
                className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 translate-x-3' : ''}`}
              ></span>
              <span 
                className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              ></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div 
        className={`mobile-menu fixed inset-0 z-40 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '56px' }} // Match reduced header height
      >
        {/* Enhanced background with gradient and blur effect */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-0"></div>
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div 
            className={`absolute -top-[30%] -left-[30%] w-[60%] h-[60%] rounded-full bg-blue-500/10 transition-all duration-1000 ease-out ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
            style={{ transitionDelay: '200ms' }}
          ></div>
          <div 
            className={`absolute top-[70%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 transition-all duration-1000 ease-out ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
            style={{ transitionDelay: '300ms' }}
          ></div>
          <div 
            className={`absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 transition-all duration-1000 ease-out ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
            style={{ transitionDelay: '400ms' }}
          ></div>
        </div>
        
        <div className="container mx-auto px-6 py-6 relative z-20">
          <div className="flex flex-col items-center space-y-5">
            <Link 
              href="/about" 
              className={`text-white hover:text-gray-300 transition-all duration-500 text-xl font-light transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: '100ms' }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-white hover:text-gray-300 transition-all duration-500 text-xl font-light transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: '200ms' }}
            >
              Contact
            </Link>
            <Link 
              href="/shop" 
              className={`text-white hover:text-gray-300 transition-all duration-500 text-xl font-light transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: '300ms' }}
            >
              Shop
            </Link>
            <Link 
              href="/career" 
              className={`text-white hover:text-gray-300 transition-all duration-500 text-xl font-light transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: '400ms' }}
            >
              Career
            </Link>
            <Link 
              href="/shop" 
              className={`mt-4 bg-white text-black px-6 py-2 rounded-full font-medium text-sm transition-all duration-500 hover:bg-black hover:text-white border border-transparent hover:border-white transform ${mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: '500ms' }}
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
