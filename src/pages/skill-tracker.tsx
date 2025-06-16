import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface AssessmentStep {
  question: string;
  category: string;
  options: string[];
}

interface SkillResult {
  category: string;
  level: string;
  percentage: number;
  targetPercentage: number;
  description: string;
}

interface TargetRole {
  name: string;
  targetLevels: {
    category: string;
    currentPercentage: number;
    targetPercentage: number;
    currentLevel: string;
    targetLevel: string;
  }[];
}

const assessmentSteps: AssessmentStep[] = [
  {
    question: 'How comfortable are you with JavaScript programming?',
    category: 'Programming',
    options: [
      'Never used it',
      'Basic syntax and variables',
      'Functions, loops, and objects',
      'Advanced concepts like closures and async',
      'Expert level with frameworks and optimization',
    ],
  },
  {
    question: 'How experienced are you with frontend development?',
    category: 'Frontend',
    options: [
      'No experience',
      'Basic HTML and CSS',
      'Working with JavaScript frameworks',
      'Building complex single-page applications',
      'Expert level with optimization and architecture',
    ],
  },
  {
    question: 'How proficient are you with backend development?',
    category: 'Backend',
    options: [
      'No experience',
      'Basic server concepts',
      'Building simple APIs',
      'Complex database design and optimization',
      'Microservices and distributed systems',
    ],
  },
  {
    question: 'Rate your experience with DevOps practices:',
    category: 'DevOps',
    options: [
      'No experience',
      'Basic understanding of CI/CD',
      'Working with containerization',
      'Infrastructure as code and automation',
      'Advanced cloud architecture and optimization',
    ],
  },
  {
    question: 'How would you rate your project management skills?',
    category: 'Management',
    options: [
      'No experience',
      'Team member in managed projects',
      'Leading small teams or features',
      'Managing multiple projects or teams',
      'Enterprise-level program management',
    ],
  },
];

const stepTitles = ['Assessment', 'Results'];

const roleOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Machine Learning Engineer',
  'Technical Lead',
  'Engineering Manager'
];

