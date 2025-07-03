import React, { useState } from 'react';

const script = [
  {
    speaker: 'Manager',
    message: 'Can you explain what cloud migration means for our business?'
  },
  {
    speaker: 'You',
    message: '' // User input
  },
  {
    speaker: 'Manager',
    message: 'What is the main risk we should watch out for?'
  },
  {
    speaker: 'You',
    message: '' // User input
  }
];

export default function RolePlaySimulationActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(['', '']);
  const [input, setInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  function handleNext() {
    if (step === 1 || step === 3) {
      const idx = step === 1 ? 0 : 1;
      setResponses((r) => {
        const n = [...r];
        n[idx] = input;
        return n;
      });
      setInput('');
    }
    if (step === 3) setShowFeedback(true);
    setStep((s) => s + 1);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">&larr; Back</button>
      <h2 className="text-xl font-bold mb-4">Role Play Simulation</h2>
      {step < script.length ? (
        <div>
          <div className="mb-4">
            <span className="font-semibold">{script[step].speaker}:</span>
            <span className="ml-2">{script[step].speaker === 'You' ? (
              <input
                className="border px-2 py-1 rounded ml-2 w-64"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your answer..."
              />
            ) : script[step].message}</span>
          </div>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={script[step].speaker === 'You' && !input}
          >
            Next
          </button>
        </div>
      ) : showFeedback ? (
        <div className="mt-4">
          <p className="font-bold text-green-700 mb-2">Simulation Complete!</p>
          <p className="mb-2">Your responses:</p>
          <ul className="list-disc pl-6">
            <li><span className="font-semibold">Cloud migration means:</span> {responses[0]}</li>
            <li><span className="font-semibold">Main risk:</span> {responses[1]}</li>
          </ul>
          <p className="mt-2 text-gray-700">Tip: Clear, business-focused explanations help non-technical stakeholders understand value and risks.</p>
        </div>
      ) : null}
    </div>
  );
}
