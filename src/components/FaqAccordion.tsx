'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      } 
    }
  };

  const checkmarkVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 15 } },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            className="relative w-full max-w-[1400px] h-[80vh] mx-auto px-8 mt-16 border border-[#1a2e35] rounded-lg"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.95))',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 p-8 h-full">
              {/* Left side - Main heading and description */}
              <motion.div 
                className="md:w-1/2 flex flex-col justify-center"
                variants={itemVariants}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    What is Lorem Ipsum?
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    What is Lorem Ipsum?
                  </motion.span>
                </h1>
                <motion.p 
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  It is a long established fact that a reader will be distracted by the readable
                  content of a page when looking at its layout.
                </motion.p>
              </motion.div>

              {/* Right side - FAQ items */}
              <motion.div 
                className="md:w-1/2 space-y-4 overflow-y-auto max-h-[70vh] pr-2"
                variants={itemVariants}
              >
                {items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 border border-[#1a2e35]"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <motion.div 
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #17B384 0%, #0D9268 100%)'
                            }}
                            variants={checkmarkVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="w-full">
                          <h3 className="font-medium text-white">{item.question}</h3>
                          <div className="mt-2 text-gray-300">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
