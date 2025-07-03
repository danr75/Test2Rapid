import React, { useState } from 'react';

const questions = [
  { q: 'What does API stand for?', a: 'Application Programming Interface', options: ['Application Programming Interface', 'Automated Process Integration', 'Advanced Programming Instruction'] },
  { q: 'Which is a cloud provider?', a: 'AWS', options: ['MySQL', 'AWS', 'Python'] },
  { q: 'What is the main benefit of version control?', a: 'Track and manage code changes', options: ['Faster computers', 'Track and manage code changes', 'Better graphics'] },
];

export default function QuickRefresherActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = questions[step];

  function handleSelect(option: string) {
    setSelected(option);
    setShowAnswer(true);
  }

  function next() {
    setSelected(null);
    setShowAnswer(false);
    setStep((s) => (s + 1) % questions.length);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">&larr; Back</button>
      <h2 className="text-xl font-bold mb-4">Quick Refresher</h2>
      <p className="mb-4 font-semibold">{current.q}</p>
      <div className="space-y-2 mb-4">
        {current.options.map((opt) => (
          <button
            key={opt}
            className={`block w-full text-left px-4 py-2 rounded border ${selected === opt ? (opt === current.a ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'border-gray-200 hover:bg-blue-50'}`}
            disabled={showAnswer}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="mb-4">
          {selected === current.a ? (
            <span className="text-green-700 font-bold">Correct!</span>
          ) : (
            <span className="text-red-700 font-bold">Incorrect. Correct answer: {current.a}</span>
          )}
        </div>
      )}
      <button
        onClick={next}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        disabled={!showAnswer}
      >
        Next
      </button>
    </div>
  );
}
