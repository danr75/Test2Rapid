'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, ShieldCheckIcon, ScaleIcon, DocumentCheckIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import ProgressBar from '@/components/LearningPathway/ProgressBar';
import ModuleCard from '@/components/LearningPathway/ModuleCard';

type Module = {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  content: {
    type: 'text' | 'video' | 'quiz' | 'interactive';
    content: string;
  }[];
};

const GovernancePolicyRiskPathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Sample modules data - in a real app, this would come from an API or state management
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'AI Governance Fundamentals',
      description: 'Introduction to AI governance frameworks and principles',
      duration: '20 min',
      completed: true,
      locked: false,
      content: [
        { type: 'text', content: 'Understanding AI Governance and Its Importance' },
        { type: 'video', content: 'Key Components of Effective AI Governance' },
        { type: 'interactive', content: 'Assess Your Current Governance Maturity' },
        { type: 'quiz', content: 'AI Governance Fundamentals Quiz' }
      ]
    },
    {
      id: 'module-2',
      title: 'Policy Development & Compliance',
      description: 'Creating and implementing AI policies that ensure compliance',
      duration: '25 min',
      completed: false,
      locked: false,
      content: [
        { type: 'text', content: 'Essential Elements of AI Policy' },
        { type: 'interactive', content: 'Policy Development Framework' },
        { type: 'video', content: 'Navigating AI Regulations and Standards' },
        { type: 'quiz', content: 'Policy Compliance Assessment' }
      ]
    },
    {
      id: 'module-3',
      title: 'Risk Assessment & Mitigation',
      description: 'Identifying and managing risks associated with AI implementation',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'AI Risk Landscape and Categories' },
        { type: 'video', content: 'Risk Assessment Methodologies' },
        { type: 'interactive', content: 'Conduct an AI Risk Assessment' },
        { type: 'quiz', content: 'Risk Management Knowledge Check' }
      ]
    },
    {
      id: 'module-4',
      title: 'Ethical AI & Responsible Practices',
      description: 'Implementing ethical AI practices and responsible innovation',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Ethical Principles in AI' },
        { type: 'video', content: 'Case Studies in Responsible AI' },
        { type: 'interactive', content: 'Develop an AI Ethics Framework' },
        { type: 'quiz', content: 'Ethical AI Practices Assessment' }
      ]
    },
    {
      id: 'module-5',
      title: 'Monitoring & Continuous Improvement',
      description: 'Establishing processes for ongoing governance and improvement',
      duration: '20 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Key Performance Indicators for AI Governance' },
        { type: 'video', content: 'Continuous Improvement Frameworks' },
        { type: 'interactive', content: 'Create a Monitoring Plan' },
        { type: 'quiz', content: 'Governance Maturity Assessment' }
      ]
    }
  ]);

  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.completed).length;
  const progress = Math.round((completedModules / totalModules) * 100);

  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      setActiveModule(module.id);
      // In a real app, you would navigate to the module content
      // router.push(`/learning-pathways/governance-policy-risk/${module.id}`);
    }
  };

  const handleCompleteModule = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, completed: true } : module
    ));
    // Unlock next module if exists
    const currentIndex = modules.findIndex(m => m.id === moduleId);
    if (currentIndex < modules.length - 1) {
      setModules(modules.map((module, index) => 
        index === currentIndex + 1 ? { ...module, locked: false } : module
      ));
    }
    setActiveModule(null);
  };

  const getModuleIcon = (index: number) => {
    const icons = [
      <ShieldCheckIcon className="h-5 w-5" />,
      <DocumentCheckIcon className="h-5 w-5" />,
      <ScaleIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />,
      <ChartPieIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  // Handle scroll to section when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#learning-pathways') {
      const element = document.getElementById('learning-pathways');
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Governance, Policy & Risk Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Master AI governance, policy development, and risk management" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/learning-coach#learning-pathways"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Learning Pathway
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Governance, Policy & Risk</h1>
                <p className="mt-2 text-purple-100 max-w-2xl">
                  Develop expertise in AI governance frameworks, policy development, and risk management strategies
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{progress}%</span>
                  <span className="text-sm text-purple-100">Complete</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar 
                completed={completedModules} 
                total={totalModules}
                barClassName="bg-white"
                showText={false}
              />
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2 text-sm text-purple-100">
                <span className="mb-1 sm:mb-0">{completedModules} of {totalModules} modules completed</span>
                <span>Estimated Time: 2h 0m</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Path</h2>
            <div className="space-y-8">
              {modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  id={module.id}
                  title={module.title}
                  description={module.description}
                  duration={module.duration}
                  completed={module.completed}
                  locked={module.locked}
                  icon={getModuleIcon(index)}
                  isFirst={index === 0}
                  isLast={index === modules.length - 1}
                  onClick={() => handleModuleClick(module)}
                  onComplete={() => handleCompleteModule(module.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Module Content Modal - would be a separate page in a real app */}
        {activeModule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modules.find(m => m.id === activeModule)?.title}
                  </h2>
                  <button 
                    onClick={() => setActiveModule(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 space-y-4">
                  {modules.find(m => m.id === activeModule)?.content.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">
                        {item.type === 'text' ? 'Reading' : 
                         item.type === 'video' ? 'Video' :
                         item.type === 'quiz' ? 'Quiz' : 'Interactive Activity'}
                      </h3>
                      <p className="mt-1 text-gray-600">{item.content}</p>
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-6 border-t border-gray-200">
                    <button
                      onClick={() => handleCompleteModule(activeModule)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GovernancePolicyRiskPathway;
