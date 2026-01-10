import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium Animated Loader Component
 * Features: Multiple variants, text animations, pulse effects
 */
const Loader = ({ 
  message = 'Loading...', 
  size = 'md', 
  variant = 'spinner',
  messages = [],
  className = '' 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  // Animated message cycling
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [messages.length]);

  const displayMessage = messages.length > 0 ? messages[currentMessageIndex] : message;

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className="relative">
            <motion.div
              className={`${sizes[size]} border-4 border-blue-200/20 dark:border-blue-900/20 border-t-blue-600 dark:border-t-blue-400 rounded-full`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${sizes[size].split(' ')[0]} ${sizes[size].split(' ')[0]} bg-blue-600 dark:bg-blue-400 rounded-full`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <motion.div
            className={`${sizes[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-full`}
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {renderLoader()}
      {displayMessage && (
        <AnimatePresence mode="wait">
          <motion.p
            key={displayMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-slate-700 dark:text-slate-300 text-sm font-medium text-center"
          >
            {displayMessage}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Loader;
