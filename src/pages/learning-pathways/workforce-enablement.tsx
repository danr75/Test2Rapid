import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, UserGroupIcon, UserPlusIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
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
      title: 'AI Skills Assessment',
      description: 'Assess your team\'s current AI skills and identify gaps',
      duration: '15 min',
      completed: false,
      locked: false,
      content: [
        { type: 'text', content: 'Understanding AI Skills' },
        { type: 'interactive', content: 'Skills Assessment' },
        { type: 'quiz', content: 'Gap Analysis' }
      ]
    },
    {
      id: 'module-2',
      title: 'Upskilling Strategies',
      description: 'Develop strategies for upskilling your workforce',
      duration: '20 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Upskilling Frameworks' },
        { type: 'text', content: 'Learning Pathways' },
        { type: 'interactive', content: 'Strategy Development' }
      ]
    },
    {
      id: 'module-3',
      title: 'Change Management',
      description: 'Manage organizational change during AI adoption',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Change Management Principles' },
        { type: 'text', content: 'Overcoming Resistance' },
        { type: 'quiz', content: 'Change Management Assessment' }
      ]
    },
    {
      id: 'module-4',
      title: 'Building AI Teams',
      description: 'Create effective AI teams and roles',
      duration: '20 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'AI Team Structures' },
        { type: 'text', content: 'Key Roles and Responsibilities' },
        { type: 'interactive', content: 'Team Building Exercise' }
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
      <AcademicCapIcon className="h-5 w-5" />,
      <UserGroupIcon className="h-5 w-5" />,
      <UserPlusIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Workforce Enablement Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Enable your workforce with AI skills and knowledge" />
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
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Workforce Enablement</h1>
                <p className="mt-2 text-blue-100 max-w-2xl">
                  Equip your team with the skills and knowledge needed for AI adoption
                </p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{progress}%</span>
                  <span className="text-sm text-blue-100">Complete</span>
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
              <div className="flex justify-between mt-2 text-sm text-blue-100">
                <span>{completedModules} of {totalModules} modules completed</span>
                <span>Estimated Time: 1h 20m</span>
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

export default WorkforceEnablementPathway;
