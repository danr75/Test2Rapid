import React, { useEffect } from 'react';

interface FeedbackModalProps {
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
  correctAnswer?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isCorrect,
  explanation,
  onContinue,
  correctAnswer,
}) => {
  // Add animation effect when modal appears
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onContinue();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onContinue]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fadeIn">
      <div 
        className={`card max-w-md w-full shadow-2xl transform transition-all duration-300 animate-scaleIn
          ${isCorrect ? 'border-t-8 border-secondary' : 'border-t-8 border-error'}`}
      >
        <div className="text-center mb-6">
          {isCorrect ? (
            <>
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto -mt-14 shadow-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mt-4 text-secondary">Correct!</h3>
              <p className="text-green-600 text-sm mt-1">+1 node added to your mind map</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-error mx-auto -mt-14 shadow-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mt-4 text-error">Not quite</h3>
              {correctAnswer && (
                <p className="text-gray-600 text-sm mt-1">The correct answer was: {correctAnswer}</p>
              )}
            </>
          )}
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
          <h4 className="font-medium mb-2 text-gray-700">Learning Point:</h4>
          <p className="text-gray-700">{explanation}</p>
        </div>
        
        <button 
          onClick={onContinue} 
          className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${isCorrect ? 'bg-secondary hover:bg-green-600' : 'bg-primary hover:bg-indigo-700'}`}
        >
          {isCorrect ? 'Next Question' : 'Try Again'}
          <span className="ml-2 text-xs opacity-75">(or press Enter)</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
