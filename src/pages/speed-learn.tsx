import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TrophyIcon } from '@heroicons/react/24/solid';

interface SpeedQuestion {
  id: string;
  text: string;
  isCorrect: boolean; // Will be randomly assigned for demo purposes
}

const SpeedLearnPage: React.FC = () => {
  const router = useRouter();
  const { state } = useLearning();
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{visible: boolean, correct: boolean, message: string} | null>(null);
  const [timerReset, setTimerReset] = useState<boolean>(false); // Track when timer is reset
  
  // Generate sample questions based on the topic
  useEffect(() => {
    if (state.topic) {
      setIsLoading(true);
      // In a real app, you'd fetch these from an API
      // For now, we'll generate placeholder questions
      const sampleQuestions: SpeedQuestion[] = [
        { 
          id: '1', 
          text: `Is ${state.topic} considered a modern approach?`, 
          isCorrect: Math.random() > 0.5 
        },
        { 
          id: '2', 
          text: `Does ${state.topic} involve machine learning concepts?`, 
          isCorrect: Math.random() > 0.5 
        },
        { 
          id: '3', 
          text: `Are traditional methods better than ${state.topic}?`, 
          isCorrect: Math.random() > 0.5 
        },
        { 
          id: '4', 
          text: `Should businesses adopt ${state.topic} techniques?`, 
          isCorrect: Math.random() > 0.5 
        },
        { 
          id: '5', 
          text: `Is there significant research supporting ${state.topic}?`, 
          isCorrect: Math.random() > 0.5 
        },
      ];
      
      setQuestions(sampleQuestions);
      setIsLoading(false);
      setTimeLeft(30); // Reset timer
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameOver(false);
      setFeedback(null); // Reset any feedback when topic changes
    } else {
      // No topic set, redirect back to home
      router.push('/');
    }
  }, [state.topic, router]);
  
  // Handle the timer reset flag
  useEffect(() => {
    if (timerReset) {
      const resetTimeout = setTimeout(() => {
        setTimerReset(false);
      }, 50);
      return () => clearTimeout(resetTimeout);
    }
  }, [timerReset]);

  // Handle the countdown timer - separate from the reset effect
  useEffect(() => {
    // Don't start timer if loading or game is over
    if (isLoading || gameOver) return;
    
    console.log('Setting up timer'); // Debug log
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      console.log('Clearing timer'); // Debug log
      clearInterval(timer);
    };
  }, [isLoading, gameOver, currentQuestionIndex]); // Add currentQuestionIndex to dependencies to ensure timer restarts
  
  // Handle user's answer selection
  const handleAnswer = useCallback((userAnsweredCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || gameOver) return;
    
    // Check if user's answer matches the question's correct value
    const isAnswerCorrect = userAnsweredCorrect === currentQuestion.isCorrect;
    
    // Set feedback message
    setFeedback({
      visible: true,
      correct: isAnswerCorrect,
      message: isAnswerCorrect ? 'Correct!' : 'Wrong!'
    });
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Set a timeout to move to the next question after showing feedback
    setTimeout(() => {
      // Move to next question or end game
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setFeedback(null);
      } else {
        setGameOver(true);
      }
    }, 400); // Wait 400ms to show feedback before advancing
  }, [currentQuestionIndex, questions, gameOver]);
  
  // Handle game restart
  const handleRestart = () => {
    setTimerReset(true); // Flag that timer is being reset for visual purposes
    setTimeLeft(30);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setFeedback(null); // Clear any feedback that might be showing
  };
  
  // Handle return to home
  const handleReturnHome = () => {
    router.push('/');
  };
  
  return (
    <>
      <Head>
        <title>Speed Mode - {state.topic}</title>
        <meta name="description" content={`Speed test on ${state.topic}`} />
      </Head>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <main className="container max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {!gameOver && (
            <div className="mb-6">
              {/* Header with timer and score on the same line */}
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold">
                  {`00:${timeLeft.toString().padStart(2, '0')}`}
                </div>
                
                {/* Score display - right-aligned */}
                <div className="text-lg">
                  Score: <span className="font-bold">{score}</span>
                </div>
              </div>
              
              {/* Timer progress bar */}
              <div className="w-full">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-primary ${timerReset ? '' : 'transition-all duration-1000 ease-linear'}`}
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-lg">Loading questions...</p>
            </div>
          ) : gameOver ? (
            <div className="text-center py-8 px-4 flex flex-col items-center">
              {/* Hide timer and score display */}
              {/* Trophy icon */}
              <div className="w-16 h-16 text-yellow-400 mb-4">
                <TrophyIcon />
              </div>
              
              {/* Result heading */}
              <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
              <p className="text-gray-500 mb-6">Here's how you performed</p>
              
              {/* Large score display */}
              <div className="text-7xl font-bold text-indigo-500 mb-2">
                {score}
              </div>
              <p className="text-gray-500 mb-4">Points Scored</p>
              
              {/* Encouragement message */}
              <p className="text-2xl text-purple-500 font-bold mb-6">Keep Practicing! <span className="text-yellow-400">💪</span></p>
              
              {/* Stats boxes */}
              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500">Accuracy</p>
                  <p className="text-xl font-bold">
                    {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500">Questions</p>
                  <p className="text-xl font-bold">{questions.length}</p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-8">
                {/* Play Again button with primary app color */}
                <button
                  onClick={handleRestart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Play Again
                </button>
                
                {/* Hub button */}
                <button
                  onClick={handleReturnHome}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Hub
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-[200px] flex flex-col justify-between relative">
              {/* Feedback overlay when visible */}
              {feedback && feedback.visible && (
                <div className={`absolute inset-0 flex items-center justify-center bg-opacity-70 rounded-lg transition-all duration-300 ${
                  feedback.correct ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <div className={`text-4xl font-bold transform scale-150 animate-pulse ${
                    feedback.correct ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {feedback.message}
                  </div>
                </div>
              )}
              
              {/* Question display */}
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-2">Question {currentQuestionIndex + 1}:</h2>
                <p className="text-lg">{questions[currentQuestionIndex]?.text}</p>
              </div>
              
              {/* Answer buttons - disabled while showing feedback */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={feedback?.visible}
                  className={`flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg transition-colors ${
                    feedback?.visible ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                  }`}
                >
                  <CheckIcon className="h-6 w-6 mr-2" />
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  disabled={feedback?.visible}
                  className={`flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg transition-colors ${
                    feedback?.visible ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                  }`}
                >
                  <XMarkIcon className="h-6 w-6 mr-2" />
                  No
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SpeedLearnPage;
