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

interface TopicInputProps {
  onTopicSubmit: (topic: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onTopicSubmit }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { dispatch } = useLearning();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (topic.trim()) {
      setIsLoading(true);
      
      // Call the callback with the topic
      onTopicSubmit(topic);
      // setIsLoading(false); // Or manage loading state based on parent component
    }
  };
  
  const selectSuggestedTopic = (suggestedTopic: string) => {
    setIsLoading(true);
    
    // Call the callback with the suggested topic
    onTopicSubmit(suggestedTopic);
    // setIsLoading(false); // Or manage loading state based on parent component
  };
  
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What would you like to learn about?"
            className="input-field pr-12 mb-4"
            required
            disabled={isLoading}
          />
          {topic.length > 0 && (
            <button 
              type="button"
              onClick={() => setTopic('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="btn-primary w-full mb-6"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Learning'}
        </button>
      </form>
    </div>
  );
};

export default TopicInput;
