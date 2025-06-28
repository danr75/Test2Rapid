'use client';

import React, { useState } from 'react';
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

const FoundationsEcosystemPathway = () => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Learning options for Foundations & Ecosystem
  const learningOptions: LearningOption[] = [
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts on AI foundations',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'AI Fundamentals Recap',
        'Key AI Technologies Overview',
        'Ecosystem Players Explained',
        'Technology Stack Refresher'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your knowledge to real-world AI scenarios',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Technology Selection Challenge',
        'Vendor Evaluation Scenario',
        'Integration Planning Exercise',
        'Ecosystem Mapping'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice decision-making in technical scenarios',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Technical Decision Simulation',
        'Vendor Evaluation Role Play',
        'Architecture Planning Workshop',
        'Technology Stack Design'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical tasks to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Map Your Organization\'s AI Ecosystem',
        'Research One New AI Technology',
        'Identify One Integration Opportunity',
        'Share a Technology Insight with Your Team'
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
        <title>Foundations & Ecosystem Learning Pathway | Interactive Learning Hub</title>
        <meta name="description" content="Explore learning resources for AI Foundations & Ecosystem" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/learning-coach" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Learning Coach</span>
          </Link>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">Foundations & Ecosystem</h1>
            <p className="text-blue-100">
              Build a strong foundation in AI technologies and understand the ecosystem to make informed decisions about AI adoption and implementation.
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
                  <h2 className="text-2xl font-bold">{selectedOption.title}</h2>
                  <p className="text-gray-600">{selectedOption.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Activities</h3>
                <ol className="space-y-3">
                  {selectedOption.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
                        {index + 1}
                      </span>
                      <span className="flex-1">{item}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Start
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => setActiveOption(null)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to all options
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FoundationsEcosystemPathway;
