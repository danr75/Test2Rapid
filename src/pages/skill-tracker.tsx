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

const stepTitles = ['Assessment', 'Results', 'Set Targets', 'Confirm'];

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
  const [currentStep, setCurrentStep] = useState(0); // Stepper progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(assessmentSteps.length).fill(null)
  );
  
  // For target roles
  const [targetRoles, setTargetRoles] = useState<TargetRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');

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

  const handleOptionSelect = (optionIdx: number) => {
    const updated = [...selectedOptions];
    updated[currentQuestionIndex] = optionIdx;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentSteps.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(1); // Move to Results step
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToAssessment = () => {
    setCurrentStep(0);
  };

  const handleSetTargetLevels = () => {
    setCurrentStep(2);
  };

  const handleBackToResults = () => {
    setCurrentStep(1);
  };

  const handleReviewAndConfirm = () => {
    setCurrentStep(3);
  };

  const handleAddTargetRole = () => {
    if (selectedRole && !targetRoles.some(role => role.name === selectedRole)) {
      // Create a new target role with default target levels
      const newTargetRole: TargetRole = {
        name: selectedRole,
        targetLevels: [
          {
            category: 'Programming',
            currentPercentage: 25,
            targetPercentage: 75,
            currentLevel: 'Beginner',
            targetLevel: 'Advanced'
          },
          {
            category: 'Frontend',
            currentPercentage: 100,
            targetPercentage: 50,
            currentLevel: 'Expert',
            targetLevel: 'Intermediate'
          },
          {
            category: 'Backend',
            currentPercentage: 75,
            targetPercentage: 25,
            currentLevel: 'Advanced',
            targetLevel: 'Beginner'
          },
          {
            category: 'DevOps',
            currentPercentage: 25,
            targetPercentage: 50,
            currentLevel: 'Beginner',
            targetLevel: 'Intermediate'
          },
          {
            category: 'Management',
            currentPercentage: 50,
            targetPercentage: 25,
            currentLevel: 'Intermediate',
            targetLevel: 'Beginner'
          },
        ]
      };
      
      setTargetRoles([...targetRoles, newTargetRole]);
      setSelectedRole('');
    }
  };
  
  const handleRemoveRole = (roleName: string) => {
    setTargetRoles(targetRoles.filter(role => role.name !== roleName));
  };
  
  const handleTargetChange = (roleName: string, category: string, value: number) => {
    setTargetRoles(targetRoles.map(role => {
      if (role.name === roleName) {
        return {
          ...role,
          targetLevels: role.targetLevels.map(level => {
            if (level.category === category) {
              // Determine the target level based on percentage
              let targetLevel = 'Beginner';
              if (value >= 75) targetLevel = 'Expert';
              else if (value >= 50) targetLevel = 'Advanced';
              else if (value >= 25) targetLevel = 'Intermediate';
              
              return {
                ...level,
                targetPercentage: value,
                targetLevel
              };
            }
            return level;
          })
        };
      }
      return role;
    }));
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      case 'advanced':
        return 'bg-blue-100 text-blue-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <Head>
        <title>Skill Assessment Tool</title>
      </Head>
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
                className={`flex items-center border rounded px-4 py-3 cursor-pointer transition-all ${
                  selectedOptions[currentQuestionIndex] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
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
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={selectedOptions[currentQuestionIndex] === null}
            >
              {currentQuestionIndex === assessmentSteps.length - 1 ? 'Next' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* Results Step */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Assessment Results</h2>
            
            {/* Skill categories with progress bars */}
            <div className="space-y-4">
              {skillResults.map((skill, index) => (
                <div key={index} className="mb-20">
                  <div className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{skill.category}</span>
                    </div>
                  </div>
                  
                  {/* Empty container for spacing - indicators moved to progress bar */}
                  <div className="relative mb-1">
                    {skill.percentage < skill.targetPercentage ? (
                      null
                    ) : skill.percentage > skill.targetPercentage ? (
                      /* For exceeding target, position from target to end of blue bar */
                      <div 
                        className="absolute flex items-center justify-start"
                        style={{ 
                          left: `${skill.targetPercentage}%`,
                          width: `${skill.percentage - skill.targetPercentage}%`,
                          zIndex: 30
                        }}
                      >
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs font-medium">Exceeding target by {skill.percentage - skill.targetPercentage}%</span>
                        </div>
                      </div>
                    ) : (
                      /* For on target, position at target percentage */
                      <div 
                        className="absolute flex items-center justify-end"
                        style={{ 
                          left: `${skill.targetPercentage - 10}%`,
                          width: `20%`,
                          zIndex: 30
                        }}
                      >
                        <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs font-medium">On target</span>
                        </div>
                      </div>
                    )}
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
                    
                    {/* Gap indicator for DevOps - horizontal bar between Intermediate and Advanced */}
                    {skill.percentage < skill.targetPercentage && skill.category === "DevOps" && (
                      <div 
                        className="absolute bottom-0 h-5 bg-orange-100 border border-orange-300 rounded flex items-center justify-center"
                        style={{ 
                          left: `30%`, /* Start from the end of the blue bar */
                          width: `45%`, /* Span to Advanced marker (75%) */
                          zIndex: 10
                        }}
                      >
                        <span className="text-orange-800 text-xs font-medium">{skill.targetPercentage - skill.percentage}% gap</span>
                      </div>
                    )}
                    
                    {/* Target level indicator (blue triangle) */}
                    <div className="absolute bottom-0 left-0 pointer-events-none z-50"
                      style={{ left: `${skill.targetPercentage}%` }}
                    >
                      <div className="relative">
                        <div className="absolute left-0 bottom-0 w-0 h-0 
                          border-l-[8px] border-r-[8px] border-b-[12px] 
                          border-l-transparent border-r-transparent border-b-blue-600 
                          transform -translate-x-1/2">
                        </div>
                      </div>
                    </div>
                    

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handleBackToAssessment}
              className="flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700"
            >
              <span className="mr-1">←</span> Back to Assessment
            </button>
            <button 
              onClick={handleSetTargetLevels}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Set Target Levels <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Set Target Levels Step */}
      {currentStep === 2 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <span className="mr-2">🎯</span> Set Your Target Levels
          </h2>
          <p className="text-gray-600 mb-8">
            Choose roles you're interested in and set target capability levels for each
          </p>
          
          {/* Add Target Role */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Add Target Role</h3>
            <div className="flex">
              <div className="relative flex-grow">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block w-full px-4 py-3 pr-8 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a role...</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleAddTargetRole}
                disabled={!selectedRole}
                className="ml-2 px-4 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
              >
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>

          {/* Target Roles List */}
          {targetRoles.length > 0 ? (
            <div className="mb-8">
              {targetRoles.map((role) => (
                <div key={role.name} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-lg">{role.name}</h4>
                    <button 
                      onClick={() => handleRemoveRole(role.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Skills with current and target levels */}
                  <div className="space-y-6">
                    {role.targetLevels.map((skill) => (
                      <div key={`${role.name}-${skill.category}`} className="mb-20">
                        <div className="mb-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">{skill.category}</span>
                          </div>
                        </div>
                        
                        {/* Progress bar with improved visual design */}
                        <div className="relative w-full h-12 bg-gray-100 rounded-lg mb-6">
                          {/* Level markers */}
                          <div className="absolute -bottom-6 left-0 w-full flex justify-between px-1">
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-medium">Beginner</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-medium">Intermediate</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-medium">Advanced</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-medium">Expert</span>
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
                          <div className="absolute top-1 left-1 h-5 bg-blue-600 rounded transition-all duration-300"
                            style={{ width: `calc(${skill.currentPercentage}% - 2px)` }}
                          >
                            <div className="absolute right-0 top-full mt-1 transform translate-x-1/2">
                              <div className="flex flex-col items-center">
                                <div className="w-2 h-2 bg-blue-600 transform rotate-45"></div>
                                <div className="bg-blue-600 text-white text-xs px-1 py-0.5 rounded">
                                  {skill.currentPercentage}%
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Target level indicator (blue triangle) */}
                          <div className="absolute bottom-0 left-0 pointer-events-none"
                            style={{ left: `${skill.targetPercentage}%` }}
                          >
                            <div className="relative">
                              <div className="absolute left-0 bottom-0 w-0 h-0 
                                border-l-[8px] border-r-[8px] border-b-[12px] 
                                border-l-transparent border-r-transparent border-b-blue-600 
                                transform -translate-x-1/2">
                              </div>
                            </div>
                          </div>
                          
                          {/* Exceeding indicator */}
                          {skill.currentPercentage > skill.targetPercentage && (
                            <div className="absolute -top-6 left-0 transform"
                              style={{ left: `${(skill.currentPercentage + skill.targetPercentage) / 2}%` }}
                            >
                              <div className="flex flex-col items-center">
                                <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  +{skill.currentPercentage - skill.targetPercentage}% above target
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Gap indicator */}
                          {skill.currentPercentage < skill.targetPercentage && (
                            <div className="absolute -top-6 left-0 transform"
                              style={{ left: `${(skill.currentPercentage + skill.targetPercentage) / 2}%` }}
                            >
                              <div className="flex flex-col items-center">
                                <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  {skill.targetPercentage - skill.currentPercentage}% to target
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Target level slider */}
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="25"
                            value={skill.targetPercentage}
                            onChange={(e) => handleTargetChange(role.name, skill.category, parseInt(e.target.value))}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
                            aria-label={`Set target level for ${skill.category}`}
                          />
                        </div>
                        

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Add at least one target role to continue
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handleBackToResults}
              className="flex items-center px-4 py-2 border border-gray-300 rounded bg-white text-gray-700"
            >
              <span className="mr-1">←</span> Back to Results
            </button>
            <button 
              onClick={handleReviewAndConfirm}
              disabled={targetRoles.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Review & Confirm <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirm Step Placeholder */}
      {currentStep === 3 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Review & Confirm</h2>
          <p className="text-gray-600 mb-8">This step is coming soon</p>
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 border border-gray-300 rounded bg-white text-gray-700"
          >
            Back to Target Levels
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillTrackerB;
