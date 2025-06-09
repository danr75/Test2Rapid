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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trending Topics */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Today's Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">#GenerativeAI</span>
                <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">#DataMesh</span>
                <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">#CloudNative</span>
                <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">#AIGovernance</span>
              </div>
            </div>

            {/* Industry Focus */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Industry Focus</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Financial Services</span>
                  <span className="text-sm text-gray-500">12 articles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Healthcare</span>
                  <span className="text-sm text-gray-500">8 articles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Manufacturing</span>
                  <span className="text-sm text-gray-500">6 articles</span>
                </div>
              </div>
            </div>

            {/* Reading Time */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Reading Time</h2>
              <div className="mb-2">
                <div className="font-medium mb-1">Today</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>45 min</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-3">Target: 60 minutes daily</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyFeedPage;
