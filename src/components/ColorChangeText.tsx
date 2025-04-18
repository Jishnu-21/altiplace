import React, { useEffect, useRef, useCallback } from 'react';

const ColorChangeText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  const setLineRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      lineRefs.current[index] = el;
      // Set initial styles based on line index
      if (index === 0) {
        el.style.filter = 'blur(5px)';
        el.style.opacity = '0.5';
      } else {
        el.style.filter = 'blur(10px)';
        el.style.opacity = '0';
      }
      el.style.transform = 'scale(0.95)';
      el.style.color = 'rgb(128, 128, 128)';
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, 
        -containerRect.top / (containerRect.height - viewportHeight)
      ));

      lineRefs.current.forEach((line, index) => {
        if (!line) return;

        const delay = index * 0.15;
        const lineProgress = Math.max(0, Math.min(1, 
          (scrollProgress * 1.5) - delay
        ));

        const blur = Math.max(0, (1 - lineProgress) * 5);
        const opacity = Math.min(1, lineProgress * 1.2);
        
        line.style.filter = `blur(${blur}px)`;
        line.style.opacity = opacity.toString();
        line.style.transform = `scale(${0.95 + (lineProgress * 0.05)})`;
        line.style.color = `rgb(${
          Math.round(128 + (127 * lineProgress))
        }, ${
          Math.round(128 + (127 * lineProgress))
        }, ${
          Math.round(128 + (127 * lineProgress))
        })`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lines = [
    "There are many variations of",
    "passages of Lorem Ipsum available,",
    "but the majority have suffered",
    "alteration in some form, by injected",
    "humour, or randomised words",
    "which don't look even slightly",
  ];

  return (
    <div className="relative min-h-[200vh]" ref={containerRef}>
      {/* Top gradient overlay - lighter for better visibility */}
      <div 
        className="absolute top-0 left-0 right-0 h-[200px] z-20" 
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)',
          opacity: 0.8,
        }}
      />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-20" />
      
      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="w-full max-w-[90rem] mx-auto relative z-10">
          <div className="px-6 md:px-8 lg:px-12">
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {lines.map((line, index) => (
                <div
                  key={index}
                  ref={el => setLineRef(el, index)}
                  className="transition-all duration-500 will-change-transform"
                  style={{
                    fontSize: 'clamp(1.75rem, 5vw, 5rem)',
                    lineHeight: '1.2',
                    fontWeight: '300',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    maxWidth: '100%',
                    overflowWrap: 'break-word',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorChangeText;
