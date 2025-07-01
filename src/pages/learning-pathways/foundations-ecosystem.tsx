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
  
  // Standardized learning options for Foundations & Ecosystem
  const learningOptions: LearningOption[] = [
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts on AI foundations and ecosystem concepts',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'AI Fundamentals Recap',
        'Ecosystem Players Overview',
        'Technology Stack Refresher',
        'Integration Best Practices'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your knowledge to real-world AI ecosystem scenarios',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Ecosystem Mapping Exercise',
        'Vendor Evaluation Scenario',
        'Technology Selection Challenge',
        'Integration Planning Simulation'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice ecosystem decision-making in realistic scenarios',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Stakeholder Alignment Simulation',
        'Technical Decision Workshop',
        'Vendor Negotiation Role Play',
        'Ecosystem Strategy Session'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical ecosystem tasks to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Map Your Organization’s AI Ecosystem',
        'Research a New AI Tool',
        'Identify an Integration Opportunity',
        'Share an Ecosystem Insight'
      ]
    }
  ];

  const toggleOption = (id: string) => {
    setActiveOption(activeOption === id ? null : id);
  };

  const handleStartLearning = (option: LearningOption, item: string) => {
    if (option.type === 'scenario') {
      const topic = `Foundations: ${item}`;
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
          <Link href="/learning-coach#learning-pathways" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Skills Development</span>
          </Link>
          
          <PathwayHeading
            capability="Foundations & Ecosystem"
            title="Foundations & Ecosystem"
            description="Build foundational knowledge and understand the AI ecosystem to accelerate your impact."
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

export default FoundationsEcosystemPathway;
