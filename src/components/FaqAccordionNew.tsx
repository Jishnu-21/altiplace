'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionNewProps {
  items: FaqItem[];
}

const FaqAccordionNew: React.FC<FaqAccordionNewProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>('01'); // Default first item open
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-black text-white font-['Poppins',sans-serif]">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center font-['Plus_Jakarta_Sans',sans-serif]">
          <span className="text-white">FREQUENTLY ASK </span>
          <span className="text-blue-400">QUESTIONS</span>
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="relative flex items-center justify-between rounded-full overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] h-12 sm:h-14 px-3 sm:px-5">
            <input
              type="text"
              placeholder="Search for Battery"
              className="w-full bg-transparent py-2 pr-2 text-gray-400 outline-none text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="bg-white text-black font-bold text-xs sm:text-sm rounded-full cursor-pointer hover:bg-black hover:text-white transition-all duration-200 border border-transparent hover:border-white min-w-[80px] sm:min-w-[100px] h-8 sm:h-10 flex items-center justify-center">
              Search
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {filteredItems.map((item) => (
            <div key={item.id} className="border-b border-gray-800 py-4 sm:py-6">
              <div className="flex justify-between items-start sm:items-center">
                <div className="flex gap-3 sm:gap-6">
                  <span className="text-gray-500 font-medium min-w-[24px] sm:min-w-[30px] text-sm sm:text-base">{item.id}</span>
                  <div>
                    <h3 
                      onClick={() => toggleAccordion(item.id)}
                      className="text-left text-base sm:text-lg md:text-xl font-medium mb-1 cursor-pointer hover:text-gray-300 transition-colors"
                    >
                      {item.question}
                    </h3>
                    <AnimatePresence>
                      {expandedId === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-gray-400 max-w-3xl"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center border cursor-pointer ${expandedId === item.id ? 'border-gray-400 bg-gray-200' : 'border-gray-700 hover:border-gray-500 transition-colors'}`}
                >
                  {expandedId === item.id ? (
                    <span className="text-lg sm:text-xl md:text-2xl font-light text-black">&minus;</span>
                  ) : (
                    <span className="text-lg sm:text-xl md:text-2xl font-light">+</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See All FAQ Button */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <button 
            className="bg-[#1a1a1a] hover:bg-gray-800 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full transition-colors cursor-pointer"
            onClick={() => {/* Handle see all FAQ */}}
          >
            See All FAQ
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default FaqAccordionNew;
