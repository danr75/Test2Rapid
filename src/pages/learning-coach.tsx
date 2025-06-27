import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import TopicInput from '@/components/UI/TopicInput';
import { useLearning, LearningMode } from '@/store/LearningContext';
import { useRouter } from 'next/router';
import { 
  ChatBubbleOvalLeftEllipsisIcon, 
  DocumentTextIcon, 
  BookOpenIcon,
  UsersIcon, 
  BoltIcon,
  UserCircleIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import tagsModule, { TagGroup } from '@/types/tags';

interface SkillData {
  category: string;
  percentage: number;
  targetPercentage: number;
  currentLevel: string;
  targetLevel: string;
}

const getPriorityForCapability = (capabilityName: string): 'high' | 'medium' | 'low' => {
  const lowerName = capabilityName.toLowerCase();
  
  // Always return high priority for Foundations & Ecosystem
  if (lowerName.includes('foundation') || lowerName.includes('ecosystem')) {
    return 'high';
  }
  
  // Always return low priority for Workforce Enablement and Leadership & Strategy
  if (lowerName.includes('workforce') || lowerName.includes('leadership') || lowerName.includes('strategy')) {
    return 'low';
  }
  
  if (typeof window === 'undefined') return 'medium';
  
  try {
    const targetRoles = JSON.parse(localStorage.getItem('targetRoles') || '[]');
    if (!targetRoles.length) return 'medium';
    
    // Get the first target role (most recent)
    const targetRole = targetRoles[0];
    const capability = targetRole.targetLevels.find((level: any) => 
      level.category.toLowerCase() === lowerName
    );
    
    if (!capability) return 'medium';
    
    const gap = capability.targetPercentage - capability.currentPercentage;
    
    if (gap > 30) return 'high';
    if (gap > 10) return 'medium';
    return 'low';
  } catch (error) {
    console.error('Error getting priority for capability:', error);
    return 'medium';
  }
};

const PriorityBadge = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
  const config = {
    high: {
      icon: ExclamationTriangleIcon,
      color: 'bg-red-100 text-red-700',
      label: 'High'
    },
    medium: {
      icon: ExclamationCircleIcon,
      color: 'bg-yellow-100 text-yellow-700',
      label: 'Medium'
    },
    low: {
      icon: CheckCircleIcon,
      color: 'bg-green-100 text-green-700',
      label: 'Low'
    }
  };
  
  const { icon: Icon, color, label } = config[priority];
  
  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </div>
  );
};

const tagGroups = tagsModule.tagGroups as TagGroup[];

const learningModes: { id: LearningMode; label: string; path: string; icon: React.ElementType }[] = [
  { id: 'Q&A', label: 'Q&A Mode', path: '/qa-learn', icon: ChatBubbleOvalLeftEllipsisIcon },
  { id: 'Scenario', label: 'Scenario Mode', path: '/scenario-learn', icon: DocumentTextIcon },
  { id: 'Speed', label: 'Speed Mode', path: '/speed-learn', icon: BoltIcon },
];

interface StrategicFocusCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topicToSet: string;
  learningPath: string;
}

interface StrategicFocusCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topicToSet: string;
  learningPath: string;
  tags: string[];
  duration: string;
}

