import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useLearning } from '@/store/LearningContext';

const ScenarioLearnPage: React.FC = () => {
  const { state } = useLearning();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Scenario Mode - {state.topic || 'Learn'}</title>
        <meta name="description" content={`Scenario-based learning for ${state.topic}`} />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Scenario Learning Mode
          </h1>
          {state.topic ? (
            <p className="text-2xl mb-8">
              Current Topic: <span className="font-semibold text-accent">{state.topic}</span>
            </p>
          ) : (
            <p className="text-xl mb-8">No topic selected. Please select a topic from the home page.</p>
          )}

          <div className="bg-card p-8 rounded-lg shadow-xl border border-border">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              This learning mode is currently under construction. Exciting scenario-based activities for "{state.topic || 'your chosen topic'}" will be available here.
            </p>
            <img src="/images/placeholder-scenario.svg" alt="Scenario mode placeholder" className="mx-auto my-4 w-1/2" /> 
          </div>

          <div className="mt-12">
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
