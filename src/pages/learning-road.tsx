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
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-5 text-gray-800 tracking-tight">Learning Road</h1>
          <div className="h-1.5 w-32 bg-blue-500 mx-auto rounded-full mb-10"></div>
          
          <div className="bg-white rounded-lg shadow-lg p-12 mb-10">
            <div className="text-9xl mb-6 text-gray-300 opacity-50">🚧</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Coming Soon</h2>
            {selectedRole && (
              <div className="mb-6 py-3 px-5 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-blue-800 font-medium">Selected Role: {selectedRole}</p>
              </div>
            )}
            <p className="text-xl text-gray-600 mb-8">
              We're building your personalized learning journey based on your skill assessment.
            </p>
            
            <button
              onClick={handleAssessCapability}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Reassess Your Capability Level
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoad;
