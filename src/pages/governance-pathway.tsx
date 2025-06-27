'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type LearningCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  iconBgColor?: string;
};

const LearningCard: React.FC<LearningCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  onClick,
  iconBgColor = 'bg-indigo-100',
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
    <div className="p-6 flex-1 flex flex-col">
      <div className={`h-12 w-12 ${iconBgColor} rounded-lg flex items-center justify-center text-indigo-600 mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-1">{description}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium transition-colors mt-auto"
      >
        {buttonText}
      </button>
    </div>
  </div>
);

const GovernancePathway = () => {
  const router = useRouter();

  // Handle scroll to section when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#learning-pathways') {
      const element = document.getElementById('learning-pathways');
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, []);

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const cards = [
    {
      title: 'Rapid Test',
      description: 'Quickly assess your knowledge with our rapid test module',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      buttonText: 'Start Test',
      path: '/ai-skills-toolkit/governance-policy-risk?tab=rapid-test',
      iconBgColor: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Essentials Refresher',
      description: 'Review key concepts and essential information for Governance, Policy & Risk',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonText: 'View Content',
      path: '/ai-skills-toolkit/governance-policy-risk?tab=essentials',
      iconBgColor: 'bg-green-100 text-green-600',
    },
    {
      title: 'Structured Learn',
      description: 'Follow a guided learning path at your own pace',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      buttonText: 'Begin Learning',
      path: '/ai-skills-toolkit/governance-policy-risk?tab=structured-learn',
      iconBgColor: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Templates & Resources',
      description: 'Access templates, guides, and resources for Governance, Policy & Risk',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      buttonText: 'View Resources',
      path: '/ai-skills-toolkit/governance-policy-risk?tab=templates',
      iconBgColor: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="learning-coach" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/learning-coach"
            as="/learning-coach#learning-pathways"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            scroll={false}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Learning Coach
          </Link>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Governance, Policy & Risk</h1>
            <p className="text-gray-600">
              Develop expertise in AI governance frameworks, policy development, and risk management strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <LearningCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                buttonText={card.buttonText}
                onClick={() => handleCardClick(card.path)}
                iconBgColor={card.iconBgColor}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernancePathway;
