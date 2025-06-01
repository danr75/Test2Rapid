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
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onAnswerSelected,
  questionNumber,
  totalQuestions,
  completedQuestions = [],
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
