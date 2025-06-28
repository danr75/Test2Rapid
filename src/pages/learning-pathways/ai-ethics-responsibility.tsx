'use client';

import React, { useState } from 'react';
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
  
  // Learning options for AI Ethics & Responsibility
  const learningOptions: LearningOption[] = [
    {
      id: 'ethical-principles',
      title: 'Ethical Principles',
      description: 'Core ethical frameworks for responsible AI development',
      icon: 'ScaleIcon',
      type: 'refresher',
      items: [
        'AI Ethics Frameworks',
        'Moral Decision Making',
        'Value Alignment',
        'Ethical Risk Assessment'
      ]
    },
    {
      id: 'bias-fairness',
      title: 'Bias & Fairness',
      description: 'Identify and mitigate bias in AI systems',
      icon: 'ScaleIconSolid',
      type: 'scenario',
      items: [
        'Types of Algorithmic Bias',
        'Fairness Metrics',
        'Bias Detection Tools',
        'Mitigation Strategies'
      ]
    },
    {
      id: 'privacy-security',
      title: 'Privacy & Security',
      description: 'Protect data and ensure secure AI systems',
      icon: 'ShieldCheckIcon',
      type: 'simulation',
      items: [
        'Data Protection Principles',
        'Privacy-Preserving AI',
        'Security Best Practices',
        'Compliance Requirements'
      ]
    },
    {
      id: 'responsible-framework',
      title: 'Responsible AI Framework',
      description: 'Implement ethical AI practices in your organization',
      icon: 'ShieldExclamationIcon',
      type: 'action',
      items: [
        'Governance Models',
        'Ethics Review Boards',
        'Impact Assessments',
        'Stakeholder Engagement'
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
          <Link href="/learning-coach" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Learning Coach</span>
          </Link>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Ethics & Responsibility</h1>
            <p className="text-purple-100">
              Navigate the ethical considerations and responsible use of AI in your organization
            </p>
          </div>

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
