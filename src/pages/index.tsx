import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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

      {/* Digital Executive Advisor Header */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Digital Executive Advisor</h1>
            <p className="text-sm text-blue-200">Strategic Learning Platform</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="font-medium">John Director</div>
              <div className="text-sm text-blue-200">Chief Digital Officer</div>
            </div>
            <div className="bg-blue-700 rounded-full p-1">
              <UserCircleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-1 flex justify-center">
          <div className="flex justify-between items-center w-full max-w-2xl">
            <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-800">
              <AcademicCapIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Learning Coach</span>
            </button>
            
            <button className="flex flex-col items-center p-2 text-blue-600 border-b-2 border-blue-600">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Assistant</span>
            </button>
            
            <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-800">
              <RssIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Daily Feed</span>
            </button>
            
            <button className="flex flex-col items-center p-2 text-gray-500 hover:text-gray-800">
              <ChartBarIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Skill Tracker</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* No need for additional title since we have the header */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          {/* Adjusted spacing by reducing margin */}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-lg border border-gray-100 p-6"> {/* Added padding to card */}
            <div className="mb-10">
              {/* Removed 'Choose a Learning Mode:' heading to match image */}
              <div className="flex justify-center bg-slate-100 p-1.5 rounded-xl shadow-sm">
                {learningModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      // Set the mode first
                      handleModeChange(mode.id);
                      // Log the click
                      console.log('Mode tab clicked:', mode.id, 'with path:', mode.path);
                    }}
                    className={`flex items-center justify-center flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-slate-100 mx-0.5
                      ${currentLearningMode === mode.id
                        ? 'bg-white text-slate-700 shadow-md'
                        : 'bg-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-200/70'
                      }
                    `}
                  >
                    <mode.icon className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Removed 'Enter a Topic for...' heading */}
            <TopicInput onTopicSubmit={handleTopicSubmit} />

            {/* Today's Strategic Focus Section */}
            <div className="mt-8"> {/* Adjusted top margin for inside the card */}
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700"> {/* Slightly smaller heading */}
                Today's Strategic Focus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Smaller gap */}
                {strategicFocusTopics.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleStrategicFocusClick(card)}
                    className="bg-slate-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    // Simplified card styling for nesting
                  >
                    <div>
                      <div className="flex items-center mb-2">
                        <card.icon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                      </div>
                      <p className="text-gray-600 text-xs">{card.description}</p> {/* Smaller description text */}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Home;
