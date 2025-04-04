'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 font-['Poppins',sans-serif]">
      <div className="w-full max-w-full mx-auto bg-[#111111] p-10">
        {/* Logo and Line Section - Full Width */}
        <div className="w-full max-w-[1400px] mx-auto mb-16 relative px-4 sm:px-6 lg:px-8">
          <div className="w-full relative">
            <Image 
              src="/images/logo/altipace.svg" 
              alt="Altiplace Logo" 
              width={1400} 
              height={420} 
              className="w-full max-w-[1400px] object-contain md:mx-0"
              priority
            />
            {/* Horizontal line positioned below the letter 'p', setting the margin */}
            <div className="absolute border-b border-gray-700 w-[90%] mx-auto left-[10%] right-0" style={{ top: '80%' }}></div>
          </div>
        </div>

        {/* All content below follows the same margin as the line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1400px] mx-auto pl-[10%] pr-4 sm:pr-6 lg:pr-8">
          {/* Info Column */}
          <div className="col-span-1 md:col-span-1">
            <p className="text-sm text-gray-400 mb-4">
              Welcome to Alti Pace where we prioritize health and wellness
              with our innovative approach. Our smart devices make health
              tracking effortless, helping you live a better life.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>6437 Washington Ave, Manchester, Kentucky 546495</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@altipace.com</span>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-4">Follow us</h4>
              <div className="flex gap-3">
                <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-6">
              2024, altipace inc. All rights reserved.
            </div>
          </div>
          
          {/* Services Column 1 */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
            </ul>
          </div>
          
          {/* Services Column 2 */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
              <li className="text-gray-400 text-sm">Lorem ipsum</li>
            </ul>
          </div>
          
          {/* Newsletter and App Download */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-6">Subscribe For Newsletter</h3>
            <div className="flex mb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 rounded-l-full py-2 px-4 text-sm w-full outline-none"
              />
              <button className="bg-white text-black font-medium rounded-r-full px-4 text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-8">No ads. No trials. No commitments.</p>
            
            <h3 className="text-lg font-medium mb-4">Download App</h3>
            <div className="flex gap-2">
              <Link href="#" className="block">
                <Image 
                  src="/images/google-play.png" 
                  alt="Get it on Google Play" 
                  width={120} 
                  height={40} 
                  className="object-contain"
                />
              </Link>
              <Link href="#" className="block">
                <Image 
                  src="/images/app-store.png" 
                  alt="Download on the App Store" 
                  width={120} 
                  height={40} 
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 max-w-[1400px] mx-auto pl-[10%] pr-4 sm:pr-6 lg:pr-8">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Need help? Call us</p>
                <p className="text-amber-500 font-medium">1-34-5778-54673</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal notice</Link>
            <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
