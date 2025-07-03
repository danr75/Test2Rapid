import React, { useState } from 'react';

const scenario = {
  title: 'Design a Data Pipeline',
  steps: [
    {
      prompt: 'Step 1: Choose your storage solution:',
      options: ['Relational DB', 'NoSQL DB', 'Flat files'],
      answer: 'Relational DB',
      explanation: 'Relational DBs are best for structured data and complex queries.'
    },
    {
      prompt: 'Step 2: Select your processing tool:',
      options: ['Spark', 'Excel', 'Notepad'],
      answer: 'Spark',
      explanation: 'Spark is a powerful tool for large-scale data processing.'
    }
  ]
};

export default function ScenarioChallengeActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = scenario.steps[step];

  function handleSelect(option: string) {
    setSelected(option);
    setShowAnswer(true);
  }

  function next() {
    setSelected(null);
    setShowAnswer(false);
    setStep((s) => s + 1);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">&larr; Back</button>
      <h2 className="text-xl font-bold mb-4">Scenario Challenge</h2>
      <p className="mb-4 font-semibold">{current.prompt}</p>
      <div className="space-y-2 mb-4">
        {current.options.map((opt) => (
          <button
            key={opt}
            className={`block w-full text-left px-4 py-2 rounded border ${selected === opt ? (opt === current.answer ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'border-gray-200 hover:bg-blue-50'}`}
            disabled={showAnswer}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="mb-4">
          <p className="font-medium">{current.explanation}</p>
        </div>
      )}
      {step < scenario.steps.length - 1 ? (
        <button
          onClick={next}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          disabled={!showAnswer}
        >
          Next
        </button>
      ) : showAnswer ? (
        <div className="mt-4">
          <span className="text-green-700 font-bold">Scenario Complete!</span>
        </div>
      ) : null}
    </div>
  );
}
