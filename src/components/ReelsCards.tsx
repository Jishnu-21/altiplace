'use client';

import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ReelCard {
  id: number;
  videoSrc: string;
  posterSrc: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
}

const ReelsCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // State for modal
  const [selectedReel, setSelectedReel] = useState<ReelCard | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Handle card click to open modal
  const handleCardClick = (reel: ReelCard) => {
    setSelectedReel(reel);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedReel(null);
    document.body.style.overflow = ''; // Re-enable scrolling
    
    // Pause the modal video if it's playing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  // Handle click outside modal content to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Memoize the reels data to prevent recreating on each render
  const reels = useMemo(() => [
    {
      id: 1,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/f8e2b0ba-d342-11ef-a2c1-428544fd1e23/c51e542d-eeac-11ef-ad94-faefa73ee95e/c5ce601f-eeac-11ef-ad94-faefa73ee95e_preview.mp4",
      posterSrc: "",
      title: "Morning Run",
      description: "Experience the exhilaration of an early morning run through scenic mountain trails. This high-intensity workout combines cardio and strength training for maximum results.",
      duration: "15 min",
      category: "Cardio"
    },
    {
      id: 2,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/f8e2b0ba-d342-11ef-a2c1-428544fd1e23/81265edf-fa86-11ef-8049-1a41024eda2e/81becaf2-fa86-11ef-8049-1a41024eda2e_video.mp4",
      posterSrc: "",
      title: "Beach Workout",
      description: "Take your fitness routine to the sandy shores with this full-body beach workout. Utilize the natural resistance of sand to intensify your training and sculpt lean muscle.",
      duration: "22 min",
      category: "Full Body"
    },
    {
      id: 3,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/f8e2b0ba-d342-11ef-a2c1-428544fd1e23/fed764de-f4d8-11ef-95a9-d6362be64710/ffc49838-f4d8-11ef-95a9-d6362be64710_video.mp4",
      posterSrc: "",
      title: "Sunset Yoga",
      description: "Unwind and reconnect with this calming sunset yoga session. Perfect for stress relief and improving flexibility, this routine combines gentle stretches with mindful breathing.",
      duration: "18 min",
      category: "Flexibility"
    },
    {
      id: 4,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/f8e2b0ba-d342-11ef-a2c1-428544fd1e23/0f55a33b-f99a-11ef-83b2-96ffdd26d8bf/0ffbe512-f99a-11ef-83b2-96ffdd26d8bf_video.mp4",
      posterSrc: "",
      title: "Gym Session",
      description: "Maximize your gym time with this efficient strength training routine. Targeting all major muscle groups, this workout is designed to build strength and increase metabolic rate.",
      duration: "30 min",
      category: "Strength"
    },
    {
      id: 5,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/f8e2b0ba-d342-11ef-a2c1-428544fd1e23/81d4eb23-eead-11ef-ad94-faefa73ee95e/8296829f-eead-11ef-ad94-faefa73ee95e_video.mp4",
      posterSrc: "",
      title: "Pre-Workout Stretch",
      description: "Prepare your body for intense exercise with this comprehensive pre-workout stretching routine. Reduce injury risk and improve performance with these dynamic movements.",
      duration: "10 min",
      category: "Warm-up"
    },
    {
      id: 6,
      videoSrc: "https://d5ap13rps3ht6.cloudfront.net/8a742554-d177-11ef-808e-8aae7afc63b8/daa7257f-d17a-11ef-877c-9a35e5f0f4dd/dad9706c-d17a-11ef-877c-9a35e5f0f4dd_video.mp4",
      posterSrc: "",
      title: "Mountain Meditation",
      description: "Find your center with this guided mountain meditation session. Connect with nature and restore mental clarity while enjoying breathtaking views and peaceful surroundings.",
      duration: "12 min",
      category: "Mindfulness"
    }
  ], []);

  // Use passive listener for better scroll performance
  useEffect(() => {
    const handleScroll = () => {
      // Empty function to keep the scroll event listener
      // We don't need any scroll calculations anymore
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize the IntersectionObserver callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      
      if (entry.isIntersecting) {
        // Only load the video when it's actually in view
        if (video.readyState === 0) {
          video.load();
        }
        video.muted = true;
        // Use a promise with catch to handle autoplay restrictions
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented, nothing to do
          });
        }
      } else {
        // Pause when out of view to save resources
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, []);

  useEffect(() => {
    // Create observer with optimized threshold
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.3,
      rootMargin: '100px' // Preload videos slightly before they come into view
    });

    // Get current refs to avoid closure issues
    const currentVideoRefs = videoRefs.current.filter(Boolean);
    
    // Observe all videos
    currentVideoRefs.forEach(video => {
      if (video) observer.observe(video);
    });

    // Cleanup function
    return () => {
      currentVideoRefs.forEach(video => {
        if (video) observer.unobserve(video);
      });
      observer.disconnect();
    };
  }, [handleIntersection]);

  // Memoize the ref setter function
  const setVideoRef = useCallback((el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
  }, []);

  // Get visible reels based on screen size
  const visibleReels = useMemo(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      // Show only 3 cards on mobile (less than 768px)
      if (width < 768) {
        return reels.slice(0, 3);
      }
    }
    return reels;
  }, [reels]);

  // Precompute card styles for better performance
  const cardStyles = useMemo(() => {
    // Get window width for responsive calculations
    const getResponsiveValues = () => {
      // Default values for desktop
      let baseOffset = 2.5;
      let translateXMultiplier = 180;
      let rotationMultiplier = 5;
      let translateYBase = 120;
      
      // Check if window is defined (for SSR compatibility)
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        
        if (width < 640) { // Small mobile
          baseOffset = 1;
          translateXMultiplier = 80;
          rotationMultiplier = 3;
          translateYBase = 60;
        } else if (width < 768) { // Large mobile / small tablet
          baseOffset = 1;
          translateXMultiplier = 120;
          rotationMultiplier = 4;
          translateYBase = 80;
        } else if (width < 1024) { // Tablet
          baseOffset = 2.2;
          translateXMultiplier = 150;
          rotationMultiplier = 4.5;
          translateYBase = 100;
        }
      }
      
      return { baseOffset, translateXMultiplier, rotationMultiplier, translateYBase };
    };
    
    const { baseOffset, translateXMultiplier, rotationMultiplier, translateYBase } = getResponsiveValues();
    const currentReels = visibleReels;
    
    return currentReels.map((_, index) => {
      const offset = index - (currentReels.length > 3 ? baseOffset : 1);
      const translateX = offset * translateXMultiplier;
      const rotationZ = index % 2 === 0 
        ? Math.abs(offset) * rotationMultiplier 
        : -Math.abs(offset) * rotationMultiplier;
      const translateY = Math.abs(offset) * 10 - translateYBase;
      
      return {
        transform: `
          translateX(${translateX}px) 
          translateY(${translateY}px)
          rotateZ(${rotationZ}deg)
        `,
        zIndex: 10 - Math.abs(offset)
      };
    });
  }, [visibleReels]);

  // Listen for window resize to update card styles
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to recalculate card styles
      // This is a simple approach; for production, consider using a state variable
      // to trigger re-renders only when necessary
      forceUpdate();
    };
    
    // Simple forceUpdate implementation
    const forceUpdate = () => {
      if (containerRef.current) {
        const display = containerRef.current.style.display;
        containerRef.current.style.display = 'none';
        // Trigger reflow
        void containerRef.current.offsetHeight;
        containerRef.current.style.display = display;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black overflow-hidden"
    >
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="relative w-full max-w-[1400px] h-[80vh] mx-auto px-6 md:px-8 lg:px-12 mt-16"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute top-[-100px] right-4 sm:right-8 z-0 text-right">
              <h1 
                className="text-5xl sm:text-8xl md:text-[180px] font-bold text-white select-none"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '-0.05em',
                  textShadow: '0 0 15px rgba(255,255,255,0.3)',
                  zIndex: -1,
                }}
              >
                WHAT&apos;S
              </h1>
            </div>
            
            <div className="flex justify-center items-center w-full h-full relative z-10">
              {visibleReels.map((reel, index) => (
                <div
                  key={reel.id}
                  className="absolute w-[200px] h-[350px] sm:w-[250px] sm:h-[435px] md:w-[300px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-6"
                  style={{
                    ...cardStyles[index],
                    border: '4px solid rgba(255, 255, 255, 0.95)',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '36px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
                  }}
                >
                  <div className="relative w-full h-full cursor-pointer" onClick={() => handleCardClick(reel)}>                  
                    <video
                      ref={el => setVideoRef(el, index)}
                      data-index={index}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={reel.videoSrc} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <h3 className="text-white text-lg font-bold">{reel.title}</h3>
                        <p className="text-gray-300 text-sm">{reel.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selected reel */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          >
            {/* Backdrop with blur effect */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Modal content */}
            <motion.div 
              className="relative z-10 bg-[#111] rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Video section - takes 60% on desktop */}
              <div className="w-full md:w-3/5 relative bg-black">
                <video
                  ref={modalVideoRef}
                  className="w-full object-cover h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={selectedReel.videoSrc} type="video/mp4" />
                </video>
              </div>

              {/* Details section - takes 40% on desktop */}
              <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 flex flex-col h-[40vh] md:h-auto overflow-y-auto">
                <div className="flex justify-between items-start mb-3 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{selectedReel.title}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">{selectedReel.category}</span>
                      <span className="text-gray-400">{selectedReel.duration}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white p-2 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="text-gray-300 mb-4 sm:mb-6 flex-grow text-sm sm:text-base">
                  <p>{selectedReel.description}</p>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-white text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-black hover:text-white transition-all duration-200 border border-transparent hover:border-white text-sm sm:text-base">
                    Start Workout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReelsCards;
