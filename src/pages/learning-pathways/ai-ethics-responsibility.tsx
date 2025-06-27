import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { 
  BookOpenIcon, 
  CheckCircleIcon, 
  LockClosedIcon, 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  ScaleIcon, 
  EyeIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  PlayIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
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

const AIEthicsResponsibility = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Ethical AI Principles',
      description: 'Understanding core principles of ethical AI',
      duration: '20 min',
      completed: true,
      locked: false,
      content: [
        { type: 'text', content: 'Introduction to AI Ethics' },
        { type: 'video', content: 'Key Ethical Frameworks' },
        { type: 'interactive', content: 'Ethical Decision Making' },
        { type: 'quiz', content: 'Ethics Principles Quiz' }
      ]
    },
    {
      id: 'module-2',
      title: 'Responsible AI Practices',
      description: 'Implementing responsible AI in your organization',
      duration: '25 min',
      completed: false,
      locked: false,
      content: [
        { type: 'text', content: 'Responsible AI Framework' },
        { type: 'interactive', content: 'Risk Assessment' },
        { type: 'video', content: 'Case Studies' },
        { type: 'quiz', content: 'Responsible AI Quiz' }
      ]
    },
    {
      id: 'module-3',
      title: 'Bias and Fairness',
      description: 'Identifying and mitigating bias in AI systems',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Understanding Bias in AI' },
        { type: 'video', content: 'Fairness Metrics' },
        { type: 'interactive', content: 'Bias Detection' },
        { type: 'quiz', content: 'Bias & Fairness Quiz' }
      ]
    },
    {
      id: 'module-4',
      title: 'Privacy and Security',
      description: 'Ensuring data privacy and security in AI',
      duration: '25 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'Data Protection Principles' },
        { type: 'video', content: 'Security Best Practices' },
        { type: 'interactive', content: 'Privacy Impact Assessment' },
        { type: 'quiz', content: 'Privacy & Security Quiz' }
      ]
    },
    {
      id: 'module-5',
      title: 'Societal Impact',
      description: 'Understanding the broader impact of AI on society',
      duration: '30 min',
      completed: false,
      locked: true,
      content: [
        { type: 'text', content: 'AI and Society' },
        { type: 'video', content: 'Case Studies' },
        { type: 'interactive', content: 'Impact Assessment' },
        { type: 'quiz', content: 'Societal Impact Quiz' }
      ]
    }
  ]);

  const completedModules = modules.filter(module => module.completed).length;
  const totalModules = modules.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  const handleModuleClick = (module: Module) => {
    if (!module.locked) {
      setActiveModule(module.id === activeModule ? null : module.id);
    }
  };

  const toggleModuleComplete = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, completed: !module.completed } 
        : module
    ));
  };

  const getModuleIcon = (index: number) => {
    const icons = [
      <ScaleIcon className="h-5 w-5" />,
      <ShieldCheckIcon className="h-5 w-5" />,
      <EyeIcon className="h-5 w-5" />,
      <UserGroupIcon className="h-5 w-5" />,
      <GlobeAltIcon className="h-5 w-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI Ethics & Responsibility | Learning Pathway</title>
        <meta name="description" content="AI Ethics & Responsibility learning pathway" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Learning Coach
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Ethics & Responsibility</h1>
                <p className="mt-2 text-gray-600">
                  Learn about ethical considerations and responsible practices in AI implementation
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center">
                  <div className="w-48">
                    <ProgressBar completed={completedModules} total={totalModules} />
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-700">
                    {completedModules} of {totalModules} modules completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {modules.map((module, index) => (
            <div key={module.id}>
              <ModuleCard
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
              {activeModule === module.id && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Module Content</h4>
                  <ul className="space-y-2">
                    {module.content.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">
                          {item.type === 'text' && <BookOpenIcon className="h-4 w-4 text-gray-400" />}
                          {item.type === 'video' && <PlayIcon className="h-4 w-4 text-gray-400" />}
                          {item.type === 'quiz' && <DocumentTextIcon className="h-4 w-4 text-gray-400" />}
                          {item.type === 'interactive' && <CursorArrowRaysIcon className="h-4 w-4 text-gray-400" />}
                        </span>
                        {item.content}
                        {module.completed && (
                          <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AIEthicsResponsibility;
