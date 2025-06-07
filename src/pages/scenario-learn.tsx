import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useLearning } from '@/store/LearningContext';

interface ScenarioCardData {
  id: string;
  title: string;
  summary: string;
  category: 'Investment' | 'Governance' | 'Risk' | 'Architecture' | 'Operations' | 'Strategy';
  complexity: 'Simple' | 'Moderate' | 'Complex';
}

const mockScenarios: ScenarioCardData[] = [
  {
    id: 'scenario1',
    title: 'New Market Entry Strategy',
    summary: 'A promising new international market has been identified. Assess the risks and opportunities of expanding operations to this region, considering cultural and regulatory differences.',
    category: 'Strategy',
    complexity: 'Complex',
  },
  {
    id: 'scenario2',
    title: 'Critical System Outage Response',
    summary: 'A core IT system has experienced a major outage impacting thousands of customers globally. You must prioritize recovery efforts and manage internal and external communication effectively.',
    category: 'Operations',
    complexity: 'Moderate',
  },
  {
    id: 'scenario3',
    title: 'AI Integration Proposal Evaluation',
    summary: 'A department proposes integrating a new AI-powered tool to automate a key business process. Evaluate the potential ROI, implementation challenges, and ethical implications before making a decision.',
    category: 'Architecture',
    complexity: 'Moderate',
  },
  {
    id: 'scenario4',
    title: 'Sudden Competitor Move',
    summary: 'A major competitor has unexpectedly launched a product that directly challenges your flagship offering. Analyze the threat and formulate a swift, effective response.',
    category: 'Strategy',
    complexity: 'Complex',
  },
];

const ScenarioLearnPage: React.FC = () => {
  const { state } = useLearning();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Scenario Mode - {state.topic || 'Learn'}</title>
        <meta name="description" content={`Scenario-based learning for ${state.topic}`} />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto"> {/* Widened container for cards */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Scenario Learning Mode
            </h1>
            {state.topic ? (
              <p className="text-xl text-muted-foreground mb-2">
                Topic: <span className="font-semibold text-accent">{state.topic}</span>
              </p>
            ) : (
              <p className="text-xl mb-8">No topic selected. Please select a topic from the home page.</p>
            )}
            <p className="text-lg mb-10">Select a scenario to dive into:</p>
          </div>

          {state.topic ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockScenarios.map((scenario) => (
                <div 
                  key={scenario.id} 
                  className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  // onClick={() => handleScenarioSelect(scenario.id)} // We'll add this later
                >
                  <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">{scenario.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed h-20 overflow-hidden">
                      {scenario.summary}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-gray-500">Category:</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">{scenario.category}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-gray-500">Complexity:</span>
                      <span 
                        className={`px-2 py-0.5 rounded-full font-semibold ${ 
                          scenario.complexity === 'Simple' ? 'bg-green-100 text-green-700' : 
                          scenario.complexity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {scenario.complexity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-card p-8 rounded-lg shadow-xl border border-border">
              <p className="text-xl text-muted-foreground">Please select a topic on the home page to see available scenarios.</p>
            </div>
          )}


          <div className="mt-12 text-center">
            <Link href="/" legacyBehavior>
              <a className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 px-8 rounded-lg shadow-md transition-colors duration-150">
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioLearnPage;
