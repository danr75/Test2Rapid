import React from 'react';

interface SkillProps {
  category: string;
  percentage: number;
}

interface TargetLevelProps {
  targetPercentage: number;
  targetLevel: string;
}

interface CapabilityBarProps {
  skill: SkillProps;
  targetLevel?: TargetLevelProps;
}

const CapabilityBar: React.FC<CapabilityBarProps> = ({ skill, targetLevel }) => {
  // Calculate if we're over or under target
  const hasTarget = targetLevel && targetLevel.targetPercentage;
  const gap = hasTarget ? Math.abs(skill.percentage - targetLevel.targetPercentage) : 0;
  const isOver = hasTarget && skill.percentage > targetLevel.targetPercentage;
  
  return (
    <div className="mb-8">
      <div className="text-lg font-semibold text-gray-800 mb-2">{skill.category}</div>
      <div className="relative h-8 bg-gray-100 rounded-xl overflow-visible border border-gray-200">
        {/* Background grid lines */}
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
        </div>
        
        {/* Blue progress bar */}
        <div 
          className="absolute top-1 left-1 h-6 bg-blue-600 rounded-xl transition-all duration-300 flex items-center" 
          style={{ width: `${skill.percentage}%` }}
        >
          {/* Percentage label inside bar */}
          <span className="ml-auto mr-2 text-white text-xs font-medium">{skill.percentage}%</span>
        </div>
        
        {/* Target indicator with gap/over pill */}
        {hasTarget && (
          <div className="absolute -top-5" style={{ left: `${targetLevel.targetPercentage}%`, zIndex: 20 }}>
            <div className="flex flex-col items-center">
              <span className={`${isOver ? 'bg-green-100 border-green-300 text-green-800' : 'bg-orange-100 border-orange-300 text-orange-800'} border text-xs font-medium px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap`}>
                {isOver ? `+${gap}% over` : `${gap}% gap`}
              </span>
              {/* Triangle marker */}
              <div className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent ${isOver ? 'border-t-green-100' : 'border-t-orange-100'}`}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Level labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-600">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
        <span>Expert</span>
      </div>
    </div>
  );
};

export default CapabilityBar;
