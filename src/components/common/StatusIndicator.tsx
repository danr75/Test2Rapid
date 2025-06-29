import React from 'react';

type Status = 'needs-attention' | 'on-track' | 'excelling' | 'completed';

interface StatusIndicatorProps {
  status: Status;
  className?: string;
}

const statusMap = {
  'needs-attention': {
    text: 'Needs Attention',
    textColor: 'text-red-600',
    dotColor: 'bg-red-500'
  },
  'on-track': {
    text: 'On Track',
    textColor: 'text-blue-600',
    dotColor: 'bg-blue-500'
  },
  'excelling': {
    text: 'Excelling',
    textColor: 'text-green-600',
    dotColor: 'bg-green-500'
  },
  'completed': {
    text: 'Completed',
    textColor: 'text-green-600',
    dotColor: 'bg-green-500'
  }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className = '' }) => {
  const statusConfig = statusMap[status];
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusConfig.textColor} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></span>
      {statusConfig.text}
    </span>
  );
};

export default StatusIndicator;
