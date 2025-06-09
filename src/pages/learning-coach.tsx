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
  AcademicCapIcon
} from '@heroicons/react/24/outline';

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

const strategicFocusTopics: StrategicFocusCardData[] = [
  {
    id: 'legacy-modern',
    title: 'Legacy vs. Modern',
    description: 'Compare traditional IT governance with modern AI-first approaches',
    icon: BookOpenIcon,
    topicToSet: 'Legacy vs. Modern IT Governance',
    learningPath: 'AI Governance',
  },
  {
    id: 'team-impact',
    title: 'Team Impact',
    description: 'How to lead technical teams through AI transformation',
    icon: UsersIcon,
    topicToSet: 'Leading Teams in AI Transformation',
    learningPath: 'Leadership',
  },
  {
    id: 'data-practices',
    title: 'Ethical Data Collection',
    description: 'Best practices for collecting and handling data ethically',
    icon: AcademicCapIcon,
    topicToSet: 'Ethical Data Collection Practices',
    learningPath: 'Data Ethics',
  },
  {
    id: 'ai-apps',
    title: 'Generative AI Tools',
    description: 'Understanding and implementing generative AI applications',
    icon: UserCircleIcon,
    topicToSet: 'Generative AI Applications',
    learningPath: 'Build AI Apps',
  }
];

const LearningCoachPage: React.FC = () => {
  const { state, dispatch } = useLearning();
  const router = useRouter();

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
    console.log('Previous learning mode was:', state.learningMode);
    
    // Set the learning mode in the context
    dispatch({ type: 'SET_LEARNING_MODE', payload: newMode });
    
    // Log after dispatching
    console.log('Learning mode dispatched to context with payload:', newMode);
    
    // After a short delay, check if mode has updated
    setTimeout(() => {
      console.log('Current learning mode after change:', state.learningMode);
    }, 100);
  };

  const handleTopicSubmit = (topic: string) => {
    // Debug output to track the current flow
    console.log('Topic submitted:', topic);
    console.log('Current learning mode is:', currentLearningMode);
    
    // Setting both the topic and mode before navigation
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: topic });
    dispatch({ type: 'SET_LEARNING_MODE', payload: currentLearningMode });
    
    // Using a more direct navigation approach to each mode
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
    // Use the currently selected learning mode instead of forcing Q&A mode
    console.log('Strategic focus clicked with mode:', currentLearningMode);
    
    // Setting both the topic and mode before navigation
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: card.topicToSet });
    dispatch({ type: 'SET_LEARNING_MODE', payload: currentLearningMode });
    
    // Using the same direct navigation approach as handleTopicSubmit
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
        <div className="max-w-4xl mx-auto">
          {/* Learning mode tabs */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex space-x-4 justify-center">
              {learningModes.map((mode) => (
                <button
                  key={mode.id}
                  className={`flex items-center px-6 py-3 rounded-full ${currentLearningMode === mode.id
                    ? 'bg-white shadow-md text-gray-700'
                    : 'bg-transparent text-gray-500 hover:bg-gray-100'
                    }`}
                  onClick={() => handleModeChange(mode.id)}
                >
                  <mode.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personalised micro-lessons Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-left text-gray-700">
              Personalised micro-lessons
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              These micro-courses cover different paths and are prioritized to advance your skills
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategicFocusTopics.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleStrategicFocusClick(card)}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <card.icon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                        <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                      </div>
                      <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded font-medium">
                        {card.learningPath}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic input as search bar */}
          <div className="mb-10">
            <div className="flex">
              <input
                type="text"
                className="flex-grow p-4 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Ask about technology strategy, architecture decisions, or emerging trends..."
                onKeyPress={(e) => e.key === 'Enter' && handleTopicSubmit((e.target as HTMLInputElement).value)}
              />
              <button
                onClick={() => {
                  const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (inputEl && inputEl.value) handleTopicSubmit(inputEl.value);
                }}
                className="bg-gray-900 text-white px-8 py-4 rounded-r-lg hover:bg-black transition-colors">
                Ask
              </button>
            </div>
          </div>
          {/* Learning pathway progress */}
          <div className="mb-10">
            <div className="text-left mb-6">
              <h2 className="text-3xl font-semibold text-gray-700">Learning pathway progress</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI Governance */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex-shrink-0 mb-5">
                    <div className="h-12 w-12 bg-blue-100 flex items-center justify-center text-blue-600 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">AI Governance</h3>
                  <p className="text-gray-600 text-sm mb-4">Learn the fundamentals of AI governance, compliance, and risk management</p>
                  
                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>2/6 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                    Learn
                  </button>
                </div>
              </div>

              {/* Data Ethics */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex-shrink-0 mb-5">
                    <div className="h-12 w-12 bg-green-100 flex items-center justify-center text-green-600 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Data Ethics</h3>
                  <p className="text-gray-600 text-sm mb-4">Understand ethical considerations in data collection, usage, and AI decision-making</p>
                  
                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>1/5 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                    Learn
                  </button>
                </div>
              </div>

              {/* Build AI Apps */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex-shrink-0 mb-5">
                    <div className="h-12 w-12 bg-purple-100 flex items-center justify-center text-purple-600 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Build AI Apps</h3>
                  <p className="text-gray-600 text-sm mb-4">Create intelligent applications using AI agents and automation frameworks</p>
                  
                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>3/7 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '43%' }}></div>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                    Learn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningCoachPage;
