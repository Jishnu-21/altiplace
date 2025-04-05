'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SplashLoaderProps {
  duration?: number; // Duration in milliseconds
  onLoadComplete?: () => void;
  forceShow?: boolean; // Force show splash screen even if assets are loaded
}

const SplashLoader: React.FC<SplashLoaderProps> = ({ 
  duration = 10000, 
  onLoadComplete,
  forceShow = false
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);
  const router = useRouter();

  // Check if we should show the splash screen
  useEffect(() => {
    // Skip splash screen if assets are already loaded (not first visit)
    // unless forceShow is true
    if (typeof window !== 'undefined' && !forceShow) {
      const assetsLoaded = localStorage.getItem('altiplace_assets_loaded');
      if (assetsLoaded === 'true') {
        setShouldShow(false);
        // Immediately complete
        if (onLoadComplete) onLoadComplete();
        return;
      }
    }
  }, [forceShow, onLoadComplete]);

  // Progress animation effect
  useEffect(() => {
    if (!shouldShow) return;
    
    // Calculate how often to update the progress bar to make it smooth
    const interval = 20; // Update every 20ms for smooth animation
    const steps = duration / interval;
    const increment = 100 / steps;
    
    // Start progress animation
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(timer);
        
        // Mark assets as loaded in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('altiplace_assets_loaded', 'true');
        }
        
        // Start fade out animation
        setTimeout(() => {
          setIsVisible(false);
          // Call onLoadComplete callback after fade out animation
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
          }, 500); // Match the transition duration
        }, 200); // Small delay before starting fade out
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [duration, onLoadComplete, shouldShow]);
  
  // If we shouldn't show the splash screen, return null immediately
  if (!shouldShow || !isVisible) return null;



  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="w-full max-w-md px-6 md:px-8 lg:px-12">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image 
            src="/images/logo/logo.webp" 
            alt="Altiplace Logo" 
            width={200} 
            height={80} 
            priority
            className="object-contain"
          />
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <div className="text-center text-gray-400 text-sm">
          Loading experience... {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;
