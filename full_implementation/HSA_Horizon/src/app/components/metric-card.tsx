import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

export function MetricCard({ label, value, trend = 'neutral', icon, className = '' }: MetricCardProps) {
  const trendColors = {
    up: 'text-[#2E7D32]',
    down: 'text-[#C62828]',
    neutral: 'text-[#6B7280]'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : DollarSign;

  return (
    <motion.div
      className={`bg-white rounded-xl p-5 border border-[#E5E7EB] ${className}`}
      whileHover={{ y: -2, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#6B7280]">{label}</span>
        {icon || <TrendIcon className={`w-5 h-5 ${trendColors[trend]}`} />}
      </div>
      <div className="text-2xl text-[#1F2937]">{value}</div>
    </motion.div>
  );
}
