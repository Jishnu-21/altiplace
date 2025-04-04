'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashLoaderProps {
  duration?: number; // Duration in milliseconds
  onLoadComplete?: () => void;
}

const SplashLoader: React.FC<SplashLoaderProps> = ({ 
  duration = 4000, 
  onLoadComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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
  }, [duration, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="w-full max-w-md px-4">
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
