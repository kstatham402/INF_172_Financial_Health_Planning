import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface AlertBannerProps {
  type: 'warning' | 'success' | 'info';
  children: ReactNode;
  className?: string;
}

export function AlertBanner({ type, children, className = '' }: AlertBannerProps) {
  const styles = {
    warning: {
      bg: 'bg-red-50',
      border: 'border-[#C62828]',
      text: 'text-[#C62828]',
      icon: AlertCircle
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-[#2E7D32]',
      text: 'text-[#2E7D32]',
      icon: CheckCircle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-[#4F8EF7]',
      text: 'text-[#4F8EF7]',
      icon: Info
    }
  };

  const { bg, border, text, icon: Icon } = styles[type];

  return (
    <div className={`${bg} border-l-4 ${border} rounded-lg p-4 flex items-start gap-3 ${className}`}>
      <Icon className={`w-5 h-5 ${text} flex-shrink-0 mt-0.5`} />
      <div className={`${text} text-sm flex-1`}>{children}</div>
    </div>
  );
}
