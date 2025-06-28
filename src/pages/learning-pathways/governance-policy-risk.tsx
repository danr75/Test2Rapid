'use client';

import React, { useState } from 'react';
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Governance, Policy & Risk</h1>
                <p className="mt-2 text-blue-100 max-w-2xl">
                  Develop your expertise in AI governance, policy development, and risk management
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {!activeOption ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Options</h2>
                  <p className="text-gray-600">Choose a learning format that fits your needs and schedule</p>
                </div>
                
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
                <button
                  onClick={handleBackToOptions}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Learning Options
                </button>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${
                      learningOptions.find(o => o.id === activeOption)?.type === 'refresher' ? 'bg-blue-100 text-blue-600' :
                      learningOptions.find(o => o.id === activeOption)?.type === 'scenario' ? 'bg-purple-100 text-purple-600' :
                      learningOptions.find(o => o.id === activeOption)?.type === 'simulation' ? 'bg-green-100 text-green-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {(() => {
                        const icon = learningOptions.find(o => o.id === activeOption)?.icon || 'LightBulbIcon';
                        const Icon = {
                          'LightBulbIcon': LightBulbIcon,
                          'UserGroupIcon': UserGroupIcon,
                          'PlayCircleIcon': PlayCircleIcon,
                          'CheckCircleIcon': CheckCircleIcon
                        }[icon] || LightBulbIcon;
                        return <Icon className="h-6 w-6" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {learningOptions.find(o => o.id === activeOption)?.title}
                      </h2>
                      <p className="text-gray-600">
                        {learningOptions.find(o => o.id === activeOption)?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Activities</h3>
                    <div className="space-y-3">
                      {learningOptions.find(o => o.id === activeOption)?.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </div>
                          <button className="ml-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                            <ChevronRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
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
