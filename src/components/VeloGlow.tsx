import React, { memo } from 'react';
import Image from 'next/image';

const VeloGlow: React.FC = memo(() => {
  return (
    <div 
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ 
        background: '#0a0a0f',
        perspective: '1000px'
      }}
    >
      {/* Bottom gradient for seamless transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, #0a0a0f, transparent)',
        }}
      />
      
      {/* Container for both text and image */}
      <div className="relative w-full flex justify-center items-center">
        {/* Text layer */}
        <div 
          className="relative text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[16rem] font-bold tracking-wider text-white text-center mx-auto px-6 md:px-8 lg:px-12"
          style={{ 
            fontFamily: 'Montserrat, sans-serif',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden'
          }}
        >
          VELO
          
          {/* Optimized glow effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.15), transparent 50%, rgba(255, 255, 255, 0.15))',
              filter: 'blur(40px)',
              transform: 'translate3d(0,0,0)',
              opacity: 0.8
            }}
          >
            VELO
          </div>
        </div>

        {/* Image layer */}
        <div 
          className="absolute left-1/2 pointer-events-none w-[62vw] h-[62vw] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[430px] lg:h-[430px] xl:w-[530px] xl:h-[530px] -top-[35%] sm:-top-[35%] md:-top-[40%]"
          style={{
            transform: 'translate3d(-50%, 20%, 0)',
          }}
        >
          <Image
            src="/images/banners/velo1.svg"
            alt="Velo Ring"
            layout="fill"
            objectFit="contain"
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
});

VeloGlow.displayName = 'VeloGlow';

export default VeloGlow;