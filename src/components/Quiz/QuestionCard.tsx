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
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onAnswerSelected,
  questionNumber,
  totalQuestions,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  
  return (
    <div className="card mb-6 border-t-4 border-primary">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-primary text-white text-sm py-1 px-3 rounded-full">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((questionNumber / totalQuestions) * 100)}% Complete
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-6">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelected(option)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full text-left p-4 border rounded-lg transition-all ${hoveredOption === option.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${hoveredOption === option.id ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                {String.fromCharCode(65 + options.indexOf(option))}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-sm text-gray-500 italic">
        Select the best answer from the options above
      </div>
    </div>
  );
};

export default QuestionCard;
