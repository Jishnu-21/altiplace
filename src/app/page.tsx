'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import Header from '@/components/Header';
import VeloGlow from '@/components/VeloGlow';
import ColorChangeText from '@/components/ColorChangeText';
import ReelsCards from '@/components/ReelsCards';
import SplashLoader from '@/components/SplashLoader';
import FaqAccordionNew from '@/components/FaqAccordionNew';

const ImageScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Reduce total frames for faster loading
  const totalFrames = 131; // Reduced from 262 - using every other frame
  const imageCache = useRef(new Map());
  const ticking = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Create abort controller for cancelling image loads when component unmounts
    abortControllerRef.current = new AbortController();
    
    const loadFirstFrame = () => {
      const img = new window.Image();
      img.src = `/images/video/1.png`;
      img.onload = () => {
        imageCache.current.set(1, img);
        setCurrentFrame(1);
        loadRemainingFrames();
      };
    };

    const loadRemainingFrames = async () => {
      let loaded = 1; 
      const signal = abortControllerRef.current?.signal;

      const loadImage = (frameNum: number) => {
        return new Promise<void>((resolve) => {
          if (signal?.aborted) {
            resolve();
            return;
          }

          const img = new window.Image();
          // Use every other frame to reduce loading time
          const actualFrameNum = frameNum * 2 - 1;
          const frameNumber = String(actualFrameNum);
          img.src = `/images/video/${frameNumber}.png`;
          
          const timeoutId = setTimeout(() => {
            console.warn(`Frame ${frameNumber} timed out, skipping`);
            resolve();
          }, 5000); // 5 second timeout for each image
          
          img.onload = () => {
            clearTimeout(timeoutId);
            imageCache.current.set(frameNum, img);
            loaded++;
            setLoadingProgress(Math.floor((loaded / totalFrames) * 100));
            if (loaded >= totalFrames) {
              setIsLoading(false);
            }
            resolve();
          };
          
          img.onerror = () => {
            clearTimeout(timeoutId);
            console.error(`Failed to load frame ${frameNumber}`);
            resolve();
          };
        });
      };

      // Prioritize frames that will be seen first (first 20%)
      const priorityFrames = Math.floor(totalFrames * 0.2);
      
      // Load priority frames first (sequential loading)
      for (let i = 2; i <= priorityFrames; i++) {
        if (signal?.aborted) break;
        await loadImage(i);
      }
      
      // Then load the rest in chunks
      const chunkSize = 5; // Smaller chunks for better performance
      for (let i = priorityFrames + 1; i <= totalFrames; i += chunkSize) {
        if (signal?.aborted) break;
        
        const chunk = Array.from(
          { length: Math.min(chunkSize, totalFrames - i + 1) },
          (_, index) => loadImage(i + index)
        );
        await Promise.all(chunk);
      }
    };

    loadFirstFrame();
    
    const currentImageCache = imageCache.current;
    return () => {
      // Cancel all pending image loads when component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Clear image cache to free memory
      currentImageCache.clear();
    };
  }, [totalFrames]);

  useEffect(() => {
    // Adjust the frame range for showing text based on the new total frames
    const adjustedStartFrame = Math.floor(192 * (totalFrames / 262));
    setShowText(currentFrame >= adjustedStartFrame && currentFrame <= totalFrames);
  }, [currentFrame, totalFrames]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = 0;
      if (top <= 0) {
        progress = Math.abs(top) / (height - windowHeight);
      }
      progress = Math.max(0, Math.min(1, progress));
      
      const frame = Math.floor(progress * (totalFrames - 1)) + 1;
      setCurrentFrame(frame);
      setScrollProgress(progress);
      ticking.current = false;
    });
  }, [totalFrames]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Get the current frame image or fallback to first frame
  const getCurrentFrame = () => {
    const img = imageCache.current.get(currentFrame);
    return img ? img.src : imageCache.current.get(1)?.src || '';
  };

  return (
    <div className="relative bg-black" ref={containerRef} style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Top gradient - reduced opacity */}
        <div 
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            height: '200px',
            background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.7) 0%, rgba(10, 10, 15, 0.5) 40%, rgba(10, 10, 15, 0.3) 70%, transparent 100%)',
            opacity: Math.max(0.2, 1 - scrollProgress * 0.9), 
          }}
        />
        
        {/* Bottom gradient - reduced opacity */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
          style={{
            height: '300px',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
            opacity: 0.8, 
          }}
        />
        
        <div className="relative w-full h-full">
          {/* Display the current frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            {imageCache.current.get(1) && (
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover"
                style={{ 
                  backgroundImage: `url(${getCurrentFrame()})`,
                  transition: isLoading ? 'none' : 'background-image 0.1s ease-out'
                }}
              />
            )}
          </div>
          
          {/* Text overlay - positioned at bottom left */}
          <div 
            className={`absolute bottom-16 left-16 max-w-lg transition-all duration-700 ease-out transform ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-['Helvetica'] tracking-wider">
              EGEON FROM SATURNE
            </h2>
            <p className="text-lg text-gray-300">
              The Egeon isn&apos;t just a shoe &ndash; it&apos;s a statement. Designed for those who value 
              aesthetics as much as performance, combining cutting-edge technology with a 
              timeless design.
            </p>
          </div>
          
          {loadingProgress < 100 && (
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md text-sm">
              Loading frames: {loadingProgress}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ZoomText = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scale, setScale] = useState(1);
  const [zTranslate, setZTranslate] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolled = window.scrollY - rect.top;
        const sectionHeight = rect.height;
        const progress = scrolled / sectionHeight;
        
        const maxScale = window.innerWidth < 768 ? 2 : 3;
        const newScale = 1 + (Math.pow(progress, 1.5) * maxScale);
        setScale(newScale);
        
        const maxZMove = window.innerWidth < 768 ? 400 : 600;
        const zMove = progress * maxZMove;
        setZTranslate(zMove);

        const fadeStart = 0.9;
        if (progress > fadeStart) {
          const fadeProgress = (progress - fadeStart) / (1 - fadeStart);
          setOpacity(Math.max(1 - fadeProgress, 0));
        } else {
          setOpacity(1);
        }
      } else if (rect.top > 0) {
        setScale(1);
        setZTranslate(0);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[300vh] sm:min-h-[350vh] md:min-h-[400vh]"
    >
      <div className="sticky bg-white top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source 
              src="https://cdn.prod.website-files.com/676ed6008062626040aa764f/677fd6a74c3084ed75a113cb_video-shoe-transcode.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div 
            className="transition-all duration-1000 ease-out"
            style={{
              transform: `
                perspective(2000px)
                translateZ(${zTranslate}px)
                scale(${scale})
              `,
              opacity: opacity,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative w-[280px] h-[70px] sm:w-[400px] sm:h-[100px] md:w-[600px] md:h-[150px] lg:w-[800px] lg:h-[200px]">
              <div 
                className="absolute inset-0 bg-white"
                style={{
                  maskImage: 'url(https://cdn.prod.website-files.com/676ed6008062626040aa764f/677fd7b22e91eb9714578b95_677fccdd00269f526be400b3_mask-text.svg)',
                  WebkitMaskImage: 'url(https://cdn.prod.website-files.com/676ed6008062626040aa764f/677fd7b22e91eb9714578b95_677fccdd00269f526be400b3_mask-text.svg)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
  
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Handle splash screen completion
  const handleLoadComplete = () => {
    setIsLoading(false);
    // Add a small delay before showing content for smoother transition
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  const faqItems = [
    { 
      id: '01',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac.' 
    },
    { 
      id: '02',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
    { 
      id: '03',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
    { 
      id: '04',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
  ];

  return (
    <>
      {/* Splash Loader */}
      {isLoading && <SplashLoader onLoadComplete={handleLoadComplete} />}
      
      {/* Main Content */}
      <main 
        className="min-h-screen bg-black transition-opacity duration-500"
        style={{ 
          opacity: contentVisible ? 1 : 0,
          visibility: contentVisible ? 'visible' : 'hidden'
        }}
      >
        <Header />
        <VeloGlow />
        <ImageScroll />
        <ColorChangeText />
        <ZoomText />
        <main className="min-h-screen bg-black">
          <FaqAccordionNew items={faqItems} />
        </main>
        <ReelsCards />
      </main>
    </>
  );
};

export default Home;
