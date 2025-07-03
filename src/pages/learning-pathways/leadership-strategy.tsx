'use client';

import React, { useState } from 'react';
import PathwayHeading from '@/components/LearningPathway/PathwayHeading';
import { useLearning } from '@/store/LearningContext';
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
  CodeBracketIcon
} from '@heroicons/react/24/outline';

type LearningOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'refresher' | 'scenario' | 'simulation' | 'action';
  items: string[];
};

const LeadershipStrategyPathway = () => {
  const router = useRouter();
  const { dispatch } = useLearning();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Learning options for Leadership & Strategy
  const learningOptions: LearningOption[] = [
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts to boost your leadership skills',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'Strategic Leadership Fundamentals',
        'Vision Setting Techniques',
        'Decision-Making Frameworks',
        'Change Management Essentials'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your skills to realistic business scenarios',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Leading Through Digital Transformation',
        'Strategic Decision Simulation',
        'Stakeholder Alignment Challenge',
        'Vision Communication Exercise'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice leadership in realistic business scenarios',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Executive Decision Simulation',
        'Crisis Leadership Exercise',
        'Strategic Planning Workshop',
        'Team Alignment Simulation'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical leadership tasks to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Conduct a Team Vision Session',
        'Analyze a Strategic Decision',
        'Identify One Leadership Growth Area',
        'Share a Leadership Insight with Your Team'
      ]
    }
  ];

  const [selectedRefresher, setSelectedRefresher] = useState<string | null>(null);

  const handleStartLearning = (option: LearningOption, item: string) => {
    if (option.id === 'scenario-challenges') {
      dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: 'Leadership & Strategy' });
      router.push('/scenario-learn');
    } else if (option.type === 'refresher') {
      // For quick refreshers, show the refresher content
      setSelectedRefresher(item);
    }
  };

  const toggleOption = (id: string) => {
    setActiveOption(activeOption === id ? null : id);
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
        <title>Leadership & Strategy Learning Pathway | Interactive Learning Hub</title>
        <meta name="description" content="Develop your leadership and strategic thinking skills for the AI era" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/learning-coach#learning-pathways" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Learning Pathway</span>
          </Link>
          
          <PathwayHeading
            capability="Leadership & Strategy"
            title="Leadership & Strategy"
            description="Develop your strategic thinking and leadership capabilities to drive AI transformation in your organization."
          />

          {selectedRefresher ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setSelectedRefresher(null)}
                  className="mr-4 text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-1" />
                  <span>Skills Development</span>
                </button>
              </div>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedRefresher}</h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-blue-800 font-medium mb-2">5-10 Minute Refresher</p>
                  <p className="text-gray-700">
                    This is a quick refresher on {selectedRefresher.toLowerCase()}. Take your time to review the key concepts and strategies.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Review the core concepts</li>
                    <li>Consider real-world applications</li>
                    <li>Reflect on your current approach</li>
                    <li>Identify one takeaway to apply</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setSelectedRefresher(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Complete Refresher
                  </button>
                </div>
              </div>
            </div>
          ) : !selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                    activeOption === option.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    if (option.id === 'scenario-challenges') {
                      dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: 'Leadership & Strategy' });
                      router.push('/scenario-learn');
                    } else {
                      toggleOption(option.id);
                    }
                  }}
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
            <div className="bg-white rounded-lg shadow-md p-6">
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

export default LeadershipStrategyPathway;
