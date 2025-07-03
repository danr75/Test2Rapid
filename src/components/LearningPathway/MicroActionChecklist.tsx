import React, { useState } from 'react';

const steps = [
  'Document a data flow for a recent project',
  'Review your team’s security policy',
  'Optimize one workflow this week',
  'Share a tech insight with a colleague'
];

export default function MicroActionChecklist({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState(Array(steps.length).fill(false));
  const [done, setDone] = useState(false);

  function toggle(idx: number) {
    setChecked((arr) => arr.map((c, i) => (i === idx ? !c : c)));
  }

  function finish() {
    setDone(true);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">&larr; Back</button>
      <h2 className="text-xl font-bold mb-4">Micro-Actions</h2>
      <ul className="mb-4">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => toggle(idx)}
              className="mr-2"
            />
            <span>{step}</span>
          </li>
        ))}
      </ul>
      {!done ? (
        <button
          onClick={finish}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={!checked.every(Boolean)}
        >
          Mark as Done
        </button>
      ) : (
        <div className="text-green-700 font-bold">Well done! You’ve completed your micro-actions.</div>
      )}
    </div>
  );
}
