'use client';

import React, { useState } from 'react';
import PathwayHeading from '@/components/LearningPathway/PathwayHeading';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { 
  ArrowLeftIcon, 
  ClockIcon, 
  LightBulbIcon, 
  UserGroupIcon, 
  PlayCircleIcon, 
  CheckCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

type LearningOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'refresher' | 'scenario' | 'simulation' | 'action';
  items: string[];
};

const GovernancePolicyRiskPathway = () => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState<string | null>(null);
  
  // Learning options for Governance, Policy & Risk
  const [learningOptions, setLearningOptions] = useState<LearningOption[]>([
    {
      id: 'quick-refreshers',
      title: 'Quick Refreshers',
      description: '5–10 minute learning bursts to boost your currency',
      icon: 'LightBulbIcon',
      type: 'refresher',
      items: [
        'AI Governance Fundamentals Recap',
        'Policy Compliance Check',
        'Risk Assessment Refresher',
        'Ethical AI Principles Overview'
      ]
    },
    {
      id: 'scenario-challenges',
      title: 'Scenario Challenges',
      description: 'Apply your skills to realistic business scenarios',
      icon: 'UserGroupIcon',
      type: 'scenario',
      items: [
        'Regulatory Compliance Scenario',
        'Risk Mitigation Challenge',
        'Policy Implementation Case Study',
        'Ethical Dilemma Resolution'
      ]
    },
    {
      id: 'role-play',
      title: 'Role Play Simulations',
      description: 'Practice decision-making with interactive simulations',
      icon: 'PlayCircleIcon',
      type: 'simulation',
      items: [
        'Boardroom Decision Simulation',
        'Stakeholder Negotiation',
        'Crisis Management Exercise',
        'Policy Development Workshop'
      ]
    },
    {
      id: 'micro-actions',
      title: 'Micro-Actions',
      description: 'Practical tasks to implement in your work',
      icon: 'CheckCircleIcon',
      type: 'action',
      items: [
        'Conduct a Mini Risk Assessment',
        'Review One Policy Document',
        'Identify One Governance Gap',
        'Share a Learning with Your Team'
      ]
    }
  ]);

  const handleOptionSelect = (optionId: string) => {
    setActiveOption(optionId);
  };

  const handleBackToOptions = () => {
    setActiveOption(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Governance, Policy & Risk | Interactive Learning Hub</title>
        <meta name="description" content="Develop your skills in AI governance, policy, and risk management" />
      </Head>
      
      <Header activeTab="learning-coach" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/learning-coach#learning-pathways"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Learning Pathway
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <PathwayHeading
            capability="Governance, Policy & Risk"
            title="Governance, Policy & Risk"
            description="Build governance, policy, and risk management skills to support responsible AI adoption."
          />
          
          <div className="p-6">
            {!activeOption ? (
              <div>

                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {learningOptions.map((option) => (
                    <div 
                      key={option.id}
                      className="group relative bg-white p-6 border border-gray-200 rounded-lg hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setActiveOption(option.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${
                          option.type === 'refresher' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                          option.type === 'scenario' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' :
                          option.type === 'simulation' ? 'bg-green-100 text-green-600 group-hover:bg-green-200' :
                          'bg-amber-100 text-amber-600 group-hover:bg-amber-200'
                        }`}>
                          {(() => {
                            const Icon = {
                              'LightBulbIcon': LightBulbIcon,
                              'UserGroupIcon': UserGroupIcon,
                              'PlayCircleIcon': PlayCircleIcon,
                              'CheckCircleIcon': CheckCircleIcon
                            }[option.icon] || LightBulbIcon;
                            return <Icon className="h-6 w-6" />;
                          })()}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                            {option.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <button 
                    onClick={handleBackToOptions}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    <span>Skills Development</span>
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Start a challenge</h2>
                  <div className="space-y-4">
                    {learningOptions.find(o => o.id === activeOption)?.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const option = learningOptions.find(o => o.id === activeOption);
                          if (option) {
                            if (option.type === 'scenario') {
                              const topic = `Governance: ${item}`;
                              localStorage.setItem('selectedTopic', topic);
                              router.push('/qa-learn');
                            } else if (option.type === 'refresher') {
                              // Handle refresher logic here
                            }
                          }
                        }}
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
        </div>
      </div>
    </div>
  );
};

export default GovernancePolicyRiskPathway;
