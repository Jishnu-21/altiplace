'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/70 backdrop-blur-md py-4' 
          : 'bg-transparent py-6'
      } transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" >
            <Image 
              src="/images/logo/altipace.svg" 
              alt="Altiplace Logo" 
              className="h-10 transition-all duration-300"
              width={120}
              height={40}
            />
          </Link>
          
          {/* Center navigation links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
              Contact
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300 transition-colors">
              Shop
            </Link>
            <Link href="/career" className="text-white hover:text-gray-300 transition-colors">
              Career
            </Link>
          </div>

          {/* Right-aligned shop now button with inverted hover colors */}
          <Link 
            href="/shop" 
            className="bg-white text-black px-8 py-2 rounded-full font-medium transition-all duration-200 hover:bg-black hover:text-white border border-transparent hover:border-white"
          >
            SHOP NOW
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
