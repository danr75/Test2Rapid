import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface CompletionModalProps {
  topic: string;
  correctAnswers: number;
  totalQuestions: number;
  onStartNew: () => void;
  onReview: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  topic,
  correctAnswers,
  totalQuestions,
  onStartNew,
  onReview,
}) => {
  const router = useRouter();
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStartNew();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStartNew]);
  
  // Calculate completion percentage
  const completionPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fadeIn">
      <div className="card max-w-md w-full shadow-2xl transform transition-all duration-300 animate-scaleIn border-t-8 border-secondary">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto -mt-16 shadow-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mt-4">Congratulations!</h2>
          <p className="text-gray-600 mt-2">
            You've completed all questions about <span className="font-semibold">{topic}</span>
          </p>
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Your score:</span>
            <span className="text-secondary font-bold">{correctAnswers}/{totalQuestions}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-secondary h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">
            {completionPercentage >= 80 ? 'Excellent work! You have a strong understanding of this topic.' :
             completionPercentage >= 60 ? 'Good job! You have a solid grasp of the basics.' :
             'Keep learning! Review your mind map to reinforce these concepts.'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onReview} 
            className="py-3 rounded-md font-semibold text-primary border border-primary hover:bg-blue-50 transition-colors"
          >
            Review Mind Map
          </button>
          <button 
            onClick={onStartNew} 
            className="py-3 rounded-md font-semibold text-white bg-primary hover:bg-indigo-600 transition-colors"
          >
            New Topic
            <span className="ml-1 text-xs opacity-75">(Enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
