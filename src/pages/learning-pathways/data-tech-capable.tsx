import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, ServerIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
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

const DataTechCapablePathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Data Infrastructure',
      description: 'Build the foundation for AI with robust data infrastructure',
      duration: '25 min',
      completed: false,
      locked: false,
      content: [
        { type: 'video', content: 'Data Infrastructure Overview' },
        { type: 'text', content: 'Data Storage Solutions' },
        { type: 'interactive', content: 'Infrastructure Planning' }
      ]
    },
    {
      id: 'module-2',
      title: 'AI/ML Tools & Frameworks',
      description: 'Explore popular tools and frameworks for AI development',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'AI/ML Tools Overview' },
        { type: 'text', content: 'Framework Comparison' },
        { type: 'quiz', content: 'Tool Selection' }
      ]
    },
    {
      id: 'module-3',
      title: 'Model Deployment',
      description: 'Deploy and manage AI models in production',
      duration: '35 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Deployment Strategies' },
        { type: 'text', content: 'Model Serving' },
        { type: 'interactive', content: 'Deployment Planning' }
      ]
    },
    {
      id: 'module-4',
      title: 'Scaling AI Solutions',
      description: 'Scale your AI solutions across the organization',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Scaling Strategies' },
        { type: 'text', content: 'Performance Optimization' },
        { type: 'quiz', content: 'Scaling Assessment' }
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
      <ServerIcon className="h-5 w-5" />,
      <CodeBracketIcon className="h-5 w-5" />,
      <ServerIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Data & Tech Capable Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Build technical capabilities for AI implementation" />
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
          Learning Pathway
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Data & Tech Capable</h1>
                <p className="mt-2 text-teal-100 max-w-2xl">
                  Build the technical foundation and capabilities for successful AI implementation
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
                <span>Estimated Time: 2h 0m</span>
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

export default DataTechCapablePathway;