const strategicFocusTopics: StrategicFocusCardData[] = [
  {
    id: 'ai-strategy-101',
    title: 'AI Strategy in 15 Minutes',
    description: 'Quick guide to identifying high-impact AI use cases for your business',
    icon: BookOpenIcon,
    topicToSet: 'AI Strategy Essentials',
    learningPath: 'Leadership & Strategy',
    tags: ['ai-strategy', 'commercial-decisions'],
    duration: '15 min',
  },
  {
    id: 'ai-risk-assessment',
    title: 'AI Risk Assessment',
    description: 'Quick framework for identifying and mitigating AI risks in projects',
    icon: UsersIcon,
    topicToSet: 'AI Risk Management Basics',
    learningPath: 'Governance, Policy & Risk',
    tags: ['risk-management', 'ai-ethics', 'governance-assurance'],
    duration: '12 min',
  },
  {
    id: 'ai-ecosystem-overview',
    title: 'AI Ecosystem Overview',
    description: 'Key components of the AI ecosystem and how they work together',
    icon: AcademicCapIcon,
    topicToSet: 'AI Ecosystem Fundamentals',
    learningPath: 'Foundations & Ecosystem',
    tags: ['ai-ecosystem', 'ai-foundations'],
    duration: '10 min',
  },
  {
    id: 'team-ai-readiness',
    title: 'Team AI Readiness',
    description: 'Assess and improve your team\'s readiness for AI adoption',
    icon: UserCircleIcon,
    topicToSet: 'Building AI-Ready Teams',
    learningPath: 'Workforce Enablement',
    tags: ['workforce-planning', 'change-management'],
    duration: '15 min',
  },
  {
    id: 'data-quality-ai',
    title: 'Data Quality for AI',
    description: 'Essential data requirements for successful AI implementation',
    icon: BoltIcon,
    topicToSet: 'AI Data Readiness',
    learningPath: 'Data and Tech Capable',
    tags: ['data-readiness', 'ai-lifecycle'],
    duration: '12 min',
  },
  {
    id: 'ai-ethics-101',
    title: 'AI Ethics in Practice',
    description: 'Practical approaches to ethical AI implementation',
    icon: AcademicCapIcon,
    topicToSet: 'Applied AI Ethics',
    learningPath: 'Governance, Policy & Risk',
    tags: ['ai-ethics', 'human-oversight'],
    duration: '10 min',
  },
  {
    id: 'ai-use-cases',
    title: 'Identifying AI Use Cases',
    description: 'How to spot and prioritize valuable AI opportunities',
    icon: BookOpenIcon,
    topicToSet: 'AI Opportunity Identification',
    learningPath: 'Leadership & Strategy',
    tags: ['ai-strategy', 'commercial-decisions'],
    duration: '12 min',
  },
  {
    id: 'ai-procurement',
    title: 'Responsible AI Procurement',
    description: 'Key considerations when acquiring AI solutions',
    icon: UsersIcon,
    topicToSet: 'AI Solution Procurement',
    learningPath: 'Governance, Policy & Risk',
    tags: ['responsible-procurement', 'ai-policy'],
    duration: '10 min',
  },
  {
    id: 'ai-collaboration',
    title: 'Cross-functional AI Teams',
    description: 'Best practices for effective AI collaboration',
    icon: UserCircleIcon,
    topicToSet: 'AI Team Collaboration',
    learningPath: 'Workforce Enablement',
    tags: ['collaboration', 'partnerships'],
    duration: '10 min',
  },
  {
    id: 'ai-metrics',
    title: 'Measuring AI Success',
    description: 'Key metrics for evaluating AI implementation impact',
    icon: BoltIcon,
    topicToSet: 'AI Performance Metrics',
    learningPath: 'Data and Tech Capable',
    tags: ['measurement', 'ai-lifecycle'],
    duration: '12 min',
  }
];

