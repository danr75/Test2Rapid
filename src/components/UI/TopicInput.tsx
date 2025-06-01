import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';

// Suggested topics for quick selection
const suggestedTopics = [
  'JavaScript Basics',
  'Machine Learning',
  'World History',
  'Biology',
  'Climate Science'
];

const TopicInput: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dispatch } = useLearning();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (topic.trim()) {
      setIsLoading(true);
      
      // Set the topic in our global state
      dispatch({ type: 'SET_TOPIC', payload: topic });
      
      // Reset any previous questions
      dispatch({ type: 'SET_QUESTIONS', payload: [] });
      dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: 0 });
      
      // Navigate to the quiz page
      router.push('/quiz');
    }
  };
  
  const selectSuggestedTopic = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic you want to learn about..."
            className="input-field"
            required
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Learning'}
        </button>
      </form>
      
      <div>
        <p className="text-gray-600 mb-2">Suggested topics:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((suggestedTopic) => (
            <button
              key={suggestedTopic}
              onClick={() => selectSuggestedTopic(suggestedTopic)}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
              disabled={isLoading}
            >
              {suggestedTopic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
