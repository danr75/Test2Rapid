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

  // Function to handle launching learning content
  const handleLaunchLearning = (topic: string) => {
    // Set the topic and default to Q&A mode
    dispatch({ type: 'SET_TOPIC', payload: topic });
    dispatch({ type: 'SET_LEARNING_MODE', payload: 'Q&A' });
    router.push('/qa-learn');
  };
  
  // Function to handle launching a test
  const handleLaunchTest = (topic: string) => {
    // Set the topic for the test
    dispatch({ type: 'SET_TOPIC', payload: topic });
    router.push('/qa-learn'); // Assuming tests use the same page with different context
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
            <div className="flex items-baseline mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Essential news and trends to know</h1>
            </div>
            
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
              
              {/* Test What You've Missed */}
              <div className="bg-purple-50 rounded-lg p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Test What You've Missed</h2>
                </div>
                
                <button 
                  onClick={handleTakeTest}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-center transition-colors w-full mb-4"
                >
                  Take Quick Test
                </button>
                
                <p className="text-sm text-gray-600">Test your understanding of current AI trends</p>
              </div>
            </div>
            
            {/* Today's Trending Topics */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow border border-blue-100 flex flex-col items-start justify-between mb-8 w-full">
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
            
            {/* Trending AI Concepts */}
            <div className="space-y-6">
              {/* Concept 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg text-gray-800">Responsible Use of Generative AI in Customer Services</h2>
                    <span className="text-gray-400 text-xs">2h ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Implementing ethical guardrails for AI systems can reduce risks while maximizing customer experience benefits.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">#AI Readiness</span>
                    <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">#Risk Awareness</span>
                    <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">#Decision-Making</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleLaunchLearning("Responsible Use of Generative AI in Customer Services")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Learn
                    </button>
                    
                    <button 
                      onClick={() => handleLaunchTest("Responsible Use of Generative AI in Customer Services")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Test
                    </button>
                  </div>
                </div>
              </div>

              {/* Concept 2 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg text-gray-800">Data Mesh Architecture for Enterprise Scale</h2>
                    <span className="text-gray-400 text-xs">4h ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Domain-oriented decentralized data ownership enables organizations to scale their data architecture while improving quality and access.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">#Data Strategy</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">#Enterprise Architecture</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleLaunchLearning("Data Mesh Architecture for Enterprise Scale")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Learn
                    </button>
                    
                    <button 
                      onClick={() => handleLaunchTest("Data Mesh Architecture")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Test
                    </button>
                  </div>
                </div>
              </div>

              {/* Concept 3 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg text-gray-800">Zero Trust Security Models for AI Systems</h2>
                    <span className="text-gray-400 text-xs">6h ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Applying zero trust principles to AI deployments reduces vulnerability surface area while enabling secure innovation.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full font-medium">#Security</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">#AI Governance</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleLaunchLearning("Zero Trust Security for AI Systems")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Learn
                    </button>
                    
                    <button 
                      onClick={() => handleLaunchTest("Zero Trust Security Models for AI Systems")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Test
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Concept 4 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg text-gray-800">AI-Powered Decision Intelligence Frameworks</h2>
                    <span className="text-gray-400 text-xs">8h ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Combining AI with decision science creates robust frameworks for augmenting human decision-making in complex scenarios.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">#Decision-Making</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">#AI Strategy</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleLaunchLearning("AI-Powered Decision Intelligence Frameworks")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Learn
                    </button>
                    
                    <button 
                      onClick={() => handleLaunchTest("AI-Powered Decision Intelligence")}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                      Launch Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* End of content */}
        </div>
      </div>
    </div>
  );
};

export default DailyFeedPage;
