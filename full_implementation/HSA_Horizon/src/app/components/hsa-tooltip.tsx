import { ReactNode, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HSATooltipProps {
  content: ReactNode;
  children?: ReactNode;
}

export function HSATooltip({ content, children }: HSATooltipProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="inline-flex flex-col w-full">
      <div className="inline-flex items-center">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#4F8EF7] hover:text-[#3B7AE0] transition-colors ml-2 flex-shrink-0"
        >
          {children || <HelpCircle className="w-5 h-5" />}
        </button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-sm rounded-lg py-3 px-4">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}