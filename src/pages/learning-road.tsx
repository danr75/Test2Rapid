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
            {/* Current/Target Role Row */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              {/* Current Role Card */}
              <div className="w-full md:w-1/2 bg-white rounded-xl p-7 flex flex-col" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900">Current Experience</h3>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      Below 10%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    We tailor the content and questions you see based on your experience
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAssessCapability}
                      className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Assess</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Target Role Card */}
              <div className="w-full md:w-1/2 bg-white rounded-xl flex flex-col justify-between p-7" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
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
            <div className="w-full bg-white rounded-xl p-7 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
              <h3 className="font-semibold text-lg text-gray-900">Your progress!</h3>
               
              {/* Progress Bar Graph */}
              <div className="mt-6 mb-10">
                <div className="flex justify-between items-center mb-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-700">Learning Progress</h4>
                    <p className="text-xs text-gray-500">Track your journey to expertise</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    Target: Top 10%
                  </span>
                </div>
                
                <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
                  <div 
                    className="absolute inset-y-0 left-0 transition-all duration-700 ease-out rounded-l-full"
                    style={{ 
                      width: '10%',
                      background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)'
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -mr-1.5 -mt-1.5 w-1 h-3 bg-white/90 rounded-full shadow-sm"></div>
                  </div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{ left: '90%' }}
                  >
                    <div className="relative group">
                      <svg 
                        className="w-2.5 h-2.5 text-blue-600" 
                        viewBox="0 0 10 10"
                        fill="currentColor"
                      >
                        <path d="M5 0L10 5L5 10L0 5L5 0Z" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-0.5"></div>
                        Target: Top 10%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs font-medium text-blue-600">10%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Learning Streak */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-blue-50 text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 7h2m0 0v2m0-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0v2m0-2h2m7 2h2m0 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2m0 0h2m0 0h2m0 6h2m0 0v2m0 0h-2m2 0v-2m0 0h2"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-500">Learning Streak</h4>
                        <p className="text-lg font-semibold text-gray-900">5 days</p>
                        <p className="mt-1 text-xs text-gray-500">Active this week</p>
                      </div>
                    </div>
                  </div>

                  {/* Capability Rank */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-500">Capability Rank</h4>
                        <div className="flex items-baseline">
                          <p className="text-lg font-semibold text-gray-900">Top 24%</p>
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <svg className="-ml-0.5 mr-1 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M5.293 3.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L7 7.414V11a1 1 0 11-2 0V7.414L2.707 9.707a1 1 0 01-1.414-1.414l4-4z" clipRule="evenodd"/>
                            </svg>
                            2% from last week
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Most Improved */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-500">Most Improved</h4>
                        <p className="text-lg font-semibold text-gray-900">Frontend</p>
                        <p className="mt-1 text-xs text-gray-500">
                          <span className="text-emerald-600 font-medium">+15%</span> growth this month
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Focus Next */}
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-amber-50 text-amber-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-500">Focus Area</h4>
                        <p className="text-lg font-semibold text-gray-900">Backend</p>
                        <p className="mt-1 text-xs text-gray-500">
                          <span className="text-amber-600 font-medium">Priority:</span> High
                        </p>
                      </div>
                    </div>
                  </div>
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
