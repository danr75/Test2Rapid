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
        {/* Background grid lines for skill levels */}
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-px h-full bg-gray-200"></div>
        </div>
        
        {/* Skill level indicators */}
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          <div className="w-0.5 h-full bg-gray-300" style={{ left: '25%' }}></div>
          <div className="w-0.5 h-full bg-gray-300" style={{ left: '50%' }}></div>
          <div className="w-0.5 h-full bg-gray-300" style={{ left: '75%' }}></div>
        </div>
        
        {/* Blue progress bar */}
        <div 
          className="absolute top-1 left-1 h-6 bg-blue-600 rounded-xl transition-all duration-300 flex items-center" 
          style={{ width: `${skill.percentage}%` }}
        >
          {/* Percentage label inside bar */}
          <span className="ml-auto mr-2 text-white text-xs font-medium">{skill.percentage}%</span>
        </div>
        
        {/* Target level indicator */}
        {hasTarget && (
          <div 
            className="absolute left-0 flex flex-col items-center z-10" 
            style={{ 
              left: `${targetLevel.targetPercentage}%`,
              top: '-24px',
              transform: 'translateX(-50%)'  // Center the indicator horizontally
            }}
          >
            <span className="text-xs text-purple-700 font-medium mb-1">Target</span>
            <div className="relative w-4" style={{ height: 'calc(100% + 24px)' }}>
              <div 
                className="absolute w-px bg-purple-500" 
                style={{
                  top: '16px',  // Start below the label
                  bottom: 'calc(50% - 4px)',  // End at the middle of the progress bar
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              ></div>
              <div 
                className="absolute w-4 h-4 rounded-full border-2 border-purple-500 bg-white"
                style={{
                  bottom: 'calc(50% - 4px)',  // Center in the progress bar
                  left: '50%',
                  transform: 'translate(-50%, 50%)'
                }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Gap/Over indicator */}
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
      <div className="relative mt-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Aware</span>
          <span>Participate</span>
          <span>Lead</span>
          <span>Expert</span>
        </div>
      </div>
    </div>
  );
};

export default CapabilityBar;
