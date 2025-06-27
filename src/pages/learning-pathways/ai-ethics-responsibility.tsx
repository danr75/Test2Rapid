import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, ShieldCheckIcon, ScaleIcon, BeakerIcon } from '@heroicons/react/24/outline';
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

const AIEthicsResponsibilityPathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'AI Ethics Fundamentals',
      description: 'Understand the ethical considerations in AI development and deployment',
      duration: '20 min',
      completed: false,
      locked: false,
      content: [
        { type: 'video', content: 'Introduction to AI Ethics' },
        { type: 'text', content: 'Key Ethical Principles' },
        { type: 'interactive', content: 'Ethical Dilemmas' }
      ]
    },
    {
      id: 'module-2',
      title: 'Bias and Fairness',
      description: 'Identify and mitigate bias in AI systems',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Understanding Bias in AI' },
        { type: 'text', content: 'Fairness Metrics' },
        { type: 'quiz', content: 'Bias Detection' }
      ]
    },
    {
      id: 'module-3',
      title: 'Privacy and Security',
      description: 'Ensure data privacy and security in AI applications',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Data Protection Principles' },
        { type: 'text', content: 'Security Best Practices' },
        { type: 'interactive', content: 'Risk Assessment' }
      ]
    },
    {
      id: 'module-4',
      title: 'Responsible AI Framework',
      description: 'Implement a responsible AI framework in your organization',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'video', content: 'Responsible AI Framework' },
        { type: 'text', content: 'Implementation Guide' },
        { type: 'quiz', content: 'Framework Application' }
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
      <ScaleIcon className="h-5 w-5" />,
      <ShieldCheckIcon className="h-5 w-5" />,
      <BeakerIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI Ethics & Responsibility Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Navigate the ethical considerations of AI implementation" />
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">AI Ethics & Responsibility</h1>
                <p className="mt-2 text-purple-100 max-w-2xl">
                  Navigate the ethical considerations and responsible use of AI in your organization
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
              <div className="flex justify-between mt-2 text-sm text-purple-100">
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

export default AIEthicsResponsibilityPathway;
