import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface AssessmentStep {
  question: string;
  category: string;
  options: string[];
}

const assessmentSteps: AssessmentStep[] = [
  {
    question: 'How comfortable are you with JavaScript programming?',
    category: 'Programming',
    options: [
      'Never used it',
      'Basic syntax and variables',
      'Functions, loops, and objects',
      'Advanced concepts like closures and async',
      'Expert level with frameworks and optimization',
    ],
  },
  // Add more questions as needed
];

const stepTitles = ['Assessment', 'Results', 'Set Targets', 'Confirm'];

const SkillTrackerB: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // Stepper progress
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(assessmentSteps.length).fill(null)
  );

  const currentAssessment = assessmentSteps[currentQuestionIndex];

  // Progress bar calculation
  const progress = ((currentQuestionIndex + 1) / assessmentSteps.length) * 100;

  const handleOptionSelect = (optionIdx: number) => {
    const updated = [...selectedOptions];
    updated[currentQuestionIndex] = optionIdx;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentSteps.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(1); // Move to Results step (placeholder)
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <Head>
        <title>Skill Assessment Tool</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Skill Assessment Tool</h1>
      <p className="text-gray-600 text-center mb-6">
        Discover your capabilities and set your career targets
      </p>
      {/* Stepper */}
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-3xl mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepTitles.map((title, idx) => (
            <div key={title} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  idx === currentStep
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                } font-semibold`}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  idx === currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {title}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-2" />
      </div>

      {/* Assessment Card */}
      {currentStep === 0 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
          <div className="mb-2 text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {assessmentSteps.length}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded mb-4">
            <div
              className="h-2 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {currentAssessment.question}
            </h2>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded font-medium text-gray-700">
              {currentAssessment.category}
            </span>
          </div>
          <div className="space-y-3 mb-6">
            {currentAssessment.options.map((option, idx) => (
              <label
                key={option}
                className={`flex items-center border rounded px-4 py-3 cursor-pointer transition-all ${
                  selectedOptions[currentQuestionIndex] === idx
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  className="mr-3 accent-blue-500"
                  checked={selectedOptions[currentQuestionIndex] === idx}
                  onChange={() => handleOptionSelect(idx)}
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={selectedOptions[currentQuestionIndex] === null}
            >
              {currentQuestionIndex === assessmentSteps.length - 1 ? 'Next' : 'Next'}
            </button>
          </div>
        </div>
      )}
      {/* Placeholder for Results, Set Targets, Confirm steps */}
      {currentStep > 0 && (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl text-center">
          <h2 className="text-xl font-semibold mb-4">Step coming soon</h2>
          <Link href="/">
            <a className="text-blue-600 underline">Back to Home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SkillTrackerB;
