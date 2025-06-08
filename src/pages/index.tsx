import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TopicInput from '@/components/UI/TopicInput';
import Header from '@/components/Layout/Header';
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
  ChatBubbleLeftRightIcon,
  RssIcon,
  ChartBarIcon
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
  // path and learningMode removed, will be determined by current selection
}

const strategicFocusTopics: StrategicFocusCardData[] = [
  {
    id: 'legacy-modern',
    title: 'Legacy vs. Modern',
    description: 'Compare traditional IT governance with modern AI-first approaches',
    icon: BookOpenIcon,
    topicToSet: 'Legacy vs. Modern IT Governance',
  },
  {
    id: 'team-impact',
    title: 'Team Impact',
    description: 'How to lead technical teams through AI transformation',
    icon: UsersIcon,
    topicToSet: 'Leading Teams in AI Transformation',
  }
];

const Home: React.FC = () => {
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

  const handleStartQueuedTopic = (topic: string) => {
    // When starting a queued topic, we should probably decide which mode it defaults to,
    // or if the original mode it was queued from is stored.
    // For now, let's assume queued topics always go to Q&A mode.
    dispatch({ type: 'START_QUEUED_TOPIC', payload: topic });
    router.push('/qa-learn'); // Direct to Q&A for queued topics for now
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

  const oldHandleStartQueuedTopic = (topic: string) => {
    dispatch({ type: 'START_QUEUED_TOPIC', payload: topic });
    router.push('/quiz'); // This function is now oldHandleStartQueuedTopic, will be removed or updated if needed
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
        <title>Digital Executive Advisor</title>
        <meta name="description" content="Strategic Learning Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header with Navigation */}
      <Header activeTab="assistant" />

      <main className="container mx-auto px-4 py-8">
        {/* Strategic Technical Assistant UI */}
        <div className="max-w-4xl mx-auto mt-4">
          {/* Assistant Header Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Strategic Technical Assistant</h2>
                <p className="text-sm text-gray-500">Get quick answers to technical questions and strategic decision support</p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium mr-3">
                AI
              </div>
              <p className="text-gray-700 font-medium">How can I help you today?</p>
            </div>

            {/* Quick Suggestion Buttons - 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
              <button className="bg-white p-3 rounded border border-gray-200 text-left hover:bg-gray-50 text-gray-700 text-sm">
                Explain microservices vs monolith trade-offs
              </button>
              <button className="bg-white p-3 rounded border border-gray-200 text-left hover:bg-gray-50 text-gray-700 text-sm">
                Compare cloud providers for data lakes
              </button>
              <button className="bg-white p-3 rounded border border-gray-200 text-left hover:bg-gray-50 text-gray-700 text-sm">
                AI model deployment strategies
              </button>
              <button className="bg-white p-3 rounded border border-gray-200 text-left hover:bg-gray-50 text-gray-700 text-sm">
                Digital transformation budget planning
              </button>
            </div>

            {/* Input Field */}
            <div className="mt-6 flex">
              <input 
                type="text" 
                placeholder="Ask about technology strategy, architecture decisions, or emerging trends..." 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r hover:bg-gray-800 font-medium">
                Ask
              </button>
            </div>
          </div>

          {/* Two-Column Layout for Recent Conversations and Quick References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Conversations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Conversations</h3>
              <div className="space-y-3">
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-800">Cloud-native architecture migration</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday, 2:30 PM</p>
                </div>
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-800">AI ethics framework implementation</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago, 4:15 PM</p>
                </div>
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-800">Data governance vs data management</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago, 10:20 AM</p>
                </div>
              </div>
            </div>

            {/* Quick References */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Quick References</h3>
              <div className="space-y-3">
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-800">Technology ROI Calculator</p>
                </div>
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-800">Team Structure Templates</p>
                </div>
                <div className="border border-gray-100 rounded p-3 hover:bg-gray-50 cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-800">Strategic Planning Framework</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
