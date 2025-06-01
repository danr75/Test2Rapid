import React from 'react';
import Head from 'next/head';
import TopicInput from '@/components/UI/TopicInput';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Interactive Learning Hub</title>
        <meta name="description" content="AI-powered learning with mind maps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Interactive Learning Hub
          </h1>
          {/* Removed AI-generated text as requested */}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              What would you like to learn today?
            </h2>
            <TopicInput />
          </div>
          
          <div className="mt-8 text-center text-gray-600">
            <p className="mb-2 text-center">How it works:</p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">1</div>
                <p>Choose a topic</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">2</div>
                <p>Answer questions</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">3</div>
                <p>Build your mind map</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
