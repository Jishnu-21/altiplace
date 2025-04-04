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
    <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8 lg:px-16 font-['Poppins',sans-serif]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center font-['Plus_Jakarta_Sans',sans-serif]">
          <span className="text-white">FREQUENTLY ASK </span>
          <span className="text-blue-400">QUESTIONS</span>
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-16">
          <div className="relative flex items-center justify-between rounded-full overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] h-14 px-5">
            <input
              type="text"
              placeholder="Search for Battery"
              className="w-full bg-transparent py-2 pr-2 text-gray-400 outline-none text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="bg-white text-black font-medium text-sm rounded-full cursor-pointer hover:bg-gray-100 transition-colors min-w-[100px] h-10 flex items-center justify-center">
              Search
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {filteredItems.map((item) => (
            <div key={item.id} className="border-b border-gray-800 py-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <span className="text-gray-500 font-medium min-w-[30px]">{item.id}</span>
                  <div>
                    <h3 
                      onClick={() => toggleAccordion(item.id)}
                      className="text-left text-xl font-medium mb-1 cursor-pointer hover:text-gray-300 transition-colors"
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
                  className={`w-12 h-12 rounded-full flex items-center justify-center border cursor-pointer ${expandedId === item.id ? 'border-gray-400 bg-gray-200' : 'border-gray-700 hover:border-gray-500 transition-colors'}`}
                >
                  {expandedId === item.id ? (
                    <span className="text-2xl font-light text-black">&minus;</span>
                  ) : (
                    <span className="text-2xl font-light">+</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See All FAQ Button */}
        <div className="mt-12 text-center">
          <button 
            className="bg-[#1a1a1a] hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-full transition-colors cursor-pointer"
            onClick={() => {/* Handle see all FAQ */}}
          >
            See All FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordionNew;
