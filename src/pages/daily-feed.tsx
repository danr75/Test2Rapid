import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLearning } from '@/store/LearningContext';
import Header from '@/components/Layout/Header';

const DailyFeedPage: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useLearning();

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