const LearningCoachPage: React.FC = () => {
  const { state, dispatch } = useLearning();
  const router = useRouter();
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Handle scroll to section when the page loads with a hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          // Small delay to ensure the page has fully rendered
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop - 100, // Adjust offset as needed
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Handle initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Function to get a random learning mode
  const getRandomLearningMode = (): LearningMode => {
    const modes: LearningMode[] = ['Q&A', 'Scenario', 'Speed'];
    const randomIndex = Math.floor(Math.random() * modes.length);
    return modes[randomIndex];
  };
  
  // Function to handle 'Pick for me' click
  const handlePickForMe = () => {
    // Use the currently selected mode instead of a random one
    const mode = currentLearningMode;
    
    // Define some default topics for each mode
    const defaultTopics = {
      'Q&A': 'AI Fundamentals',
      'Scenario': 'AI Business Case',
      'Speed': 'AI Quick Facts'
    };
    
    // Set the topic based on the selected mode
    const topic = defaultTopics[mode];
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: topic });
    
    // Navigate to the appropriate learning page
    if (mode === 'Scenario') {
      console.log('Navigating to Scenario mode with topic:', topic);
      router.push('/scenario-learn');
    } else if (mode === 'Speed') {
      console.log('Navigating to Speed mode with topic:', topic);
      router.push('/speed-learn');
    } else {
      console.log('Navigating to Q&A mode with topic:', topic);
      router.push('/qa-learn');
    }
  };

  // Handle learning pathway click
  const handlePathwayClick = (path: string) => {
    router.push(path);
  };

  // Learning pathway data for all capability groups
  const learningPathways = [
    {
      id: 'governance-policy-risk',
      title: 'Governance, Policy & Risk',
      progress: { completed: 2, total: 6, percentage: 33 },
      color: 'blue',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/learning-pathways/governance-policy-risk'
    },
    {
      id: 'foundations-ecosystem',
      title: 'Foundations & Ecosystem',
      progress: { completed: 1, total: 5, percentage: 20 },
      color: 'green',
      path: '/learning-pathways/foundations-ecosystem',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'data-tech-capable',
      title: 'Data & Tech Capable',
      progress: { completed: 3, total: 7, percentage: 43 },
      color: 'purple',
      path: '/learning-pathways/data-tech-capable',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'leadership-strategy',
      title: 'Leadership & Strategy',
      progress: { completed: 4, total: 8, percentage: 50 },
      color: 'indigo',
      path: '/learning-pathways/leadership-strategy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'workforce-enablement',
      title: 'Workforce Enablement',
      progress: { completed: 2, total: 6, percentage: 33 },
      color: 'blue',
      path: '/learning-pathways/workforce-enablement',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'ai-ethics-responsibility',
      title: 'AI Ethics & Responsibility',
      progress: { completed: 1, total: 5, percentage: 20 },
      color: 'pink',
      path: '/learning-pathways/ai-ethics-responsibility',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];
  
  // Handle carousel navigation
  const handlePrevious = () => {
    setCarouselIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : learningPathways.length - 3));
  };
  
  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex < learningPathways.length - 3 ? prevIndex + 1 : 0));
  };

  // Derive current mode from context, default to 'Q&A'
  const currentLearningMode = state.learningMode || 'Q&A';

  // Effect to initialize context's learningMode if it's not set (e.g., on first app load)
  useEffect(() => {
    if (!state.learningMode) {
      // Default to Q&A, or any other preferred default
      dispatch({ type: 'SET_LEARNING_MODE', payload: 'Q&A' }); 
    }
  }, [state.learningMode, dispatch]); // Only re-run if these change

  const handleModeChange = (newMode: LearningMode) => {
    console.log('handleModeChange called with:', newMode);
    
    // Toggle the learning mode - if clicking the same mode, keep it selected
    const modeToSet = currentLearningMode === newMode ? currentLearningMode : newMode;
    
    // Set the learning mode in the context
    dispatch({ type: 'SET_LEARNING_MODE', payload: modeToSet });
    
    // Get the default topic for this mode if no topic is set
    const defaultTopics = {
      'Q&A': 'AI Fundamentals',
      'Scenario': 'AI Business Case',
      'Speed': 'AI Quick Facts'
    };
    
    const topic = state.topic || defaultTopics[modeToSet] || 'AI Learning';
    
    // Set the topic in the context
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: topic });
  };

  const handleTopicSubmit = (topic: string) => {
    if (!topic.trim()) return; // Don't submit empty topics
    
    console.log('Topic submitted:', topic);
    console.log('Current learning mode is:', currentLearningMode);
    
    // Set the topic in the context
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: topic });
    
    // Navigate based on the currently selected mode
    if (currentLearningMode === 'Scenario') {
      console.log('Navigating to Scenario mode');
      router.push('/scenario-learn');
    } 
    else if (currentLearningMode === 'Speed') {
      console.log('Navigating to Speed mode');
      router.push('/speed-learn');
    }
    else {
      console.log('Navigating to Q&A mode');
      router.push('/qa-learn');
    }
  };

  const handleStrategicFocusClick = (card: StrategicFocusCardData) => {
    console.log('Strategic focus clicked with mode:', currentLearningMode);
    
    // Set the topic for learning
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: card.topicToSet });
    
    // Navigate based on the currently selected mode
    if (currentLearningMode === 'Scenario') {
      console.log('Navigating strategic focus to Scenario mode');
      router.push('/scenario-learn');
    }
    else if (currentLearningMode === 'Speed') {
      console.log('Navigating strategic focus to Speed mode');
      router.push('/speed-learn');
    }
    else {
      console.log('Navigating strategic focus to Q&A mode');
      router.push('/qa-learn');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Learning Coach | AI skills builder</title>
        <meta name="description" content="Personal learning hub" />
      </Head>

      <Header activeTab="learning-coach" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Daily Drill */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">10 Minute Daily Drill</h2>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Learning Mode</h3>
                <div className="flex items-center space-x-1 bg-white p-0.5 rounded-lg border border-gray-200 w-fit">
                  {learningModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleModeChange(mode.id)}
                      className={`
                        flex items-center justify-center px-3 py-1.5 rounded-md text-sm transition-all
                        ${currentLearningMode === mode.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <mode.icon 
                        className={`h-4 w-4 mr-1.5 ${
                          currentLearningMode === mode.id ? 'text-indigo-600' : 'text-gray-400'
                        }`} 
                        aria-hidden="true"
                      />
                      <span>{mode.label.replace(' Mode', '')}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">What would you like to learn about today?</h3>
                
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="w-3/4 sm:w-auto">
                    <button
                      onClick={handlePickForMe}
                      className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
                    >
                      <SparklesIcon className="h-5 w-5 mr-2" />
                      Pick for me
                    </button>
                  </div>
                  
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      className="w-full h-full px-4 pr-16 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search for a skill..."
                      onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && handleTopicSubmit((e.target as HTMLInputElement).value)}
                    />
                    <button
                      onClick={() => {
                        const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
                        if (inputEl?.value) handleTopicSubmit(inputEl.value);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Pathways Section */}
          <div id="learning-pathways" className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Learning Pathways</h2>
              <p className="text-gray-600 text-base">Proceed with a structured approach to your learning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPathways.map((pathway) => {
                const bgColor = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  purple: 'bg-purple-100 text-purple-600',
                  indigo: 'bg-indigo-100 text-indigo-600',
                  teal: 'bg-teal-100 text-teal-600',
                  pink: 'bg-pink-100 text-pink-600'
                }[pathway.color] || 'bg-gray-100 text-gray-600';

                const progressBarColor = {
                  blue: 'bg-blue-600',
                  green: 'bg-green-600',
                  purple: 'bg-purple-600',
                  indigo: 'bg-indigo-600',
                  teal: 'bg-teal-600',
                  pink: 'bg-pink-600'
                }[pathway.color] || 'bg-gray-600';

                const router = useRouter();

                return (
                  <div 
                    key={pathway.id}
                    className={`group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 
                               hover:shadow-md hover:border-indigo-100 hover:ring-1 hover:ring-indigo-200 
                               transition-all duration-150 ease-in-out cursor-pointer h-full
                               ${!pathway.path ? 'opacity-70' : ''}`}
                    onClick={() => pathway.path && router.push(pathway.path)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && pathway.path) {
                        e.preventDefault();
                        router.push(pathway.path);
                      }
                    }}
                    aria-label={`${pathway.title} - ${pathway.progress.completed} of ${pathway.progress.total} modules completed`}
                  >
                    <div className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start">
                          <div className={`h-10 w-10 ${bgColor} flex-shrink-0 flex items-center justify-center rounded-lg`}>
                            {React.cloneElement(pathway.icon as React.ReactElement, { className: 'h-5 w-5' })}
                          </div>
                          <h3 className="ml-3 text-base font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                            {pathway.title}
                          </h3>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-400 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">
                            {pathway.progress.completed} of {pathway.progress.total} modules
                          </span>
                          <span className="text-xs text-gray-500">{pathway.progress.percentage}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${progressBarColor}`}
                            style={{ width: `${pathway.progress.percentage}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* AI Skills Toolkit Section */}
          <div id="my-toolkit">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Toolkit</h2>
              <p className="text-gray-600 text-base">Quick-access resources to support your daily work.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningPathways.map((pathway) => {
                const bgColor = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  purple: 'bg-purple-100 text-purple-600',
                  indigo: 'bg-indigo-100 text-indigo-600',
                  teal: 'bg-teal-100 text-teal-600',
                  pink: 'bg-pink-100 text-pink-600'
                }[pathway.color] || 'bg-gray-100 text-gray-600';

                const toolkitTiles = [
                  'governance-policy-risk',
                  'foundations-ecosystem',
                  'data-tech-capable',
                  'leadership-strategy',
                  'workforce-enablement',
                  'ai-ethics-responsibility'
                ];
                
                const isToolkitTile = toolkitTiles.includes(pathway.id);
                const router = useRouter();

                const handleCardClick = () => {
                  if (isToolkitTile) {
                    // Navigate to the toolkit item and then scroll to the section
                    router.push(`/ai-skills-toolkit/${pathway.id}#my-toolkit`);
                  } else if (pathway.path) {
                    // For learning pathways, keep the existing behavior
                    router.push(pathway.path);
                  }
                };

                return (
                  <div 
                    key={pathway.id}
                    className={`group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col ${pathway.path || isToolkitTile ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                    onClick={(pathway.path || isToolkitTile) ? handleCardClick : undefined}
                  >
                    <div className="p-5 pb-2 flex-1 flex items-start">
                      <div className={`h-10 w-10 ${bgColor} flex-shrink-0 flex items-center justify-center rounded-lg`}>
                        {React.cloneElement(pathway.icon as React.ReactElement, { className: 'h-5 w-5' })}
                      </div>
                      <h3 className="ml-3 text-base font-medium text-gray-900">
                        {pathway.title}
                      </h3>
                      <span className="ml-auto text-gray-300 group-hover:text-gray-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                    <div className="px-5 pb-4 pt-1">
                      <p className="text-xs text-gray-400">Cheat Sheets, Templates, Notes & More</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Personalised micro-lessons Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Build Real-World AI Capabilities</h2>
              <p className="text-gray-600 text-base">Jump to lessons of interest that support your learning pathway and capability growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategicFocusTopics.map((card) => {
                const group = tagGroups.find((g: TagGroup) => g.name === card.learningPath);
                const groupColor: string = group?.color || 'gray';
                const bgColor = {
                  blue: 'bg-blue-50',
                  green: 'bg-green-50',
                  purple: 'bg-purple-50',
                  indigo: 'bg-indigo-50',
                  teal: 'bg-teal-50',
                  gray: 'bg-gray-50'
                }[groupColor] || 'bg-gray-50';
                
                const textColor = {
                  blue: 'text-blue-700',
                  green: 'text-green-700',
                  purple: 'text-purple-700',
                  indigo: 'text-indigo-700',
                  teal: 'text-teal-700',
                  gray: 'text-gray-700'
                }[groupColor] || 'text-gray-700';
                
                // Get priority based on capability gap
                const priority = getPriorityForCapability(card.learningPath);
                
                return (
                  <button
                    key={card.id}
                    onClick={() => handleStrategicFocusClick(card)}
                    className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-150 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <PriorityBadge priority={priority} />
                      <span className={`text-xs font-medium px-2 py-1 rounded ${bgColor} ${textColor}`}>
                        {card.learningPath}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {card.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningCoachPage;
