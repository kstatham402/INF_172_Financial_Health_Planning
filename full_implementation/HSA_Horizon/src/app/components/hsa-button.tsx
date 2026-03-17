import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'motion/react';

interface HSAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const HSAButton = forwardRef<HTMLButtonElement, HSAButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200 font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-[#FF8A5C] text-white hover:bg-[#FF7A4A] shadow-md hover:shadow-lg',
      secondary: 'bg-white text-[#1F2937] border-2 border-[#E5E7EB] hover:border-[#FF8A5C] hover:bg-[#FFF5F0] shadow-sm',
      ghost: 'text-[#6B7280] hover:text-[#FF8A5C] hover:bg-[#FFF5F0]'
    };
    
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            Loading...
          </>
        ) : children}
      </motion.button>
    );
  }
);

HSAButton.displayName = 'HSAButton';
