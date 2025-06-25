import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { BookOpenIcon, CheckCircleIcon, LockClosedIcon, ArrowLeftIcon, AcademicCapIcon, LightBulbIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
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

const FoundationsEcosystemPathway = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Sample modules data - in a real app, this would come from an API or state management
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'AI Fundamentals',
      description: 'Introduction to core AI concepts, terminology, and the AI landscape',
      duration: '15 min',
      completed: true,
      locked: false,
      content: [
        { type: 'text', content: 'Understanding AI, Machine Learning, and Deep Learning' },
        { type: 'video', content: 'The Evolution of AI and Its Business Impact' },
        { type: 'interactive', content: 'AI Use Cases in Different Industries' },
        { type: 'quiz', content: 'Test your understanding of AI basics' }
      ]
    },
    {
      id: 'module-2',
      title: 'AI Ecosystem Overview',
      description: 'Understanding the AI technology landscape and key players',
      duration: '20 min',
      completed: false,
      locked: false,
      content: [
        { type: 'text', content: 'Key components of the AI ecosystem' },
        { type: 'interactive', content: 'Explore the AI technology stack' },
        { type: 'video', content: 'Leading AI Platforms and Tools' },
        { type: 'quiz', content: 'AI Technology Landscape Quiz' }
      ]
    },
    {
      id: 'module-3',
      title: 'AI Integration Patterns',
      description: 'How AI fits into existing business systems and workflows',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Common AI Integration Architectures' },
        { type: 'video', content: 'Case Studies: Successful AI Integration' },
        { type: 'interactive', content: 'Design an AI Integration Plan' }
      ]
    },
    {
      id: 'module-4',
      title: 'Emerging AI Technologies',
      description: 'Latest developments in AI and their business implications',
      duration: '20 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Cutting-edge AI Research and Applications' },
        { type: 'video', content: 'The Future of AI in Business' },
        { type: 'interactive', content: 'Assess Emerging Tech for Your Business' },
        { type: 'quiz', content: 'Emerging Technologies Assessment' }
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
      // router.push(`/learning-pathways/foundations-ecosystem/${module.id}`);
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
      <AcademicCapIcon className="h-5 w-5" />,
      <LightBulbIcon className="h-5 w-5" />,
      <CodeBracketIcon className="h-5 w-5" />,
      <BookOpenIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Foundations & Ecosystem Learning Path | Interactive Learning Hub</title>
        <meta name="description" content="Master the foundations of AI and understand the ecosystem" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Learning Coach
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Foundations & Ecosystem</h1>
                <p className="mt-2 text-blue-100 max-w-2xl">
                  Build essential knowledge of AI technologies, platforms, and their integration into business systems
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
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

export default FoundationsEcosystemPathway;
