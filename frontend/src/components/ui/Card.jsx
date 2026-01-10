import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Premium Glass Card Component
 * Features: Glassmorphism, hover lift animation, gradient borders
 */
const Card = forwardRef(({
  children,
  className = '',
  padding = true,
  hover = false,
  variant = 'default',
  ...props
}, ref) => {
  const baseStyles = 'glass-card transition-all duration-300';
  
  const variants = {
    default: '',
    elevated: 'shadow-2xl hover:shadow-3xl',
    bordered: 'border-2 border-blue-200/50 dark:border-blue-800/50',
  };

  const paddingStyles = padding ? 'p-6 md:p-8' : '';
  
  const cardContent = (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  if (hover) {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div ref={ref}>{cardContent}</div>;
});

Card.displayName = 'Card';

export default Card;
