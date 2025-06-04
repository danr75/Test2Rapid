import React from 'react';

interface LearnNowNextModalProps {
  isOpen: boolean;
  topicName: string;
  onLearnNow: () => void;
  onLearnNext: () => void;
  onClose: () => void;
}

const LearnNowNextModal: React.FC<LearnNowNextModalProps> = ({ 
  isOpen, 
  topicName, 
  onLearnNow, 
  onLearnNext, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Learn Topic</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        <p className="text-gray-700 mb-6">
          What would you like to do with the topic: <strong className="text-indigo-600">{topicName}</strong>?
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onLearnNow}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Learn Now
          </button>
          <button
            onClick={onLearnNext}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Learn Next
          </button>
          <button
            onClick={onClose} // Alternatively, a dedicated cancel button
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnNowNextModal;
