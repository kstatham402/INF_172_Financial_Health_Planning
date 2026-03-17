import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface HSACardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function HSACard({ children, className = '', hover = false }: HSACardProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
