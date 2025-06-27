import React from 'react';
import { CheckCircleIcon, LockClosedIcon, PlayIcon } from '@heroicons/react/24/outline';

type ContentType = 'text' | 'video' | 'quiz' | 'interactive';

interface ContentItem {
  type: ContentType;
  content: string;
}

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  isFirst: boolean;
  isLast: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
  onComplete?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  duration,
  completed,
  locked,
  isFirst,
  isLast,
  icon,
  onClick
}) => {
  return (
    <div className="flex group">
      {/* Timeline */}
      <div className="flex flex-col items-center w-10 flex-shrink-0">
        {!isFirst && <div className="w-0.5 h-6 bg-gray-200 flex-shrink-0"></div>}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          completed ? 'bg-green-100 text-green-600' : 
          locked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'
        }`}>
          {completed ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : locked ? (
            <LockClosedIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </div>
        {!isLast && <div className={`w-0.5 flex-grow ${completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
      </div>
      
      {/* Content */}
      <div 
        className={`ml-4 pb-8 flex-1 ${!isLast ? 'border-b border-gray-200' : ''}`}
      >
        <div 
          onClick={!locked ? onClick : undefined}
          className={`p-4 rounded-lg transition-colors ${
            locked 
              ? 'bg-gray-50 cursor-not-allowed' 
              : 'hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className={`text-lg font-medium ${
              locked ? 'text-gray-400' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              locked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-800'
            }`}>
              {duration}
            </span>
          </div>
          <p className={`mt-1 text-sm ${
            locked ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
          {completed && (
            <div className="mt-2 flex items-center text-sm text-green-600">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
