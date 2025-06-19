import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Layout/Header';
import { NavigationTab } from '../components/Layout/Navigation';
import CapabilityBar from '../components/UI/CapabilityBar';

const LearningRoad: React.FC = () => {
  const router = useRouter();
  const activeTab: NavigationTab = 'skill-tracker';
  const [selectedRole, setSelectedRole] = useState<string>('Full Stack Developer');
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(true);

  // Check localStorage for assessment completion status and selected role
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('selectedRole') || 'Full Stack Developer';
      const completed = localStorage.getItem('assessmentCompleted') === 'true';
      
      setSelectedRole(storedRole);
      setAssessmentCompleted(completed);
      
      // If assessment is not completed, redirect to skill tracker
      if (!completed) {
        router.push('/skill-tracker');
      }
    }
  }, [router]);

  const handleAssessCapability = () => {
    // Clear assessment completion status to allow re-assessment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('assessmentCompleted');
    }
    router.push('/skill-tracker');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Learning Road | Interactive Learning Hub</title>
        <meta name="description" content="Your personalized learning journey" />
      </Head>

      {/* Header and Navigation */}
      <Header activeTab={activeTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-3xl mx-auto">
          {/* Centered Content */}
          <div className="space-y-6">
            {/* Current/Target Role Row */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              {/* Current Role Card */}
              <div className="w-full md:w-1/2 bg-white rounded-[12px] flex flex-col justify-between p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-[16px] text-blue-900">Current Experience</h3>
                    <span className="bg-[#E0F2FF] text-[#2563EB] px-3 py-1 rounded-full text-[14px] font-medium">
                      Bottom 10%
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-gray-600 text-[14px] mb-4">
                      We tailor the content and questions you see based on your experience
                    </p>
                    <div className="flex justify-start">
                      <button
                        onClick={handleAssessCapability}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Assess
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Target Role Card */}
              <div className="w-full md:w-1/2 bg-white rounded-[12px] flex flex-col justify-between p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-[16px] text-blue-900">Target Capability</h3>
                    <span className="bg-[#E0F2FF] text-[#2563EB] px-3 py-1 rounded-full text-[14px] font-medium">
                      Top 10%
                    </span>
                  </div>
                  <p className="text-gray-600 text-[14px] mb-4">
                    Set your target role or capability to personalise your learning journey
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="w-full bg-white rounded-[12px] p-6 mb-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <h3 className="font-semibold text-lg text-gray-900">Your progress!</h3>
               
              {/* Progress Bar Graph */}
              <div className="-mt-1 mb-6">
                <div className="flex justify-end text-sm text-gray-600 mb-2">
                  <span>Top 10% target</span>
                </div>
                <div className="relative h-6 bg-gray-100 rounded-md overflow-hidden">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-gray-200 rounded-md"></div>
                  {/* Current progress */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-500 ease-out rounded-l-md"
                    style={{ width: '10%' }}
                  >
                    <div className="absolute right-0 top-1/2 -mr-1.5 -mt-2 w-0.5 h-5 bg-white rounded-full"></div>
                  </div>
                  {/* Target indicator */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                    style={{ left: '90%' }}
                  >
                    <div className="absolute -top-2 -left-1.5 w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-16 text-xs text-red-600 font-medium">Target</div>
                  </div>
                  {/* Label */}
                  <div className="absolute inset-y-0 left-[10%] flex items-center pl-2">
                    <span className="text-xs font-medium text-gray-700">10%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Learning Streak</p>
                  <p className="font-medium text-gray-900">5 active days this week</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Capability Rank</p>
                  <p className="font-medium text-gray-900">You're ahead 76% of peers</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Most Improved</p>
                  <p className="font-medium text-gray-900">Frontend Development</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Focus Next</p>
                  <p className="font-medium text-gray-900">Backend Development</p>
                </div>
              </div>
            </div>

            {/* Capability Bars */}
            <div className="w-full">
              {/* Frontend Development */}
              <CapabilityBar
                skill={{ category: 'Frontend Development', percentage: 85 }}
                targetLevel={{ targetPercentage: 50, targetLevel: 'Advanced' }}
              />
              
              {/* Backend Development */}
              <CapabilityBar
                skill={{ category: 'Backend Development', percentage: 60 }}
                targetLevel={{ targetPercentage: 90, targetLevel: 'Expert' }}
              />
              
              {/* DevOps */}
              <CapabilityBar
                skill={{ category: 'DevOps', percentage: 30 }}
                targetLevel={{ targetPercentage: 60, targetLevel: 'Advanced' }}
              />
                
              {/* Emerging Technologies */}
              <CapabilityBar
                skill={{ category: 'Emerging Technologies', percentage: 63 }}
                targetLevel={{ targetPercentage: 45, targetLevel: 'Intermediate' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoad;
