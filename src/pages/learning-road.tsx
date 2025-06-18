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
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Learning Road | Interactive Learning Hub</title>
        <meta name="description" content="Your personalized learning journey" />
      </Head>

      {/* Header and Navigation */}
      <Header activeTab={activeTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Dashboard Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Skill Progress */}
            <div className="w-full md:w-7/12 space-y-6">
              {/* Current/Target Role Row */}
              <div className="flex flex-row gap-4 mb-4">
                {/* Current Role Box */}
                <div className="w-1/2 bg-blue-50 border border-blue-100 rounded-lg shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-blue-900">Current Role</h3>
                    </div>
                    <div className="mb-2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {selectedRole || 'Full Stack Developer'}
                      </span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      Your role determines the AI leadership insights and tools available to you.
                    </p>
                  </div>
                </div>
                {/* Target Role Box */}
                <div className="w-1/2 bg-blue-50 border border-blue-100 rounded-lg shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-blue-900">Target Role</h3>
                    </div>
                    <div className="mb-2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Target Role Placeholder
                      </span>
                    </div>
                    <p className="text-blue-800 text-sm">
                      Set your target role to personalize your learning journey.
                    </p>
                  </div>
                </div>
              </div>

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
            
            {/* Right Column - Insights and Actions */}
            <div className="w-full md:w-5/12 space-y-6">
              {/* Growth Insights */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Growth Insights</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-gray-700">Strongest area: Cloud Transformation</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 text-lg">🔵</span>
                    <span className="text-gray-700">Focus area: Emerging Technologies</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">📈</span>
                    <span className="text-gray-700">Fastest growth: Emerging Technologies (+18%)</span>
                  </div>
                </div>
              </div>
              
              {/* Recommended Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recommended Actions</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded border border-gray-100 flex items-center gap-3">
                    <span className="text-blue-500 text-lg">📝</span>
                    <span className="text-gray-700">Take AI Strategy Assessment</span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border border-gray-100 flex items-center gap-3">
                    <span className="text-blue-500 text-lg">👥</span>
                    <span className="text-gray-700">Join Peer Learning Group</span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border border-gray-100 flex items-center gap-3">
                    <span className="text-blue-500 text-lg">🎯</span>
                    <span className="text-gray-700">Set Quarterly Goals</span>
                  </div>
                </div>
              </div>
              
              {/* Reassess Capability Button */}
              <div className="mt-8 flex">
                <button 
                  onClick={handleAssessCapability}
                  className="w-1/2 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-3 transition-all duration-300 border border-blue-400 transform hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-semibold">Reassess Your Capability Level</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoad;
