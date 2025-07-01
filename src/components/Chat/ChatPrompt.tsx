import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ChatPromptProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

const ChatPrompt: React.FC<ChatPromptProps> = ({ onSendMessage, isDisabled = false }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 px-4 py-3 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask a question about this topic..."
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-blue-200'
              } ${isDisabled ? 'bg-blue-100 cursor-not-allowed' : 'bg-white'}`}
              disabled={isDisabled}
            />
            <button
              type="submit"
              disabled={!message.trim() || isDisabled}
              className={`absolute right-2 bottom-2 p-1.5 rounded-full ${
                message.trim() && !isDisabled
                  ? 'text-indigo-600 hover:bg-indigo-50'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Ask questions anytime about the current topic
        </p>
      </div>
    </div>
  );
};

export default ChatPrompt;
