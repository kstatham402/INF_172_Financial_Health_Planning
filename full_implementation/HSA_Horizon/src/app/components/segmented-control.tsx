import { motion } from 'motion/react';

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className = '' }: SegmentedControlProps) {
  return (
    <div className={`inline-flex bg-[#F9FAFB] rounded-xl p-1 border border-[#E5E7EB] ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative px-4 py-2 rounded-lg transition-all duration-200 text-sm"
          type="button"
        >
          {value === option.value && (
            <motion.div
              layoutId="segmentedControl"
              className="absolute inset-0 bg-white shadow-sm rounded-lg"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 ${value === option.value ? 'text-[#1F2937]' : 'text-[#6B7280]'}`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
