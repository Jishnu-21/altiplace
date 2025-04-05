'use client';

import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallbackText?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ 
  scene, 
  className = "w-full h-screen", 
  fallbackText = "Loading 3D scene..." 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Handle successful load
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle load error
  const handleError = (error: any) => {
    console.error('Error loading Spline scene:', error);
    setLoadError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-white text-lg">{fallbackText}</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center text-white p-6 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Failed to load 3D scene</h3>
            <p>There was a problem loading the interactive 3D content. Please check your connection and try refreshing the page.</p>
          </div>
        </div>
      )}

      {/* Spline scene */}
      <Spline 
        scene={scene} 
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full"
      />
    </div>
  );
};

export default SplineScene;
