import React, { useState } from 'react';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  onAnswerSelected: (option: Option) => void;
  questionNumber: number;
  totalQuestions: number;
  completedQuestions?: number[];
  selectedOptionId?: string | null;
  showFeedback?: boolean;
  isCorrect?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onAnswerSelected,
  questionNumber,
  totalQuestions,
  completedQuestions = [],
  selectedOptionId = null,
  showFeedback = false,
  isCorrect = false,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  
  return (
    <div className="card mb-6 border-t-4 border-primary">
      <div className="mb-4">
        <div className="w-full flex gap-1 h-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-full transition-all duration-300 ease-in-out ${completedQuestions.includes(i) ? 'bg-secondary' : i === questionNumber - 1 ? 'bg-primary' : 'bg-gray-200'}`}
            ></div>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-6 text-black">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelected(option)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            disabled={showFeedback}
            className={`w-full text-left p-4 border rounded-lg transition-all 
              ${showFeedback && option.isCorrect ? 'bg-green-500 border-green-600 text-white ring-2 ring-green-400 ring-offset-2' : 
                showFeedback && selectedOptionId === option.id ? 'bg-red-500 border-red-600 text-white ring-2 ring-red-400 ring-offset-2' : 
                hoveredOption === option.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center 
                  ${showFeedback && (selectedOptionId === option.id || option.isCorrect) ? 'bg-white text-gray-800' : 
                    hoveredOption === option.id ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  {String.fromCharCode(65 + options.indexOf(option))}
                </div>
                <span>{option.text}</span>
              </div>
              {showFeedback && (option.isCorrect || selectedOptionId === option.id) && (
                option.isCorrect ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Instruction text removed as requested */}
    </div>
  );
};

export default QuestionCard;
