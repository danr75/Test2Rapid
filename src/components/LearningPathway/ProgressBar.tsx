import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
  barClassName?: string;
  showText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  className = '',
  barClassName = 'bg-blue-600',
  showText = true
}) => {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{completed} of {total} modules</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-full rounded-full ${barClassName} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-right mt-1">
          <span className="text-xs font-medium text-gray-600">{percentage}% complete</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
