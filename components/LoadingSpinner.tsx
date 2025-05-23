
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  color?: string; // Added color prop
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text, color = 'text-ternoae-green' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${color} border-current border-t-transparent`}
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Memuat...</span>
      </div>
      {text && <p className={`mt-2 text-sm ${color}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;