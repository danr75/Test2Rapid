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
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ backgroundColor: '#F9FAFB' }}>
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
            {/* Combined Experience & Target Card */}
            <div className="w-full bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-5 mb-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-200 rounded-full opacity-20 -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-200 rounded-full opacity-10 -ml-16 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="font-semibold text-base text-violet-900 mb-2">Capability Progress</h3>
                  <p className="text-violet-800 text-sm font-medium mb-3 leading-tight">
                    <span className="font-semibold">Your current capability is in the bottom 10%,</span> aiming for the top 10%.
                  </p>
                  
                  {/* Progress Section */}
                  <div className="mt-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-violet-900">Your progress</span>
                      </div>
                      <div className="relative w-full mb-1">
                        <div className="relative h-6 bg-gray-100 rounded-xl overflow-visible border border-gray-200">
                          {/* Background grid lines */}
                          <div className="absolute inset-0 flex justify-between pointer-events-none">
                            <div className="w-px h-full bg-gray-200"></div>
                            <div className="w-px h-full bg-gray-200"></div>
                            <div className="w-px h-full bg-gray-200"></div>
                          </div>
                          
                          {/* Purple progress bar */}
                          <div 
                            className="absolute top-0 left-0 h-6 bg-violet-600 transition-all duration-300 flex items-center" 
                            style={{ width: '14%' }}
                          >
                            <span className="ml-auto mr-2 text-white text-xs font-medium">14%</span>
                          </div>
                          
                          {/* Target indicator with pill and connecting line */}
                          <div className="absolute -top-7" style={{ left: '80%', zIndex: 20 }}>
                            <div className="flex flex-col items-center">
                              <span className="bg-violet-200 border border-violet-300 text-violet-900 text-xs font-medium px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap mb-1">
                                Target
                              </span>
                              {/* Connecting line with solid circle - darker purple */}
                              <div className="relative z-10">
                                <div className="w-0.5 h-3 bg-violet-600 mx-auto"></div>
                                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-violet-600 rounded-full z-20"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Level labels */}
                        <div className="flex justify-between mt-1 text-xs text-gray-600">
                          <span>Aware</span>
                          <span>Participate</span>
                          <span>Lead</span>
                          <span>Expert</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-violet-100">
                  <button
                    onClick={handleAssessCapability}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Reassess</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Change Target</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="w-full mb-6 bg-[#E0EDFF] p-6 rounded-lg">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900">Your progress</h3>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Learning Streak */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 7h2m0 0v2m0-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0v2m0-2h2m7 2h2m0 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2m0 0h2m0 0h2m0 6h2m0 0v2m0 0h-2m2 0v-2m0 0h2"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-500">Learning Streak</h4>
                        <p className="text-lg font-semibold text-gray-900">5 days</p>
                      </div>
                    </div>
                  </div>

                  {/* Capability Rank */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-500">Rank</h4>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <svg className="mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M5.293 3.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L7 7.414V11a1 1 0 11-2 0V7.414L2.707 9.707a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd"/>
                            </svg>
                            2%
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Top 24%</p>
                      </div>
                    </div>
                  </div>

                  {/* Improved */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-500">Improved</h4>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <svg className="mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M5.293 3.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L7 7.414V11a1 1 0 11-2 0V7.414L2.707 9.707a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd"/>
                            </svg>
                            15%
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Frontend</p>
                      </div>
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-500">Focus</h4>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            <svg className="mr-0.5 h-3 w-3 text-red-500 transform rotate-180" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M5.293 3.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L7 7.414V11a1 1 0 11-2 0V7.414L2.707 9.707a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd"/>
                            </svg>
                            5%
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Backend</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Bars */}
            <div className="w-full">
              {/* Frontend Development */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Frontend Development</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">+35%</span>
                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  
                  {/* Blue progress bar */}
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-600 transition-all duration-300 flex items-center" 
                    style={{ width: '85%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">85%</span>
                  </div>
                  
                  {/* Target indicator with pill and connecting line */}
                  <div className="absolute -top-7" style={{ left: '50%', zIndex: 20 }}>
                    <div className="flex flex-col items-center">
                      <span className="bg-blue-100 border border-blue-200 text-blue-800 text-xs font-medium px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap mb-1">
                        Target
                      </span>
                      {/* Connecting line with solid circle - blue */}
                      <div className="relative z-10">
                        <div className="w-0.5 h-3 bg-blue-500 mx-auto"></div>
                        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full z-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Level labels */}
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Beginner</span>
                  <span className="text-xs text-gray-500">Intermediate</span>
                  <span className="text-xs text-gray-500">Advanced</span>
                  <span className="text-xs text-gray-500">Expert</span>
                </div>
              </div>
              
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
