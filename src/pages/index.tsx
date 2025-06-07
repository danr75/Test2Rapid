import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TopicInput from '@/components/UI/TopicInput';
import { useLearning } from '@/store/LearningContext';
import { useRouter } from 'next/router';
import { ChatBubbleOvalLeftEllipsisIcon, DocumentTextIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';

type LearningMode = 'Q&A' | 'Scenario'; // Add more as needed

const learningModes: { id: LearningMode; label: string; path: string; icon: React.ElementType }[] = [
  { id: 'Q&A', label: 'Q&A Mode', path: '/qa-learn', icon: ChatBubbleOvalLeftEllipsisIcon },
  { id: 'Scenario', label: 'Scenario Mode', path: '/scenario-learn', icon: DocumentTextIcon },
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
      dispatch({ type: 'SET_LEARNING_MODE', payload: 'Q&A' }); // Default to Q&A
    }
  }, [state.learningMode, dispatch]); // Only re-run if these change

  const handleModeChange = (newMode: LearningMode) => {
    dispatch({ type: 'SET_LEARNING_MODE', payload: newMode });
  };

  const handleStartQueuedTopic = (topic: string) => {
    // When starting a queued topic, we should probably decide which mode it defaults to,
    // or if the original mode it was queued from is stored.
    // For now, let's assume queued topics always go to Q&A mode.
    dispatch({ type: 'START_QUEUED_TOPIC', payload: topic });
    router.push('/qa-learn'); // Direct to Q&A for queued topics for now
  };

  const handleTopicSubmit = (topic: string) => {
    // currentLearningMode is derived from state: state.learningMode || 'Q&A'
    // Ensure the learning mode is explicitly set in the context before navigating
    dispatch({ type: 'SET_LEARNING_MODE', payload: currentLearningMode });
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: topic }); // Clears old questions
    
    const modeDetails = learningModes.find(m => m.id === currentLearningMode);
    if (modeDetails) {
      router.push(modeDetails.path);
    } else {
      // Fallback logic, though currentLearningMode should always be valid
      router.push(currentLearningMode === 'Q&A' ? '/qa-learn' : '/scenario-learn');
    }
  };

  const oldHandleStartQueuedTopic = (topic: string) => {
    dispatch({ type: 'START_QUEUED_TOPIC', payload: topic });
    router.push('/quiz'); // This function is now oldHandleStartQueuedTopic, will be removed or updated if needed
  };

  const handleStrategicFocusClick = (card: StrategicFocusCardData) => {
    // currentLearningMode is already derived from state: state.learningMode || 'Q&A'
    const targetModeDetails = learningModes.find(m => m.id === currentLearningMode);
    const targetPath = targetModeDetails ? targetModeDetails.path : (currentLearningMode === 'Q&A' ? '/qa-learn' : '/scenario-learn');

    dispatch({ type: 'SET_LEARNING_MODE', payload: currentLearningMode });
    dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: card.topicToSet }); // Clears old questions
    router.push(targetPath);
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Interactive Learning Hub</title>
        <meta name="description" content="AI-powered learning with mind maps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Interactive Learning Hub
          </h1>
          {/* Removed AI-generated text as requested */}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-lg border border-gray-100 p-6"> {/* Added padding to card */}
            <div className="mb-10">
              {/* Removed 'Choose a Learning Mode:' heading to match image */}
              <div className="flex justify-center bg-slate-100 p-1.5 rounded-xl shadow-sm">
                {learningModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
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
