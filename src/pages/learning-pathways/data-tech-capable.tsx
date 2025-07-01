'use client';

import React, { useState } from 'react';
import PathwayHeading from '@/components/LearningPathway/PathwayHeading';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  UserGroupIcon, 
  PlayCircleIcon, 
  CheckCircleIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ServerIcon,
  CpuChipIcon,
  CloudArrowUpIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

type LearningOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'refresher' | 'scenario' | 'simulation' | 'action';
  items: string[];
};

const DataTechCapablePathway = () => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Standardized learning options for Data & Tech Capable
  const learningOptions: LearningOption[] = [
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts on data and technology fundamentals',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'Data Management Essentials',
        'AI Technology Fundamentals',
        'Cloud Infrastructure Basics',
        'Security & Privacy Recap'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your skills to realistic data & tech scenarios',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Data Pipeline Design',
        'AI Model Selection',
        'Tech Stack Integration',
        'Cloud Migration Scenario'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice technical decision-making in real-world contexts',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Incident Response Simulation',
        'Data Governance Workshop',
        'Tech Vendor Negotiation',
        'System Architecture Planning'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical data & tech tasks to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Document a Data Flow',
        'Review a Security Policy',
        'Optimize a Workflow',
        'Share a Tech Insight'
      ]
    }
  ];

  const toggleOption = (id: string) => {
    setActiveOption(activeOption === id ? null : id);
  };

  const handleStartLearning = (option: LearningOption, item: string) => {
    if (option.type === 'scenario') {
      const topic = `Data & Tech: ${item}`;
      localStorage.setItem('selectedTopic', topic);
      router.push('/qa-learn');
    } else if (option.type === 'refresher') {
      // Handle refresher logic here
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LightBulbIcon':
        return <LightBulbIcon className="h-6 w-6" />;
      case 'UserGroupIcon':
        return <UserGroupIcon className="h-6 w-6" />;
      case 'PlayCircleIcon':
        return <PlayCircleIcon className="h-6 w-6" />;
      case 'CheckCircleIcon':
        return <CheckCircleIcon className="h-6 w-6" />;
      case 'AcademicCapIcon':
        return <AcademicCapIcon className="h-6 w-6" />;
      case 'CodeBracketIcon':
        return <CodeBracketIcon className="h-6 w-6" />;
      case 'ServerIcon':
        return <ServerIcon className="h-6 w-6" />;
      case 'CpuChipIcon':
        return <CpuChipIcon className="h-6 w-6" />;
      case 'CloudArrowUpIcon':
        return <CloudArrowUpIcon className="h-6 w-6" />;
      case 'ArrowsPointingOutIcon':
        return <ArrowsPointingOutIcon className="h-6 w-6" />;
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
        <title>Data & Tech Capable Learning Pathway | Interactive Learning Hub</title>
        <meta name="description" content="Build technical capabilities for AI implementation" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/learning-coach#learning-pathways" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Skills Development</span>
          </Link>
          
          <PathwayHeading
            capability="Data & Tech Capable"
            title="Data & Tech Capable"
            description="Build the technical foundation and capabilities for successful AI implementation"
          />

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
                      <div className="space-y-2 mt-4">
                        {option.items.map((item, itemIndex) => (
                          <button 
                            key={itemIndex}
                            className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 py-2 px-4 rounded-md transition-colors flex items-center justify-between"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLearning(option, item);
                            }}
                          >
                            <span>{item}</span>
                            <ChevronRightIcon className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <button 
                  onClick={() => setActiveOption(null)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-1" />
                  <span>Skills Development</span>
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Start a challenge</h2>
                <div className="space-y-4">
                  {selectedOption.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleStartLearning(selectedOption, item)}
                      className="w-full text-left group flex items-center justify-between p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-blue-800 text-lg font-bold mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item}</h3>
                          <p className="text-gray-600 text-sm">Click to start this challenge</p>
                        </div>
                      </div>
                      <ChevronRightIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DataTechCapablePathway;
