import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, UserGroupIcon, AcademicCapIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
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

const WorkforceEnablementPathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'AI Workforce Strategy',
      description: 'Developing a workforce strategy for the AI era',
      duration: '15 min',
      completed: true,
      locked: false,
      content: [
        { type: 'text', content: 'Understanding the Impact of AI on Workforce' },
        { type: 'video', content: 'Building an AI-Ready Workforce' },
        { type: 'interactive', content: 'Workforce Skills Gap Analysis' },
        { type: 'quiz', content: 'Workforce Strategy Fundamentals' }
      ]
    },
    {
      id: 'module-2',
      title: 'Upskilling & Reskilling',
      description: 'Developing skills for AI collaboration',
      duration: '20 min',
      completed: false,
      locked: false,
      content: [
        { type: 'text', content: 'Essential AI Skills for the Future' },
        { type: 'interactive', content: 'Personalized Learning Pathways' },
        { type: 'video', content: 'Effective Upskilling Strategies' },
        { type: 'quiz', content: 'Learning & Development Assessment' }
      ]
    },
    {
      id: 'module-3',
      title: 'AI-Enhanced Collaboration',
      description: 'Leveraging AI for better team collaboration',
      duration: '15 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'AI Tools for Team Collaboration' },
        { type: 'video', content: 'Best Practices for Human-AI Teams' },
        { type: 'interactive', content: 'Collaboration Tools Assessment' }
      ]
    },
    {
      id: 'module-4',
      title: 'Change Management for AI',
      description: 'Managing organizational change in the AI era',
      duration: '20 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Change Management Framework' },
        { type: 'video', content: 'Overcoming Resistance to AI' },
        { type: 'interactive', content: 'Change Impact Assessment' },
        { type: 'quiz', content: 'Change Management Readiness' }
      ]
    }
  ]);

  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.completed).length;
  const progress = Math.round((completedModules / totalModules) * 100);

  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      setActiveModule(module.id);
    }
  };

  const handleCompleteModule = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, completed: true } : module
    ));
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
      <UserGroupIcon className="h-5 w-5" />,
      <AcademicCapIcon className="h-5 w-5" />,
      <BriefcaseIcon className="h-5 w-5" />,
      <ChartBarIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Workforce Enablement Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Empower your workforce with AI skills and knowledge" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Learning Coach
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Workforce Enablement</h1>
                <p className="mt-2 text-teal-100 max-w-2xl">
                  Empower your team with the skills and knowledge to work effectively with AI technologies
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{progress}%</span>
                  <span className="text-sm text-teal-100">Complete</span>
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
              <div className="flex justify-between mt-2 text-sm text-teal-100">
                <span>{completedModules} of {totalModules} modules completed</span>
                <span>Estimated Time: 1h 10m</span>
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
                  isFirst={index === 0}
                  isLast={index === modules.length - 1}
                  onClick={() => handleModuleClick(module)}
                />
              ))}
            </div>
          </div>
        </div>

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
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  {modules.find(m => m.id === activeModule)?.content.map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      {item.type === 'video' && (
                        <svg className="h-5 w-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.type === 'interactive' && (
                        <svg className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                      {item.type === 'quiz' && (
                        <svg className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.type === 'text' && (
                        <svg className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      )}
                      <span className="text-gray-700">{item.content}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => handleCompleteModule(activeModule)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Mark as Complete
                    <CheckCircleIcon className="ml-2 -mr-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkforceEnablementPathway;
