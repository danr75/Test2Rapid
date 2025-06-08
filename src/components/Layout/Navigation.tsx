import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ChatBubbleLeftRightIcon, 
  AcademicCapIcon, 
  RssIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export type NavigationTab = 'assistant' | 'learning-coach' | 'daily-feed' | 'skill-tracker';

interface NavigationProps {
  activeTab: NavigationTab;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-1 flex justify-center">
        <div className="flex justify-between items-center w-full max-w-2xl">
          {/* Assistant Tab */}
          <Link 
            href="/" 
            className={`flex flex-col items-center p-2 ${
              activeTab === 'assistant' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Assistant</span>
          </Link>
          
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
          
          {/* Skill Tracker Tab */}
          <Link 
            href="/skill-tracker" 
            className={`flex flex-col items-center p-2 ${
              activeTab === 'skill-tracker' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <ChartBarIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Skill Tracker</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
