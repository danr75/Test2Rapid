import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Layout/Header';
import { NavigationTab } from '../components/Layout/Navigation';

const LearningRoad: React.FC = () => {
  const router = useRouter();
  const activeTab: NavigationTab = 'skill-tracker';
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);

  // Check localStorage for assessment completion status and selected role
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('selectedRole') || '';
      const completed = localStorage.getItem('assessmentCompleted') === 'true';
      
      setSelectedRole(storedRole);
      setAssessmentCompleted(completed);
      
      console.log('[DEBUG] Learning Road - Assessment completed:', completed);
      console.log('[DEBUG] Learning Road - Selected role:', storedRole);
      
      // If assessment is not completed, redirect to skill tracker
      if (!completed) {
        console.log('[DEBUG] Assessment not completed, redirecting to skill tracker');
        router.push('/skill-tracker');
      }
    }
  }, [router]);

  const handleAssessCapability = () => {
    // Clear assessment completion status to allow re-assessment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('assessmentCompleted');
      console.log('[DEBUG] Assessment completion status cleared');
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
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Dashboard Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Skill Progress */}
            <div className="w-full md:w-7/12 bg-white rounded-lg shadow p-6">
              {/* Role Selection Banner */}
              {selectedRole && (
                <div className="mb-6 py-3 px-5 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
                  <p className="text-blue-800 font-medium">Selected Role: {selectedRole}</p>
                  <button
                    onClick={handleAssessCapability}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Reassess Your Capability Level
                  </button>
                </div>
              )}
              
              {/* Skill Progress Bars */}
              <div className="space-y-6">
                {/* AI Strategy & Governance */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">AI Strategy & Governance</span>
                    <span className="text-green-500 font-medium">+12%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">75%</span>
                  </div>
                </div>
                
                {/* Data Architecture */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">Data Architecture</span>
                    <span className="text-green-500 font-medium">+8%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">68%</span>
                  </div>
                </div>
                
                {/* Cloud Transformation */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">Cloud Transformation</span>
                    <span className="text-green-500 font-medium">+15%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">82%</span>
                  </div>
                </div>
                
                {/* Digital Product Strategy */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">Digital Product Strategy</span>
                    <span className="text-green-500 font-medium">+10%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">71%</span>
                  </div>
                </div>
                
                {/* Emerging Technologies */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">Emerging Technologies</span>
                    <span className="text-green-500 font-medium">+18%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-800 rounded-full" style={{ width: '63%' }}></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">63%</span>
                  </div>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoad;
