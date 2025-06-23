import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';
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
              <h1 className="text-2xl font-bold" style={{color: '#2D2D38'}}>Essential news and trends to know</h1>
            </div>
            
            {/* Quick Learning Tools - 10-Min Catch-up and Knowledge Test */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* 10-Minute AI Catch-up */}
              <div style={{backgroundColor: '#E0EDFF'}} className="bg-blue-50 rounded-lg p-3 flex flex-col">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold" style={{color: '#2D2D38'}}>10-Minute AI Catch-up</h2>
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
              
              {/* Test What You've Missed */}
              <div style={{backgroundColor: '#F3E8FF'}} className="bg-purple-50 rounded-lg p-3 flex flex-col">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold" style={{color: '#2D2D38'}}>Test What You've Missed</h2>
                  </div>
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={handleTakeTest}
                      className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Today's Trending Topics */}
            <div style={{backgroundColor: '#F0F0F4'}} className="mb-10 w-full p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-4" style={{color: '#2D2D38'}}>Today's Trending Topics</h2>
              <div className="flex flex-wrap gap-3 mt-3">
                <Tag tag="ai-foundations" onClick={() => {}} />
                <Tag tag="ai-strategy" onClick={() => {}} />
                <Tag tag="ai-ethics" onClick={() => {}} />
                <Tag tag="change-management" onClick={() => {}} />
              </div>
            </div>
            
            {/* Trending AI Concepts */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#2D2D38'}}>What Today's AI Trends Mean for You</h2>
            </div>
            <div className="space-y-8 p-6 rounded-lg" style={{backgroundColor: '#F0F0F4'}} >
              {/* Article 1: Leadership & Strategy */}
              <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Strategic AI Leadership in the Digital Age</h2>
                    <span className="text-xs" style={{color: '#6B7280'}}>2h ago</span>
                  </div>
                  <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Learn how to develop and communicate a compelling AI vision that aligns with your organization's strategic objectives and drives digital transformation.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag tag="ai-strategy" onClick={() => {}} className="text-xs" />
                    <Tag tag="digital-transformation" onClick={() => {}} className="text-xs" />
                    <Tag tag="leadership" onClick={() => {}} className="text-xs" />
                  </div>
                  
                  <div className="flex justify-end items-center gap-3 mt-2">
                    <button 
                      onClick={() => handleLaunchLearning("Responsible Use of Generative AI in Customer Services")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Learn
                    </button>
                    
                    <button 
                      onClick={() => handleLaunchTest("Responsible Use of Generative AI in Customer Services")}
                      className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
              
              <hr className="border-[#E5E7EB] border-t" />

              {/* Article 2: Governance, Policy & Risk */}
              <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>AI Governance Frameworks for Enterprise Risk Management</h2>
                    <span className="text-xs" style={{color: '#6B7280'}}>4h ago</span>
                  </div>
                  <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Discover how to implement robust governance structures that ensure responsible AI deployment while managing risks and regulatory compliance.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag tag="ai-governance" onClick={() => {}} className="text-xs" />
                    <Tag tag="risk-management" onClick={() => {}} className="text-xs" />
                    <Tag tag="compliance" onClick={() => {}} className="text-xs" />
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

              {/* Article 3: Foundations & Ecosystem */}
              <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Building a Future-Ready AI Infrastructure</h2>
                    <span className="text-xs" style={{color: '#6B7280'}}>6h ago</span>
                  </div>
                  <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Explore the essential components of a scalable AI infrastructure that supports innovation while ensuring security and compliance.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag tag="ai-foundations" onClick={() => {}} className="text-xs" />
                    <Tag tag="infrastructure" onClick={() => {}} className="text-xs" />
                    <Tag tag="scalability" onClick={() => {}} className="text-xs" />
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

              {/* Article 4: Workforce Enablement */}
              <div style={{backgroundColor: '#FAFAFC'}} className="rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg" style={{color: '#2D2D38'}}>Upskilling Teams for the AI Revolution</h2>
                    <span className="text-xs" style={{color: '#6B7280'}}>8h ago</span>
                  </div>
                  <p className="text-sm mb-5" style={{color: '#2D2D38'}}>Learn strategies for developing AI literacy across your organization and building the skills needed for successful AI adoption.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Tag tag="workforce-development" onClick={() => {}} className="text-xs" />
                    <Tag tag="skills-training" onClick={() => {}} className="text-xs" />
                    <Tag tag="change-management" onClick={() => {}} className="text-xs" />
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
  );
};

export default DailyFeedPage;
