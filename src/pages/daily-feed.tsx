import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';
import StatusIndicator from '@/components/common/StatusIndicator';
import Header from '@/components/Layout/Header';
import Tag from '@/components/common/Tag';
import TagGroup from '@/components/common/TagGroup';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Head>
        <title>Daily Feed | Interactive Learning Hub</title>
        <meta name="description" content="Your daily learning feed" />
      </Head>

      <Header activeTab="daily-feed" />

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Content */}
            <div className="space-y-6">
              {/* Today's Curated Feed */}
              <div className="mb-10 bg-white rounded-lg p-6 shadow-sm">
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Daily Feed</h1>
                  <p className="mt-1 text-gray-600">Understand latest news</p>
                </div>

                {/* Quick Learning Tools - 10-Min Catch-up and Knowledge Test */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 10-Minute Catch-up */}
                  <div className="bg-gray-50 rounded-lg p-3 flex flex-col shadow-sm">
                    <div className="flex items-center mb-2 justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h2 className="text-lg font-semibold" style={{color: '#2D2D38'}}>10-Minute Catch-up</h2>
                      </div>
                      
                      <button 
                        onClick={togglePlayPause}
                        className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-800 transition-colors"
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
                  
                  {/* Test if you know it */}
                  <div className="bg-gray-50 rounded-lg p-3 flex flex-col shadow-sm">
                    <div className="flex items-center mb-2 justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h2 className="text-lg font-semibold" style={{color: '#2D2D38'}}>Test if you know it</h2>
                      </div>
                      <button 
                        onClick={handleTakeTest}
                        className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-800 transition-colors"
                        aria-label="Take test"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trending AI Concepts Section */}
              <div className="mb-10">
                <div className="space-y-8 p-6 pt-8 rounded-lg bg-white shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900">Ignore the hype, learn what news really means.</h2>
                  {/* Article 1: Leadership & Strategy - Completed State */}
                  <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden border-l-4 border-green-500">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Strategic AI Leadership in the Digital Age</h2>
                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Completed
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 block mt-1">Completed 2h ago</span>
                        </div>
                      </div>
                      <p className="text-sm mb-3 text-gray-700">Learn how to develop and communicate a compelling AI vision that aligns with your organization's strategic objectives and drives digital transformation.</p>
                      
                      <div className="pt-2">
                        <Tag tag="leadership-strategy" onClick={() => {}} className="text-xs" />
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-[#E5E7EB] border-t" />

                  {/* Article 2: Governance, Policy & Risk - Needs Attention */}
                  <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden border-l-4 border-red-500">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>AI Governance Frameworks for Enterprise Risk Management</h2>
                        <span className="text-xs" style={{color: '#6B7280'}}>4h ago</span>
                      </div>
                      <p className="text-sm mb-4" style={{color: '#2D2D38'}}>Discover how to implement robust governance structures that ensure responsible AI deployment while managing risks and regulatory compliance.</p>
                      
                      <div className="text-sm text-red-600 font-medium mb-2">
                        Contributes to <span className="font-semibold bg-red-50 border border-red-200 rounded px-1.5 py-0.5">Governance, Policy & Risk</span> that needs attention
                      </div>
                      
                      <div className="flex justify-end items-center gap-3 mt-2">
                        <button 
                          onClick={() => handleLaunchLearning("Data Mesh Architecture for Enterprise Scale")}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Learn
                        </button>
                        
                        <button 
                          onClick={() => handleLaunchTest("Data Mesh Architecture")}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-[#E5E7EB] border-t" />

                  {/* Article 3: Foundations & Ecosystem - Excelling */}
                  <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden border-l-4 border-blue-500">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Building a Future-Ready AI Infrastructure</h2>
                        <span className="text-xs" style={{color: '#6B7280'}}>6h ago</span>
                      </div>
                      <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Explore the essential components of a scalable AI infrastructure that supports innovation while ensuring security and compliance.</p>
                      
                      <div className="text-sm text-green-600 font-medium mb-2">
                        Contributes to <span className="font-semibold bg-green-50 border border-green-200 rounded px-1.5 py-0.5">Foundations & Ecosystem</span> where you are excelling
                      </div>
                      
                      <div className="flex justify-end items-center gap-3 mt-2">
                        <button 
                          onClick={() => handleLaunchLearning("Zero Trust Security for AI Systems")}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Learn
                        </button>
                        
                        <button 
                          onClick={() => handleLaunchTest("Zero Trust Security Models for AI Systems")}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-[#E5E7EB] border-t" />

                  {/* Article 4: Workforce Enablement - On Track */}
                  <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden border-l-4 border-blue-500">
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Upskilling Teams for the AI Revolution</h2>
                        <span className="text-xs" style={{color: '#6B7280'}}>8h ago</span>
                      </div>
                      <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Learn strategies for developing AI literacy across your organization and building the skills needed for successful AI adoption.</p>
                      
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        Contributes to <span className="font-semibold bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">Workforce Enablement</span> which you are on track
                      </div>
                      
                      <div className="flex justify-end items-center gap-3 mt-2">
                        <button 
                          onClick={() => handleLaunchLearning("AI-Powered Decision Intelligence Frameworks")}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Learn
                        </button>
                        
                        <button 
                          onClick={() => handleLaunchTest("AI-Powered Decision Intelligence")}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          Test
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
      </main>
    </div>
  );
};

export default DailyFeedPage;
