import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';
import Header from '@/components/Layout/Header';

const DailyFeedPage: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useLearning();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to handle launching a learning mode with a specific topic
  const handleLaunchLearning = (topic: string, mode: 'Q&A' | 'Scenario' | 'Speed') => {
    // Set the topic and mode in context
    dispatch({ type: 'SET_TOPIC', payload: topic });
    dispatch({ type: 'SET_LEARNING_MODE', payload: mode });
    
    // Navigate to the appropriate page based on mode
    if (mode === 'Q&A') {
      router.push('/qa-learn');
    } else if (mode === 'Scenario') {
      router.push('/scenario-learn');
    } else if (mode === 'Speed') {
      router.push('/speed-learn');
    }
  };

  // Function to handle the audio player
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to update audio time
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Function to handle taking the knowledge test
  const handleTakeTest = () => {
    dispatch({ type: 'SET_TOPIC', payload: 'Current AI Trends' });
    router.push('/qa-learn');
  };

  // Format time for display (MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Daily Feed | Digital Executive Advisor</title>
        <meta name="description" content="Strategic Learning Platform" />
      </Head>

      <Header activeTab="daily-feed" />

      {/* Page content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Today's Curated Feed */}
          <div className="mb-10">
            <div className="flex items-baseline mb-2">
              <h1 className="text-2xl font-bold text-gray-800">Essential news and trends to know</h1>
            </div>
            <p className="text-gray-600 text-sm mb-8">Rapidly grasp and retain emerging digital, data, and AI trends and news that matter for executive decision-making through interactive learning.</p>
            
            {/* Quick Learning Tools - 10-Min Catch-up and Knowledge Test */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 10-Minute AI Catch-up */}
              <div className="bg-blue-50 rounded-lg p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">10-Minute AI Catch-up</h2>
                </div>
                
                <div className="mb-4">
                  <button 
                    onClick={togglePlayPause}
                    className="bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-800 transition-colors"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  
                  {/* Hidden audio element */}
                  <audio 
                    ref={audioRef} 
                    src="/audio/ai-catchup.mp3" 
                    onTimeUpdate={updateTime} 
                    onEnded={() => setIsPlaying(false)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  />
                </div>
                
                <p className="text-sm text-gray-600">Quick audio summary of today's AI developments</p>
              </div>
              
              {/* Knowledge Test */}
              <div className="bg-purple-50 rounded-lg p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Knowledge Test</h2>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">Test your understanding of current AI trends</p>
                
                <button 
                  onClick={handleTakeTest}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-center transition-colors w-full"
                >
                  Take Quick Test
                </button>
              </div>
            </div>
            
            {/* Articles */}
            <div className="space-y-6">
              {/* Article 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium">AI Strategy</span>
                    <span className="text-gray-400 text-xs">2h ago</span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2">The Rise of Generative AI in Enterprise Architecture</h2>
                  <p className="text-gray-600 text-sm mb-2">How leading companies are integrating generative AI into their core business processes...</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-xs">MIT Technology Review</span>
                      <span className="text-primary font-medium text-sm">Launch Learning</span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleLaunchLearning("Generative AI in Enterprise Architecture", "Q&A")}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Q&A
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Generative AI in Enterprise Architecture", "Scenario")}
                        className="bg-green-100 hover:bg-green-200 text-green-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Scenario
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Generative AI in Enterprise Architecture", "Speed")}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Speed
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded font-medium">Data Architecture</span>
                    <span className="text-gray-400 text-xs">4h ago</span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2">Data Mesh Implementation: Lessons from Fortune 500</h2>
                  <p className="text-gray-600 text-sm mb-2">Key insights from organizations that successfully implemented data mesh architectures...</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-xs">Harvard Business Review</span>
                      <span className="text-primary font-medium text-sm">Launch Learning</span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleLaunchLearning("Data Mesh Implementation", "Q&A")}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Q&A
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Data Mesh Implementation", "Scenario")}
                        className="bg-green-100 hover:bg-green-200 text-green-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Scenario
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Data Mesh Implementation", "Speed")}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Speed
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded font-medium">Digital Security</span>
                    <span className="text-gray-400 text-xs">6h ago</span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2">Zero Trust Security in Cloud-First Organizations</h2>
                  <p className="text-gray-600 text-sm mb-2">Strategic approaches to implementing zero trust frameworks at scale...</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-xs">McKinsey Digital</span>
                      <span className="text-primary font-medium text-sm">Launch Learning</span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleLaunchLearning("Zero Trust Security in Cloud", "Q&A")}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Q&A
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Zero Trust Security in Cloud", "Scenario")}
                        className="bg-green-100 hover:bg-green-200 text-green-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Scenario
                      </button>
                      <button 
                        onClick={() => handleLaunchLearning("Zero Trust Security in Cloud", "Speed")}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded font-medium transition-colors">
                        Speed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom sections */}
          {/* Trending Topics */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow border border-blue-100 flex flex-col items-start justify-between h-full w-full">
            <div className="flex items-center gap-2 mb-3">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" /></svg>
              <h2 className="font-semibold text-lg text-blue-700">Today's Trending Topics</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">Stay current with top AI, data, and digital trends. Click a tag to explore more.</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">#GenerativeAI</button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">#DataMesh</button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">#CloudNative</button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">#AIGovernance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyFeedPage;
