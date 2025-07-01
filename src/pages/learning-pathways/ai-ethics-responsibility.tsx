'use client';

import React, { useState } from 'react';
import PathwayHeading from '@/components/LearningPathway/PathwayHeading';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  ScaleIcon, 
  BeakerIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ScaleIcon as ScaleIconSolid,
  ShieldExclamationIcon,
  LockClosedIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

type LearningOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'refresher' | 'scenario' | 'simulation' | 'action';
  items: string[];
};

const AIEthicsResponsibilityPathway = () => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Standardized learning options for AI Ethics & Responsibility
  const learningOptions: LearningOption[] = [
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts on AI ethics and responsible AI',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'Ethical Principles Recap',
        'Responsible AI Overview',
        'Bias & Fairness Fundamentals',
        'Privacy & Security Refresher'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your knowledge to ethical AI dilemmas',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Bias Detection Scenario',
        'Transparency Challenge',
        'Data Privacy Simulation',
        'Accountability Case Study'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice ethical decision-making in realistic scenarios',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Ethics Board Simulation',
        'Stakeholder Engagement Workshop',
        'Incident Response Role Play',
        'Ethical Risk Assessment'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical ethical actions to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Review an AI Policy',
        'Identify a Bias Risk',
        'Share an Ethics Resource',
        'Reflect on an Ethical Dilemma'
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
      case 'ShieldCheckIcon':
        return <ShieldCheckIcon className="h-6 w-6" />;
      case 'ScaleIcon':
        return <ScaleIcon className="h-6 w-6" />;
      case 'ScaleIconSolid':
        return <ScaleIconSolid className="h-6 w-6" />;
      case 'BeakerIcon':
        return <BeakerIcon className="h-6 w-6" />;
      case 'CheckCircleIcon':
        return <CheckCircleIcon className="h-6 w-6" />;
      case 'ShieldExclamationIcon':
        return <ShieldExclamationIcon className="h-6 w-6" />;
      case 'LockClosedIcon':
        return <LockClosedIcon className="h-6 w-6" />;
      case 'UserGroupIcon':
        return <UserGroupIcon className="h-6 w-6" />;
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
        <title>AI Ethics & Responsibility Learning Pathway | Interactive Learning Hub</title>
        <meta name="description" content="Navigate the ethical considerations of AI implementation" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/learning-coach#learning-pathways" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Skills Development</span>
          </Link>
          
          <PathwayHeading
            capability="AI Ethics & Responsibility"
            title="AI Ethics & Responsibility"
            description="Navigate the ethical considerations and responsible use of AI in your organization"
          />

          {!selectedOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                    activeOption === option.id ? 'ring-2 ring-purple-500' : ''
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
                            <span className="text-purple-600 mr-2">
                              <ChevronRightIcon className="h-4 w-4 inline" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button 
                        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
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
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mr-3">
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
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
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

export default AIEthicsResponsibilityPathway;
