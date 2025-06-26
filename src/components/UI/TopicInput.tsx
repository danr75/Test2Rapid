import React, { useState, FormEvent } from 'react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const TopicInput: React.FC<TopicInputProps> = ({
  onSubmit,
  placeholder = 'Search for topics...',
  buttonText = 'Search',
  className = ''
}) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default TopicInput;
