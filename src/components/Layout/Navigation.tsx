import React from 'react';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  RssIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { useNavigation } from '@/hooks/useNavigation';

export type NavigationTab = 'learning-coach' | 'daily-feed' | 'skill-tracker';

interface NavigationProps {
  activeTab: NavigationTab;
}

const Navigation: React.FC<NavigationProps> = React.memo(({ activeTab }) => {
  const { handleSkillTrackerClick } = useNavigation();
  
  // Navigation items configuration
  const navItems = [
    {
      id: 'learning-coach',
      label: 'Learning Coach',
      href: '/learning-coach',
      icon: AcademicCapIcon,
    },
    {
      id: 'daily-feed',
      label: 'Daily Feed',
      href: '/daily-feed',
      icon: RssIcon,
    },
    {
      id: 'skill-tracker',
      label: 'Skill Tracker',
      href: '#',
      icon: ChartBarIcon,
      onClick: handleSkillTrackerClick,
    },
  ];
  
  return (
    <nav className="bg-white shadow-sm" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-1 flex justify-center">
        <div className="flex justify-between items-center w-full max-w-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const className = `flex flex-col items-center p-2 ${
              isActive 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-800'
            }`;
            
            const content = (
              <>
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs mt-1">{item.label}</span>
              </>
            );
            
            return item.id === 'skill-tracker' ? (
              <button
                key={item.id}
                onClick={item.onClick}
                className={className}
                aria-current={isActive ? 'page' : undefined}
              >
                {content}
              </button>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={className}
                aria-current={isActive ? 'page' : undefined}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
