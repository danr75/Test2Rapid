import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import QuestionCard from '@/components/Quiz/QuestionCard';
import FeedbackModal from '@/components/Quiz/FeedbackModal';
import MindMap from '@/components/MindMap/MindMap';
import { useLearning } from '@/store/LearningContext';
import questionGenerator from '@/services/ai/questionGenerator';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useLearning();
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Get the current question
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
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
    
    // If the answer is correct, add a node to the mind map
    if (option.isCorrect && currentQuestion) {
      const newNode = {
        id: currentQuestion.id,
        label: currentQuestion.text.length > 30 
          ? currentQuestion.text.substring(0, 27) + '...'
          : currentQuestion.text,
      };
      
      dispatch({ type: 'ADD_NODE', payload: newNode });
      
      // Create a link from central topic to this node
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
    setSelectedOption(null);
    
    // Move to the next question if available
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({
        type: 'SET_CURRENT_QUESTION_INDEX',
        payload: state.currentQuestionIndex + 1,
      });
    } else {
      // If all questions are answered, show a completion message
      setTimeout(() => {
        alert('Congratulations! You have completed all questions!');
      }, 500);
      // In a future task, we'll implement a proper completion screen
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
            <h1 className="text-3xl font-bold mb-1 text-primary">{state.topic}</h1>
            <p className="text-gray-600">
              Build your knowledge through interactive questions
            </p>
          </div>
          <button 
            onClick={() => router.push('/')} 
            className="mt-4 md:mt-0 text-sm flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Choose another topic
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuestionCard
              question={currentQuestion.text}
              options={currentQuestion.options}
              onAnswerSelected={handleAnswerSelected}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={state.questions.length}
            />
          </div>
          
          <div className="lg:col-span-1">
            <MindMap 
              nodes={state.nodes} 
              links={state.links} 
              centralTopic={state.topic}
            />
          </div>
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
    </div>
  );
};

export default QuizPage;
