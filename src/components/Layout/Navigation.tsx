import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ChatBubbleLeftRightIcon, 
  AcademicCapIcon, 
  RssIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export type NavigationTab = 'learning-coach' | 'daily-feed' | 'skill-tracker';

interface NavigationProps {
  activeTab: NavigationTab;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  const router = useRouter();
  
  // Handle Skill Tracker navigation based on assessment completion
  const handleSkillTrackerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined') {
      const assessmentCompleted = localStorage.getItem('assessmentCompleted') === 'true';
      const selectedRole = localStorage.getItem('selectedRole');
      
      // If assessment is completed, go to learning road, otherwise go to skill tracker
      if (assessmentCompleted && selectedRole) {
        console.log('[DEBUG] Navigation: Assessment completed, navigating to learning road');
        router.push('/learning-road');
      } else {
        console.log('[DEBUG] Navigation: Assessment not completed, navigating to skill tracker');
        router.push('/skill-tracker');
      }
    }
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-1 flex justify-center">
        <div className="flex justify-between items-center w-full max-w-2xl">
          
          {/* Learning Coach Tab */}
          <Link 
            href="/learning-coach" 
            className={`flex flex-col items-center p-2 ${
              activeTab === 'learning-coach' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <AcademicCapIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Learning Coach</span>
          </Link>
          
          {/* Daily Feed Tab */}
          <Link 
            href="/daily-feed" 
            className={`flex flex-col items-center p-2 ${
              activeTab === 'daily-feed' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <RssIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Daily Feed</span>
          </Link>
          
          {/* Skill Tracker Tab - Using onClick instead of href for client-side routing */}
          <a 
            href="#"
            onClick={handleSkillTrackerClick}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'skill-tracker' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <ChartBarIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Skill Tracker</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
