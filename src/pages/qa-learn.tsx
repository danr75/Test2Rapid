import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import QuestionCard from '@/components/Quiz/QuestionCard';
import ChatPrompt from '@/components/Chat/ChatPrompt';
import { useLearning } from '@/store/LearningContext';
import questionGenerator from '@/services/ai/questionGenerator';

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
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [currentThemeStageIndex, setCurrentThemeStageIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [savedToToolkit, setSavedToToolkit] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  
  // Ref for auto-progression timer
  const autoProgressTimerRef = useRef<number | null>(null);
  
  // Load questions when component mounts or when topic changes
  useEffect(() => {
    const loadQuestions = async () => {
      // Check for a selected topic in localStorage first
      const selectedTopic = localStorage.getItem('selectedTopic');
      
      if (selectedTopic && !state.topic) {
        // Set the topic from localStorage if we don't have one in state
        dispatch({ type: 'SET_TOPIC', payload: selectedTopic });
        // Clear the stored topic so it doesn't persist after navigation
        localStorage.removeItem('selectedTopic');
      } else if (!state.topic) {
        // No topic in state or localStorage, redirect to home
        router.push('/');
        return;
      }
      
      // Only load questions if we don't have any yet
      if (state.questions.length === 0) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const questions = await questionGenerator.generateQuestions(state.topic);
          dispatch({ type: 'SET_QUESTIONS', payload: questions });
        } catch (error) {
          console.error('Error loading questions:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load questions. Please try again.' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };
    
    loadQuestions();
  }, [state.topic, dispatch, router]);
  
  // Get the current question
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const completionPercentage = state.questions.length > 0 
    ? Math.round((correctAnswersCount / state.questions.length) * 100) 
    : 0;

  // Save the completed module to the toolkit
  const saveToToolkit = async () => {
    if (savedToToolkit || saveInProgress) return;
    
    setSaveInProgress(true);
    try {
      // In a real app, you would make an API call here to save to the backend
      // For now, we'll just simulate a delay and update the UI
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine capability from topic prefix
      let capability = 'Foundations & Ecosystem'; // Default
      
      if (state.topic.startsWith('Leadership:')) {
        capability = 'Leadership & Strategy';
      } else if (state.topic.startsWith('Governance:')) {
        capability = 'Governance, Policy & Risk';
      } else if (state.topic.startsWith('Workforce:')) {
        capability = 'Workforce Enablement';
      } else if (state.topic.startsWith('Data:')) {
        capability = 'Data & Tech Capable';
      }
      
      // Save to localStorage to persist across page refreshes
      const toolkitModules = JSON.parse(localStorage.getItem('toolkitModules') || '[]');
      if (!toolkitModules.some((module: any) => module.topic === state.topic)) {
        toolkitModules.push({
          topic: state.topic,
          completedAt: new Date().toISOString(),
          score: completionPercentage,
          type: 'scenario',
          capability: capability
        });
        localStorage.setItem('toolkitModules', JSON.stringify(toolkitModules));
      }
      
      setSavedToToolkit(true);
    } catch (error) {
      console.error('Error saving to toolkit:', error);
    } finally {
      setSaveInProgress(false);
    }
  };

  // Handle module completion
  const handleModuleCompletion = () => {
    setShowCompletion(true);
    // Add to completed modules in context if needed
    if (state.learnNextTopics.includes(state.topic)) {
      dispatch({ type: 'COMPLETE_QUEUED_TOPIC', payload: state.topic });
    }
  };

  // Refs for scrolling
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Handle sending a chat message
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: message, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Set loading state
    setIsChatLoading(true);
    
    try {
      // TODO: Connect to LLM API here
      // For now, just echo the message back after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add bot response
      const botResponse = {
        text: `I'll help you with: "${message}" (LLM integration coming soon)`,
        isUser: false
      };
      setChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };
  
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
    
    // Only auto-progress for correct answers
    if (option.isCorrect) {
      autoProgressTimerRef.current = window.setTimeout(() => {
        console.log('Auto-progressing to next question after correct answer');
        handleContinue();
      }, 1000);
    }
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
    
    // If we've completed all questions, show the completion message
    if (shouldShowCompletion) {
      handleModuleCompletion();
    }
  };
  
  // Handle starting a new topic
  const handleStartNewTopic = () => {
    router.push('/');
  };
  
  // Handle redoing the quiz
  const handleRedoQuiz = () => {
    // Reset quiz state
    setShowCompletion(false);
    setCorrectAnswersCount(0);
    setCompletedQuestions([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setSelectedOption(null);
    
    // Reset the quiz in the global state
    dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: 0 });
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
  
  // Helper function to render the main content
  const renderContent = () => {
    if (state.isLoading) {
      return <p className="text-center text-lg">Loading questions...</p>;
    }

    if (state.error) {
      return <p className="text-center text-lg text-red-500">Error: {state.error}</p>;
    }

    if (!currentQuestion) {
      if (state.questions.length === 0) {
        return <p className="text-center text-lg">No questions available for this topic yet. Please wait or try another topic.</p>;
      }
      return <p className="text-center text-lg">Question loaded, but current question is invalid. Index: {state.currentQuestionIndex}, Total: {state.questions.length}</p>;
    }

    return (
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

        {showFeedback && !isCorrect && (
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
            <div className="flex items-start">
              <div className="text-red-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-red-500">Tip:</span>
                <p className="text-gray-700 mt-1">
                  {explanation}
                </p>
              </div>
              <button 
                onClick={handleContinue} 
                className="ml-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap"
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  // Helper function to render completion screen
  const renderCompletionScreen = () => {
    if (!showCompletion) return null;

    return (
      <div className="card p-6 border-l-4 border-green-500 mt-6 relative">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Congratulations!</h2>
            <p className="text-gray-600 mb-4">
              You've completed the <span className="font-semibold">{state.topic}</span> module with a score of {correctAnswersCount} out of {state.questions.length}.
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="h-2 rounded-full bg-green-500" 
                style={{ width: `${Math.round((correctAnswersCount / state.questions.length) * 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRedoQuiz}
                className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Redo Quiz
              </button>
              {!savedToToolkit ? (
                <button
                  onClick={saveToToolkit}
                  disabled={saveInProgress}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saveInProgress ? 'Saving...' : 'Save to My Toolkit'}
                </button>
              ) : (
                <div className="flex items-center text-green-600 text-sm bg-green-50 px-4 py-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Saved to Toolkit</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Return to Learning Hub button positioned at bottom right */}
        <div className="absolute bottom-4 right-6">
          <button 
            onClick={() => router.push('/')} 
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
            aria-label="Return to Learning Hub"
          >
            <span className="mr-2">Return to Learning Hub</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Head>
        <title>Quiz - {state.topic} | Interactive Learning Hub</title>
        <meta name="description" content={`Test your knowledge about ${state.topic} with interactive questions`} />
      </Head>
      
      {/* Fixed Q&A Section */}
      <div className="flex-shrink-0 bg-white">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black">{state.topic}</h1>
            </div>
            <button 
              onClick={() => router.push('/')} 
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
              aria-label="Return to Learning Hub"
            >
              <svg className="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Learning Hub
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 relative">
            <div>
              {renderContent()}
              {renderCompletionScreen()}
            </div>
          </div>
        </div>
        {/* Line below questions */}
        <div className="border-t border-gray-200 max-w-4xl mx-auto w-full"></div>
      </div>
      
      {/* Scrollable Chat Section */}
      <div className="flex-1 overflow-y-auto bg-white" ref={chatContainerRef}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-blue-50 rounded-lg overflow-hidden">
            {chatMessages.map((msg: { text: string; isUser: boolean }, index: number) => (
              <div 
                key={index} 
                className={`p-4 ${msg.isUser ? 'bg-blue-100' : 'bg-blue-50'} border-b border-blue-100`}
              >
                <div className="font-medium text-sm mb-1">
                  {msg.isUser ? 'You' : 'Learning Assistant'}
                </div>
                <div className="text-gray-800">{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      
      {/* Fixed Chat Input */}
      <div className="bg-blue-50 border-t border-blue-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <ChatPrompt 
            onSendMessage={handleSendMessage} 
            isDisabled={isChatLoading || !state.topic}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