const SkillTrackerB: React.FC = () => {
  // Only log document and localStorage in useEffect to avoid SSR crash
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[DEBUG] SkillTrackerB MOUNT location:', window.location.href);
      console.log('[DEBUG] SkillTrackerB MOUNT localStorage:', {...window.localStorage});
    }
    return () => {
      if (typeof window !== 'undefined') {
        console.log('[DEBUG] SkillTrackerB UNMOUNT');
      }
    };
  }, []);

  // State for selected role on results page
  const [selectedRoleOnResultsPage, setSelectedRoleOnResultsPage] = React.useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(0); // Stepper progress
  React.useEffect(() => {
    console.log('[DEBUG] currentStep changed:', currentStep);
  }, [currentStep]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(assessmentSteps.length).fill(null)
  );
  
  // For target roles
  const [targetRoles, _setTargetRoles] = useState<TargetRole[]>([]);
  const setTargetRoles = (roles: TargetRole[]) => {
    console.log('[DEBUG] setTargetRoles called with:', roles);
    _setTargetRoles(roles);
  };
  
  // Function to add a new target role when selecting from Results page dropdown
  const handleAddTargetRole = (role: string) => {
    if (!role) return;
    // Prevent duplicates
    if (targetRoles.some(r => r.name === role)) {
      return;
    }
    
    // Set meaningful default target percentages based on the role
    const defaultTargetLevels = skillResults.map(skill => {
      // Define default target percentages based on role and skill category
      let targetPercentage = 75; // Default target percentage
      let targetLevel = 'Advanced';
      
      // Frontend Developer role
      if (role === 'Frontend Developer') {
        if (skill.category === 'Frontend Development') {
          targetPercentage = 90;
          targetLevel = 'Expert';
        } else if (skill.category === 'Backend Development') {
          targetPercentage = 50;
          targetLevel = 'Intermediate';
        } else if (skill.category === 'DevOps') {
          targetPercentage = 40;
          targetLevel = 'Intermediate';
        }
      }
      // Backend Developer role
      else if (role === 'Backend Developer') {
        if (skill.category === 'Frontend Development') {
          targetPercentage = 50;
          targetLevel = 'Intermediate';
        } else if (skill.category === 'Backend Development') {
          targetPercentage = 90;
          targetLevel = 'Expert';
        } else if (skill.category === 'DevOps') {
          targetPercentage = 60;
          targetLevel = 'Advanced';
        }
      }
      // Full Stack Developer role
      else if (role === 'Full Stack Developer') {
        if (skill.category === 'Frontend Development') {
          targetPercentage = 80;
          targetLevel = 'Advanced';
        } else if (skill.category === 'Backend Development') {
          targetPercentage = 80;
          targetLevel = 'Advanced';
        } else if (skill.category === 'DevOps') {
          targetPercentage = 60;
          targetLevel = 'Advanced';
        }
      }
      // DevOps Engineer role
      else if (role === 'DevOps Engineer') {
        if (skill.category === 'Frontend Development') {
          targetPercentage = 40;
          targetLevel = 'Intermediate';
        } else if (skill.category === 'Backend Development') {
          targetPercentage = 60;
          targetLevel = 'Advanced';
        } else if (skill.category === 'DevOps') {
          targetPercentage = 90;
          targetLevel = 'Expert';
        }
      }
      
      return {
        category: skill.category,
        currentPercentage: skill.percentage,
        currentLevel: skill.level || 'Beginner',
        targetPercentage: targetPercentage,
        targetLevel: targetLevel
      };
    });
    
    // Create new target role
    const newTargetRoles = [
      ...targetRoles,
      { name: role, targetLevels: defaultTargetLevels }
    ];
    setTargetRoles(newTargetRoles);
  };

  // Persist targetRoles to localStorage and load on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('targetRoles');
    console.log('[DEBUG] useEffect (load targetRoles) localStorage:', stored);
    if (stored) {
      try {
        setTargetRoles(JSON.parse(stored));
        console.log('[DEBUG] useEffect (load targetRoles) setTargetRoles:', JSON.parse(stored));
      } catch (e) {
        console.log('[DEBUG] useEffect (load targetRoles) parse error:', e);
      }
    }
    console.log('[DEBUG] useEffect (load targetRoles) localStorage (full):', {...window.localStorage});
    console.log('[DEBUG] useEffect (load targetRoles) location:', window.location.href);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log('[DEBUG] useEffect (save targetRoles) targetRoles:', targetRoles);
    window.localStorage.setItem('targetRoles', JSON.stringify(targetRoles));
    console.log('[DEBUG] useEffect (save targetRoles) localStorage (full):', {...window.localStorage});
  }, [targetRoles]);

  // Removed selectedRole state as it's no longer needed

  // For the results page
  const [skillResults, setSkillResults] = useState<SkillResult[]>([
    {
      category: 'Frontend Development',
      level: 'Advanced',
      percentage: 85,
      targetPercentage: 60,
      description: 'You have strong skills in frontend development with expertise in modern frameworks.'
    },
    {
      category: 'Backend Development',
      level: 'Intermediate',
      percentage: 60,
      targetPercentage: 60,
      description: 'You have a good foundation in backend development but could benefit from more advanced training.'
    },
    {
      category: 'DevOps',
      level: 'Beginner',
      percentage: 30,
      targetPercentage: 75,
      description: 'You have basic knowledge of DevOps practices but need significant improvement in this area.'
    }
  ]);

  const currentAssessment = assessmentSteps[currentQuestionIndex];

  // Progress bar calculation
  const progress = ((currentQuestionIndex + 1) / assessmentSteps.length) * 100;

  const [answerStatus, setAnswerStatus] = useState<string | null>(null);
  const [answerLocked, setAnswerLocked] = useState(false);
  const correctOptionIdx = currentAssessment.options.length - 1;

  const handleOptionSelect = (optionIdx: number) => {
    if (answerLocked) return;
    const updated = [...selectedOptions];
    updated[currentQuestionIndex] = optionIdx;
    setSelectedOptions(updated);
    // Check if correct (last option is correct)
    if (optionIdx === correctOptionIdx) {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
    setAnswerLocked(true);
    setTimeout(() => {
      setAnswerStatus(null);
      setAnswerLocked(false);
      if (currentQuestionIndex < assessmentSteps.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentStep(1); // Move to Results step
      }
    }, 1000);
  };

  // Auto-advance is handled by handleOptionSelect, so this function is no longer needed

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToAssessment = () => {
    setCurrentStep(0);
  };

  // Removed handleSetTargetLevels as it's no longer needed

  // Removed handleBackToResults as it's no longer needed

  // Removed handleReviewAndConfirm as it's no longer needed

  // Debug logging for Results page - placed after all state declarations
  React.useEffect(() => {
    if (currentStep === 1) {
      console.log('[DEBUG][RESULTS:RENDER] targetRoles:', targetRoles);
      console.log('[DEBUG][RESULTS:RENDER] selectedRoleOnResultsPage:', selectedRoleOnResultsPage);
      console.log('[DEBUG][RESULTS:RENDER] skillResults:', skillResults);
    }
  }, [currentStep, targetRoles, selectedRoleOnResultsPage, skillResults]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-2">Skill Assessment Tool</h1>
      <p className="text-gray-600 text-center mb-6">
        Discover your capabilities and set your career targets
      </p>
      {/* Stepper */}
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepTitles.map((title, idx) => (
            <div key={title} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  idx === currentStep
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                } font-semibold`}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  idx === currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {title}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-2" />
      </div>

      {/* Assessment Card */}
      {currentStep === 0 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
          <div className="mb-2 text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {assessmentSteps.length}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded mb-4">
            <div
              className="h-2 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {currentAssessment.question}
            </h2>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded font-medium text-gray-700">
              {currentAssessment.category}
            </span>
          </div>
          <div className="space-y-3 mb-6">
            {currentAssessment.options.map((option, idx) => (
              <label
                key={option}
                className={`flex items-center border rounded px-4 py-3 cursor-pointer transition-all border-gray-200 bg-white hover:bg-gray-50`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="mr-3 accent-blue-500"
                  checked={selectedOptions[currentQuestionIndex] === idx}
                  onChange={() => handleOptionSelect(idx)}
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
          </div>
        </div>
      )}

      {/* Results Step */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Assessment Results</h2>

            {/* Target Role Selector */}
            <div className="mb-6">
              <label htmlFor="target-role-select" className="block text-gray-700 font-medium mb-2">Select Target Role:</label>
              <select
                id="target-role-select"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedRoleOnResultsPage || ''}
                onChange={(e) => {
                  const role = e.target.value || null;
                  setSelectedRoleOnResultsPage(role);
                  if (role) {
                    if (!targetRoles.some(r => r.name === role)) {
                      handleAddTargetRole(role);
                    }
                  }
                }}
              >
                <option value="">-- None --</option>
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Skill categories with progress bars */}
            <div className="space-y-4">
              {skillResults.map((skill, index) => (
                <div key={index} className="mb-20">
                  <div className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{skill.category}</span>
                    </div>
                  </div>
                  
                  {/* Progress bar with improved visual design */}
                  <div className="relative w-full h-12 bg-gray-100 rounded-lg mb-16">
                    {/* Level markers - positioned at the bottom of the grey bar */}
                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-1">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium translate-y-6">Beginner</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium translate-y-6">Intermediate</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium translate-y-6">Advanced</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium translate-y-6">Expert</span>
                      </div>
                    </div>
                    
                    {/* Background grid lines */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none">
                      <div className="w-px h-full bg-gray-300"></div>
                      <div className="w-px h-full bg-gray-300"></div>
                      <div className="w-px h-full bg-gray-300"></div>
                      <div className="w-px h-full bg-gray-300"></div>
                      <div className="w-px h-full bg-gray-300"></div>
                    </div>
                    
                    {/* Current capability bar */}
                    <div className="absolute top-1 left-1 h-5 bg-blue-600 rounded transition-all duration-300 flex items-center justify-end pr-2"
                      style={{ width: `calc(${skill.percentage}% - 2px)` }}
                    >
                      <span className="text-white text-xs font-medium">{skill.percentage}%</span>
                    </div>

                    {/* Target indicators and bar, only if a role is selected and target exists for this skill */}
                    {(() => {
                      if (!selectedRoleOnResultsPage) return null;
                      const targetRole = targetRoles.find(role => role.name === selectedRoleOnResultsPage);
                      if (!targetRole) return null;
                      const targetLevel = targetRole.targetLevels.find(level => level.category === skill.category);
                      if (!targetLevel) return null;
                      const targetPercentage = targetLevel.targetPercentage;
                      if (targetPercentage === 0) return null;
                      return (
                        <>
                          {/* Gap indicator - horizontal bar between current and target */}
                          {skill.percentage < targetPercentage && (
                            <div 
                              className="absolute bottom-0 h-5 bg-orange-100 border border-orange-300 rounded flex items-center justify-center"
                              style={{ 
                                left: `${skill.percentage}%`,
                                width: `${targetPercentage - skill.percentage}%`,
                                zIndex: 10
                              }}
                            >
                              <span className="text-orange-800 text-xs font-medium">{targetPercentage - skill.percentage}% gap</span>
                            </div>
                          )}
                          {/* Exceeding target indicator - horizontal bar between target and current */}
                          {skill.percentage > targetPercentage && (
                            <div 
                              className="absolute bottom-0 h-5 bg-green-100 border border-green-300 rounded flex items-center justify-center"
                              style={{ 
                                left: `${targetPercentage}%`,
                                width: `${skill.percentage - targetPercentage}%`,
                                zIndex: 10
                              }}
                            >
                              <span className="text-green-800 text-xs font-medium">+{skill.percentage - targetPercentage}% over</span>
                            </div>
                          )}
                          {/* On target indicator - shown when current equals target */}
                          {skill.percentage === targetPercentage && (
                            <div 
                              className="absolute bottom-0 h-5 bg-blue-100 border border-blue-300 rounded flex items-center justify-center"
                              style={{ 
                                left: `${targetPercentage - 10}%`,
                                width: '20%',
                                zIndex: 10
                              }}
                            >
                              <span className="text-blue-800 text-xs font-medium">On target</span>
                            </div>
                          )}
                          {/* Target level indicator (blue triangle) */}
                          <div className="absolute bottom-0 left-0 pointer-events-none z-50"
                            style={{ left: `${targetPercentage}%` }}
                          >
                            <div className="relative">
                              <div className="absolute left-0 bottom-0 w-0 h-0 
                                border-l-[8px] border-r-[8px] border-b-[12px] 
                                border-l-transparent border-r-transparent border-b-blue-600 
                                transform -translate-x-1/2">
                              </div>
                            </div>
                          </div>
                          {/* Target level text removed as requested */}
                        </>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={handleBackToAssessment}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
            >
              Back to Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTrackerB;
