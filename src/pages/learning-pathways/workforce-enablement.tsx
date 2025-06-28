'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { 
  ArrowLeftIcon, 
  UserGroupIcon, 
  UserPlusIcon, 
  AcademicCapIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

type LearningOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'refresher' | 'scenario' | 'simulation' | 'action';
  items: string[];
};

const WorkforceEnablementPathway = () => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Learning options for Workforce Enablement
  const learningOptions: LearningOption[] = [
    {
      id: 'skills-assessment',
      title: 'Skills Assessment',
      description: 'Evaluate your team\'s current AI capabilities and identify skill gaps',
      icon: 'ChartBarIcon',
      type: 'refresher',
      items: [
        'AI Skills Framework',
        'Assessment Tools',
        'Gap Analysis',
        'Benchmarking'
      ]
    },
    {
      id: 'learning-pathways',
      title: 'Learning Pathways',
      description: 'Develop customized learning journeys for different roles',
      icon: 'AcademicCapIcon',
      type: 'scenario',
      items: [
        'Role-Specific Tracks',
        'Technical Upskilling',
        'Leadership Development',
        'Continuous Learning'
      ]
    },
    {
      id: 'change-management',
      title: 'Change Management',
      description: 'Guide your organization through AI transformation',
      icon: 'ArrowsRightLeftIcon',
      type: 'simulation',
      items: [
        'Change Readiness',
        'Stakeholder Engagement',
        'Communication Strategies',
        'Adoption Metrics'
      ]
    },
    {
      id: 'team-structures',
      title: 'Team Structures',
      description: 'Build effective AI teams and define new roles',
      icon: 'UsersIcon',
      type: 'action',
      items: [
        'Hybrid Team Models',
        'Role Definitions',
        'Collaboration Frameworks',
        'Performance Metrics'
      ]
    }
  ];

  const toggleOption = (id: string) => {
    setActiveOption(activeOption === id ? null : id);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LightBulbIcon':
        return <LightBulbIcon className="h-6 w-6" />;
      case 'UserGroupIcon':
        return <UserGroupIcon className="h-6 w-6" />;
      case 'UserPlusIcon':
        return <UserPlusIcon className="h-6 w-6" />;
      case 'CheckCircleIcon':
        return <CheckCircleIcon className="h-6 w-6" />;
      case 'AcademicCapIcon':
        return <AcademicCapIcon className="h-6 w-6" />;
      case 'ChartBarIcon':
        return <ChartBarIcon className="h-6 w-6" />;
      case 'ArrowsRightLeftIcon':
        return <ArrowsRightLeftIcon className="h-6 w-6" />;
      case 'UserCircleIcon':
        return <UserCircleIcon className="h-6 w-6" />;
      case 'UsersIcon':
        return <UsersIcon className="h-6 w-6" />;
      default:
        return <LightBulbIcon className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'refresher':
        return 'bg-blue-100 text-blue-800';
      case 'scenario':
        return 'bg-purple-100 text-purple-800';
      case 'simulation':
        return 'bg-indigo-100 text-indigo-800';
      case 'action':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedOption = learningOptions.find(option => option.id === activeOption);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="learning-coach" />
      <Head>
        <title>Workforce Enablement Learning Pathway | Interactive Learning Hub</title>
        <meta name="description" content="Enable your workforce with AI skills and knowledge" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/learning-coach" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Learning Coach</span>
          </Link>
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">Workforce Enablement</h1>
            <p className="text-blue-100">
              Equip your team with the skills and knowledge needed for AI adoption
            </p>
          </div>

          {!selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                    activeOption === option.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-4 ${getTypeColor(option.type)}`}>
                      {getIcon(option.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                  {activeOption === option.id && (
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {option.items.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-blue-600 mr-2">
                              <ChevronRightIcon className="h-4 w-4 inline" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button 
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle start learning
                        }}
                      >
                        Start Learning
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setActiveOption(null)}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <div className={`rounded-full p-2 mr-4 ${getTypeColor(selectedOption.type)}`}>
                  {getIcon(selectedOption.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedOption.title}</h2>
                  <p className="text-gray-600">{selectedOption.description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
                <ul className="space-y-3">
                  {selectedOption.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Handle start learning
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Learning
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkforceEnablementPathway;
