'use client';

import React, { useState } from 'react';
import { useLearning } from '@/store/LearningContext';
import PathwayHeading from '@/components/LearningPathway/PathwayHeading';
import QuickRefresherActivity from '@/components/LearningPathway/QuickRefresherActivity';
import ScenarioChallengeActivity from '@/components/LearningPathway/ScenarioChallengeActivity';
import RolePlaySimulationActivity from '@/components/LearningPathway/RolePlaySimulationActivity';
import MicroActionChecklist from '@/components/LearningPathway/MicroActionChecklist';
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
  const { dispatch } = useLearning();
  const [activeOption, setActiveOption] = useState<string | null>(null);

  // Map option id to activity component
  const getActivityComponent = (optionId: string | null) => {
    switch (optionId) {
      case 'quick-refreshers':
        return <QuickRefresherActivity onBack={() => setActiveOption(null)} />;
      case 'role-play':
        return <RolePlaySimulationActivity onBack={() => setActiveOption(null)} />;
      case 'micro-actions':
        return <MicroActionChecklist onBack={() => setActiveOption(null)} />;
      default:
        return null;
    }
  };

  
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

          {!activeOption ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningOptions.map((option) => (
                <div
                  key={option.id}
                  className={`cursor-pointer border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow duration-200`}
                  onClick={() => {
                    if (option.id === 'scenario-challenges') {
                      // Launch real scenario mode
                      dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: 'Data & Tech Capable' });
                      router.push('/scenario-learn');
                    } else {
                      setActiveOption(option.id);
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
                </div>
              ))}
            </div>
          ) : (
            getActivityComponent(activeOption)
          )}
        </div>
      </main>
    </div>
  );
};

export default DataTechCapablePathway;
