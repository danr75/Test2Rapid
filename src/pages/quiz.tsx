import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import QuestionCard from '@/components/Quiz/QuestionCard';
import { MindMapNode, MindMapLink } from '@/components/MindMap/MindMap';
import MindMap from '@/components/MindMap/MindMap'; // Default import
import FeedbackModal from '@/components/Quiz/FeedbackModal';
import CompletionModal from '@/components/Quiz/CompletionModal';
import { useLearning } from '@/store/LearningContext';
import questionGenerator from '@/services/ai/questionGenerator';
import topicGenerator from '@/services/ai/topicGenerator';

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
    setIsCorrect(option.isCorrect);
    setSelectedOption(option.id);
    
    if (currentQuestion) {
      setExplanation(currentQuestion.explanation);
      
      // Find the correct answer text to display in feedback
      const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
      if (correctOption) {
        setCorrectAnswer(correctOption.text);
      }
    }
    
    // If the answer is correct, add a node to the mind map, increment correct answers count, and mark question as completed
    if (option.isCorrect && currentQuestion) {
      setCorrectAnswersCount(prev => prev + 1);
      
      // Mark this question as completed
      if (!completedQuestions.includes(state.currentQuestionIndex)) {
        setCompletedQuestions(prev => [...prev, state.currentQuestionIndex]);
      }
      
      // Make sure we have a central node first
      const centralNodeExists = state.nodes.some(node => node.id === 'central');
      
      if (!centralNodeExists) {
        const centralNode = {
          id: 'central',
          label: themeStages[0].main, // Use initial theme stage
          type: 'central' as const, // Ensure the main topic node is of type 'central'
          group: 0
        };
        dispatch({ type: 'ADD_NODE', payload: centralNode });
      }
      
      // Add the question node
      const newNode = {
        id: currentQuestion.id,
        label: currentQuestion.text.length > 30 
          ? currentQuestion.text.substring(0, 27) + '...'
          : currentQuestion.text,
        type: 'question' as const
      };
      
      dispatch({ type: 'ADD_NODE', payload: newNode });
      
      const link = {
        source: 'central',
        target: newNode.id,
      };
      dispatch({ type: 'ADD_LINK', payload: link });
    }
    
    setShowFeedback(true);
  };
  
  // Handle continue button click
  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedOption(null); // Reset selected option for the next question

    if (isCorrect) { // Only advance and update theme if the answer was correct
      // Determine if theme stage should change BEFORE incrementing currentQuestionIndex
      // Based on the question index that was just correctly answered
      const nextQuestionAbsoluteIndex = state.currentQuestionIndex + 1; // e.g., if q0 was correct, next is q1
      const newStageIndex = Math.min(Math.floor(nextQuestionAbsoluteIndex / 3), themeStages.length - 1);
      
      if (newStageIndex !== currentThemeStageIndex) {
        setCurrentThemeStageIndex(newStageIndex);
        if (themeStages[newStageIndex]) { // Ensure stage exists
          dispatch({ 
            type: 'UPDATE_NODE', 
            payload: { id: 'central', newLabel: themeStages[newStageIndex].main } 
          });
        }
      }

      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: state.currentQuestionIndex + 1 });
      } else {
        setShowCompletion(true); // All questions answered correctly
      }
    } else {
      // If incorrect, user stays on the same question, no index change needed.
      // Modal is closed, they can try again.
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
            New Topic
          </button>
        </div>
        
        <div className={`grid grid-cols-1 ${expandedMindMap ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6 relative`}>
          {!expandedMindMap && (
            <div className="lg:col-span-2">
              <QuestionCard
                question={currentQuestion.text}
                options={currentQuestion.options}
                onAnswerSelected={handleAnswerSelected}
                questionNumber={state.currentQuestionIndex + 1}
                totalQuestions={state.questions.length}
                completedQuestions={completedQuestions}
              />
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
                centralTopic={dynamicCentralTopic || themeStages[currentThemeStageIndex]?.main || state.topic} 
                subThemeTitles={dynamicSubThemes || themeStages[currentThemeStageIndex]?.sub || []} 
                onTopicClick={handleTopicClick}
                onSubThemeSelect={handleSubThemeSelect}
              />
            </div>
          </div>
          
          {/* Removed the bottom-right return button */}
        </div>
      </main>
      
      {showFeedback && (
        <FeedbackModal
          isCorrect={isCorrect}
          explanation={explanation}
          onContinue={handleContinue}
          correctAnswer={!isCorrect ? correctAnswer : undefined}
        />
      )}
      
      {showCompletion && (
        <CompletionModal
          topic={state.topic}
          correctAnswers={correctAnswersCount}
          totalQuestions={state.questions.length}
          onStartNew={handleStartNewTopic}
          onReview={handleReviewMindMap}
        />
      )}
    </div>
  );
};

export default QuizPage;
