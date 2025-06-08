import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import QuestionCard from '@/components/Quiz/QuestionCard';
import { MindMapNode, MindMapLink } from '@/components/MindMap/MindMap';
import MindMap from '@/components/MindMap/MindMap'; // Default import
import CompletionModal from '@/components/Quiz/CompletionModal';
import { useLearning } from '@/store/LearningContext';
import questionGenerator from '@/services/ai/questionGenerator';
import topicGenerator from '@/services/ai/topicGenerator';
import LearnNowNextModal from '@/components/Quiz/LearnNowNextModal';

const themeStages = [
  { main: "AI Fundamentals", sub: ["Defining AI", "History of AI", "Types of AI"] }, // Questions 1-3
  { main: "Machine Learning Core", sub: ["Supervised Learning", "Unsupervised Learning", "Key Algorithms"] }, // Questions 4-6
  { main: "Deep Learning Explained", sub: ["Neural Networks", "Backpropagation", "Architectures"] }, // Questions 7-9
  { main: "AI's Real-World Impact", sub: ["Applications", "Ethics", "Future Outlook"] } // Question 10
];

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useLearning();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [expandedMindMap, setExpandedMindMap] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [currentThemeStageIndex, setCurrentThemeStageIndex] = useState(0);
  const [dynamicCentralTopic, setDynamicCentralTopic] = useState<string | null>(null);
  const [dynamicSubThemes, setDynamicSubThemes] = useState<string[] | null>(null);
  const [isGeneratingSubthemes, setIsGeneratingSubthemes] = useState(false);
  const [isLearnNowNextModalOpen, setIsLearnNowNextModalOpen] = useState(false);
  const [selectedModalTopic, setSelectedModalTopic] = useState<string>('');
  
  // Ref for auto-progression timer
  const autoProgressTimerRef = useRef<number | null>(null);
  
  // Get the current question
  const currentQuestion = state.questions[state.currentQuestionIndex];

  // Prepare nodes for MindMap, ensuring type compatibility
  const nodesForMindMap = state.nodes.map(node => {
    let finalType: 'central' | 'subtopic' | 'topic' | 'question';

    if (node.id === 'central') {
      finalType = 'central';
    } else if (node.type === 'subtopic') {
      finalType = 'subtopic';
    } else if (node.type === 'question') {
      finalType = 'question';
    } else {
      // Default to 'topic' if type is undefined, null, or any other value from context
      // This also covers the case where node.type is already 'topic'
      finalType = 'topic';
    }

    return {
      ...node, // Spread original node properties. This is important to keep other potential fields like x, y, fx, fy if they exist from d3 updates.
      id: node.id,
      label: node.label,
      group: node.group ?? 0, // MindMapNode expects group: number; LearningContext Node has group?: number
      type: finalType,
    };
  }) as MindMapNode[]; // Assert that the result of the map is MindMapNode[]
  
  // Handle case when there's no topic or questions
  useEffect(() => {
    if (!state.topic) {
      router.push('/');
      return;
    }
    
    // If there are no questions, generate them
    if (state.questions.length === 0) {
      const loadQuestions = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const questions = await questionGenerator.generateQuestions(state.topic);
          dispatch({ type: 'SET_QUESTIONS', payload: questions });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load questions' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      };
      
      loadQuestions();
    }
  }, [state.topic, state.questions.length, dispatch, router]);
  
  // Handle answer selection
  const handleAnswerSelected = (option: { id: string; text: string; isCorrect: boolean }) => {
    // Set states immediately
    setIsCorrect(option.isCorrect);
    setSelectedOption(option.id);
    setShowFeedback(true);
    
    // Save the current question before any state updates
    const questionBeingAnswered = currentQuestion;
    
    if (questionBeingAnswered) {
      setExplanation(questionBeingAnswered.explanation);
      
      // Find the correct answer text to display in feedback
      const correctOption = questionBeingAnswered.options.find(opt => opt.isCorrect);
      if (correctOption) {
        setCorrectAnswer(correctOption.text);
      }
    
      // Mark this question as completed right away
      if (!completedQuestions.includes(state.currentQuestionIndex)) {
        setCompletedQuestions(prev => [...prev, state.currentQuestionIndex]);
      }
      
      // Update correct answers count if needed
      if (option.isCorrect) {
        setCorrectAnswersCount(prev => prev + 1);
      }
      
      // Always make sure we have a central node first
      const centralNodeExists = state.nodes.some(node => node.id === 'central');
      
      if (!centralNodeExists) {
        const centralNode = {
          id: 'central',
          label: themeStages[0].main,
          type: 'central' as const,
          group: 0
        };
        dispatch({ type: 'ADD_NODE', payload: centralNode });
      }
      
      // Always add the question node to the mind map for both correct and incorrect answers
      const newNode = {
        id: questionBeingAnswered.id,
        label: questionBeingAnswered.text.length > 30 
          ? questionBeingAnswered.text.substring(0, 27) + '...'
          : questionBeingAnswered.text,
        type: 'question' as const,
        status: option.isCorrect ? 'correct' : 'incorrect' // Add status to show green/red in mind map
      };
      
      dispatch({ type: 'ADD_NODE', payload: newNode });
      
      const link = {
        source: 'central',
        target: newNode.id,
      };
      dispatch({ type: 'ADD_LINK', payload: link });
    }
    
    // Clear any existing timers before setting new ones
    if (autoProgressTimerRef.current) {
      clearTimeout(autoProgressTimerRef.current);
      autoProgressTimerRef.current = null;
    }
    
    // Set auto-progress timers with different delays based on correctness
    // Correct: 1 second, Incorrect: 3 seconds
    const delay = option.isCorrect ? 1000 : 3000;
    autoProgressTimerRef.current = window.setTimeout(() => {
      console.log(`Auto-progressing to next question after ${option.isCorrect ? 'correct' : 'incorrect'} answer (${delay/1000}s delay)`);
      handleContinue();
    }, delay);
  };
  
  // Handle continue button click
  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedOption(null); // Reset selected option for the next question

    // Track if we've completed all questions to show completion screen
    let shouldShowCompletion = false;
    
    // If this was the last question, show completion
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      // All questions for the current topic are completed
      // Check if this topic was in the 'Learn Next' queue and remove it if correct answer
      if (isCorrect && state.learnNextTopics.includes(state.topic)) {
        dispatch({ type: 'COMPLETE_QUEUED_TOPIC', payload: state.topic });
      }
      shouldShowCompletion = true;
    } else {
      // Always progress to the next question, regardless of correct/incorrect answer
      dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: state.currentQuestionIndex + 1 });
      
      // If correct answer, update theme stage if needed
      if (isCorrect) {
        // Determine if theme stage should change after incrementing currentQuestionIndex
        const nextQuestionIndex = state.currentQuestionIndex + 1;
        const newStageIndex = Math.min(Math.floor(nextQuestionIndex / 3), themeStages.length - 1);
        
        if (newStageIndex !== currentThemeStageIndex) {
          setCurrentThemeStageIndex(newStageIndex);
          if (themeStages[newStageIndex]) { // Ensure stage exists
            dispatch({ 
              type: 'UPDATE_NODE', 
              payload: { id: 'central', newLabel: themeStages[newStageIndex].main } 
            });
          }
        }
      }
    }
    
    // If we've completed all questions, show the completion modal
    if (shouldShowCompletion) {
      setShowCompletion(true);
    }
  };
  
  // Handle starting a new topic
  const handleStartNewTopic = () => {
    setShowCompletion(false);
    router.push('/');
  };
  
  // Handle reviewing the mind map (just closes the modal to see the mind map)
  const handleReviewMindMap = () => {
    setShowCompletion(false);
  };
  
  const handleCentralNodeActionRequested = (topicLabel: string) => {
    setSelectedModalTopic(topicLabel);
    setIsLearnNowNextModalOpen(true);
  };

  const handleLearnNow = () => {
    if (selectedModalTopic) {
      dispatch({ type: 'SET_TOPIC_FOR_LEARNING', payload: selectedModalTopic });
      setDynamicCentralTopic(null); 
      setDynamicSubThemes(null);
      setCurrentThemeStageIndex(0); 
      // Reset other relevant local state if necessary
      setCompletedQuestions([]);
      setCorrectAnswersCount(0);
      setExpandedMindMap(false); // Collapse mind map view
    }
    setIsLearnNowNextModalOpen(false);
    setSelectedModalTopic('');
  };

  const handleLearnNext = () => {
    if (selectedModalTopic) {
      dispatch({ type: 'ADD_TO_LEARN_NEXT', payload: selectedModalTopic });
      // console.log(`${selectedModalTopic} added to 'Learn Next' queue.`);
    }
    setIsLearnNowNextModalOpen(false);
    setSelectedModalTopic('');
  };

  const handleCloseLearnNowNextModal = () => {
    setIsLearnNowNextModalOpen(false);
    setSelectedModalTopic('');
  };

  // Handle subtheme selection in the mind map
  const handleSubThemeSelect = async (subThemeLabel: string) => {
    setDynamicCentralTopic(subThemeLabel);
    setIsGeneratingSubthemes(true);
    setDynamicSubThemes([]); // Clear or show loading indicator

    try {
      const rawGeneratedThemes = await topicGenerator.generateRelatedTopics(subThemeLabel);

      // Map to 5-word limit
      let processedThemes = rawGeneratedThemes.map(theme => theme.split(' ').slice(0, 5).join(' '));

      // Ensure exactly 3 themes, padding if necessary
      let finalSubThemes: string[] = [];

      if (processedThemes.length >= 3) {
        finalSubThemes = processedThemes.slice(0, 3);
      } else {
        finalSubThemes = [...processedThemes]; // Start with what we have
        // Add placeholders until we have 3. Ensure placeholders are unique enough.
        for (let i = finalSubThemes.length; i < 3; i++) {
          let placeholderBase = `${subThemeLabel} - Sub ${i + 1}`;
          // Simple check to avoid duplicate placeholders if subThemeLabel itself is very similar
          if (finalSubThemes.some(t => t.startsWith(subThemeLabel + " - Sub"))) {
             placeholderBase = `${subThemeLabel} - More Sub ${i + 1 + finalSubThemes.length}`;
          }
          finalSubThemes.push(placeholderBase.split(' ').slice(0, 5).join(' '));
        }
      }
      setDynamicSubThemes(finalSubThemes);
      dispatch({ type: 'UPDATE_NODE', payload: { id: 'central', newLabel: subThemeLabel } });
    } catch (error) {
      console.error("Failed to generate subthemes:", error);
      const errorPlaceholders = [
        `${subThemeLabel} - Error Sub 1`,
        `${subThemeLabel} - Error Sub 2`,
        `${subThemeLabel} - Error Sub 3`
      ].map(theme => theme.split(' ').slice(0, 5).join(' '));
      setDynamicSubThemes(errorPlaceholders);
      // Optionally, dispatch an error to the state or show a toast notification
    } finally {
      setIsGeneratingSubthemes(false);
    }
    
    // If you want to signify that quiz progression is paused or altered by this dynamic exploration:
    // setCurrentThemeStageIndex(-1); // Or manage a separate state for 'exploration mode'
  };

  // Handle topic click in the mind map
  const handleTopicClick = async (topicId: string, topicLabel: string) => {
    console.log(`Topic clicked: ${topicLabel} (${topicId})`);
    
    try {
      // Show loading state
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // If this is a subtopic, make it the new central topic
      if (topicId !== 'central') {
        // Clear existing nodes and links
        dispatch({ type: 'CLEAR_MIND_MAP' });
        
        // Set this as the new central topic
        dispatch({ type: 'SET_TOPIC', payload: topicLabel });
        
        // Create a new central node
        const centralNode = {
          id: 'central',
          label: topicLabel,
          type: 'topic' as const,
          group: 0
        };
        
        dispatch({ type: 'ADD_NODE', payload: centralNode });
      }
      
      // Generate related subtopics using AI
      const relatedTopics = await topicGenerator.generateRelatedTopics(topicLabel);
      console.log('Generated related topics:', relatedTopics);
      
      // Create subtopic nodes (limit to 2 as requested)
      const limitedTopics = relatedTopics.slice(0, 2);
      const subtopicNodes = limitedTopics.map((topic, index) => ({
        id: `${topicId === 'central' ? 'central' : 'new-central'}-subtopic-${index}`,
        label: topic,
        type: 'subtopic' as const,
        parentId: 'central'
      }));
      
      // Add subtopics to the mind map
      dispatch({ 
        type: 'ADD_SUBTOPICS', 
        payload: { 
          parentId: 'central', 
          subtopics: subtopicNodes 
        } 
      });
    } catch (error) {
      console.error('Error generating related topics:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate related topics' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Loading questions about <span className="font-semibold">{state.topic}</span>...</p>
        </div>
      </div>
    );
  }
  
  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md mx-auto card border-l-4 border-error">
          <svg className="w-12 h-12 text-error mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl text-error font-semibold mb-2">Error</p>
          <p className="text-gray-600">{state.error}</p>
          <button 
            onClick={() => router.push('/')} 
            className="mt-6 btn-primary w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md mx-auto card">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-xl mb-4">No questions available</p>
          <button 
            onClick={() => router.push('/')} 
            className="btn-primary"
          >
            Choose Another Topic
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Quiz - {state.topic} | Interactive Learning Hub</title>
        <meta name="description" content={`Test your knowledge about ${state.topic} with interactive questions`} />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">{state.topic}</h1>
          </div>
          <button 
            onClick={() => router.push('/')} 
            className="mt-4 md:mt-0 py-2 px-4 rounded-md border border-gray-200 text-sm font-medium flex items-center hover:bg-gray-50 transition-colors"
            aria-label="Return to topic selection"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Hub
          </button>
        </div>
        
        <div className={`grid grid-cols-1 ${expandedMindMap ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6 relative`}>
          {!expandedMindMap && (
            <div className="lg:col-span-2">
              {state.isLoading && <p className="text-center text-lg">Loading questions...</p>}
              {state.error && <p className="text-center text-lg text-red-500">Error: {state.error}</p>}
              {!state.isLoading && !state.error && currentQuestion && (
                <>
                  <QuestionCard
                    question={currentQuestion.text}
                    options={currentQuestion.options}
                    onAnswerSelected={handleAnswerSelected}
                    questionNumber={state.currentQuestionIndex + 1}
                    totalQuestions={state.questions.length}
                    completedQuestions={completedQuestions}
                    selectedOptionId={selectedOption}
                    showFeedback={showFeedback}
                    isCorrect={isCorrect}
                  />

                  {/* Inline Feedback - Show tip box only for incorrect answers */}
                  {showFeedback && !isCorrect && (
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
                      <div className="flex items-start">
                        <div className="text-red-500 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-red-500">Tip:</span>
                          <p className="text-gray-700 mt-1">
                            {explanation}
                          </p>
                          
                          {/* Button hidden but action happens after delay */}
                          <button 
                            onClick={handleContinue} 
                            className="hidden"
                            aria-hidden="true"
                          >
                            Next Question
                          </button>
                          
                          {/* Hidden button for accessibility */}
                          {/* No visible timer message as requested */}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Auto-progress will happen without any visible message */}
                </>
              )}
              {!state.isLoading && !state.error && !currentQuestion && state.questions.length > 0 && (
                 <p className="text-center text-lg">Question loaded, but current question is invalid. Index: {state.currentQuestionIndex}, Total: {state.questions.length}</p>
              )}
              {!state.isLoading && !state.error && !currentQuestion && state.questions.length === 0 && state.topic && (
                <p className="text-center text-lg">No questions available for this topic yet. Please wait or try another topic.</p>
              )}
            </div>
          )}
          
          <div className={expandedMindMap ? 'col-span-1' : 'lg:col-span-1'}>
            <div className="relative" id="mind-map-container" key={expandedMindMap ? 'expanded' : 'collapsed'}>
              <button 
                onClick={() => setExpandedMindMap(!expandedMindMap)}
                className="absolute top-4 right-4 z-10 p-2 bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                aria-label={expandedMindMap ? "Collapse mind map" : "Expand mind map"}
                title={expandedMindMap ? "Collapse mind map" : "Expand mind map"}
              >
                {expandedMindMap ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </button>
              <MindMap 
                nodes={nodesForMindMap} 
                links={state.links} 
                centralTopic={dynamicCentralTopic || state.topic}
                subThemeTitles={dynamicSubThemes || (currentThemeStageIndex < themeStages.length ? themeStages[currentThemeStageIndex].sub : [])}
                onTopicClick={(id, label) => console.log('Topic clicked:', id, label)} // Placeholder for other topic clicks
                onSubThemeSelect={handleSubThemeSelect}
                onCentralNodeActionRequested={handleCentralNodeActionRequested}
              />
            </div>
          </div>
          
          {/* Removed the bottom-right return button */}
        </div>
      </main>
      
      {/* Feedback is now shown inline instead of in a modal */}
      
      {showCompletion && (
        <CompletionModal
          topic={state.topic}
          correctAnswers={correctAnswersCount}
          totalQuestions={state.questions.length}
          onStartNew={handleStartNewTopic}
          onReview={handleReviewMindMap}
        />
      )}
      {isLearnNowNextModalOpen && (
        <LearnNowNextModal
          isOpen={isLearnNowNextModalOpen}
          topicName={selectedModalTopic}
          onLearnNow={handleLearnNow}
          onLearnNext={handleLearnNext}
          onClose={handleCloseLearnNowNextModal}
        />
      )}
    </div>
  );
};

export default QuizPage;
