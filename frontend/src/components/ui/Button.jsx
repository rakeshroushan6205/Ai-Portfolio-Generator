import { motion } from "framer-motion";
import { forwardRef } from "react";

/**
 * Premium Button Component
 * Features: Hover glow, scale animation, gradient effects
 */
const Button = forwardRef(
  (
    {
      children,
      onClick,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      type = "button",
      className = "",
      icon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/50",
      secondary:
        "bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/50 dark:border-white/10 hover:border-slate-300/50 dark:hover:border-white/20",
      ghost:
        "bg-transparent hover:bg-slate-100/50 dark:hover:bg-white/5 text-slate-900 dark:text-white",
      outline:
        "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {/* Animated background gradient on hover */}
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <motion.svg
              className="h-5 w-5"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </motion.svg>
          )}
          {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
