import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * Premium Stepper Component
 * Shows progress through multi-step process with animations
 */
const Stepper = ({ currentStep = 1, steps = [] }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Background progress line */}
        <div className="absolute top-6 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep - 1) / Math.max(steps.length - 1, 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Step indicators */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isPending = stepNumber > currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center gap-3 flex-1 relative z-10">
              {/* Step circle */}
              <motion.div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  font-bold text-sm transition-all duration-300 relative
                  ${
                    isCompleted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                      : isActive
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 ring-4 ring-blue-600/20 dark:ring-blue-400/20 border-2 border-blue-600 dark:border-blue-400'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
                  }
                `}
                initial={false}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <span>{stepNumber}</span>
                )}
                
                {/* Pulse animation for active step */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-400"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {/* Step label */}
              <motion.span
                className={`
                  text-xs font-semibold text-center max-w-[100px]
                  ${isActive ? 'text-blue-600 dark:text-blue-400' : isCompleted ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'}
                `}
                initial={false}
                animate={{
                  opacity: isPending ? 0.5 : 1,
                }}
              >
                {step}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
