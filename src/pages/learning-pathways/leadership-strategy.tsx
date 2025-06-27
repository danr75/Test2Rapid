import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, UserGroupIcon, ChartBarIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
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

const LeadershipStrategyPathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'AI Vision & Strategy',
      description: 'Develop a clear vision and strategy for AI adoption in your organization',
      duration: '20 min',
      completed: false,
      locked: false,
      content: [
        { type: 'video', content: 'Introduction to AI Strategy' },
        { type: 'text', content: 'Building an AI Vision' },
        { type: 'interactive', content: 'Strategy Workshop' }
      ]
    },
    {
      id: 'module-2',
      title: 'Leadership in AI',
      description: 'Develop leadership skills for the AI era',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Leading AI Initiatives' },
        { type: 'text', content: 'Change Management' },
        { type: 'quiz', content: 'Leadership Assessment' }
      ]
    },
    {
      id: 'module-3',
      title: 'AI Business Models',
      description: 'Explore business models enabled by AI',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'AI Business Models Overview' },
        { type: 'text', content: 'Case Studies' },
        { type: 'interactive', content: 'Business Model Canvas' }
      ]
    },
    {
      id: 'module-4',
      title: 'AI Implementation Roadmap',
      description: 'Create a roadmap for AI implementation',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Roadmapping Process' },
        { type: 'text', content: 'Key Milestones' },
        { type: 'quiz', content: 'Roadmap Development' }
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
      <PresentationChartLineIcon className="h-5 w-5" />,
      <UserGroupIcon className="h-5 w-5" />,
      <ChartBarIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Leadership & Strategy Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Develop leadership and strategic skills for AI adoption" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={() => {
            // First navigate to the page
            router.push('/learning-coach#learning-pathways');
            // Then handle scrolling after navigation is complete
            setTimeout(() => {
              const element = document.getElementById('learning-pathways');
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 100,
                  behavior: 'smooth'
                });
              }
            }, 100); // Small delay to ensure the page has started loading
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Learning Coach
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Leadership & Strategy</h1>
                <p className="mt-2 text-indigo-100 max-w-2xl">
                  Develop the leadership and strategic thinking skills needed to drive AI transformation
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{progress}%</span>
                  <span className="text-sm text-indigo-100">Complete</span>
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
              <div className="flex justify-between mt-2 text-sm text-indigo-100">
                <span>{completedModules} of {totalModules} modules completed</span>
                <span>Estimated Time: 1h 40m</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Path</h2>
            <div className="space-y-6">
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
      </main>
    </div>
  );
};

export default LeadershipStrategyPathway;
