import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface SavedScenario {
  id: string;
  topic: string;
  dateSaved: string;
  steps: any[];
}

const SavedItemsPage: React.FC = () => {
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('savedScenarios');
      if (items) {
        setSavedScenarios(JSON.parse(items));
      }
    }
  }, []);

  const handleViewScenario = (scenario: SavedScenario) => {
    // Navigate to scenario-learn with query params for review mode
    router.push({
      pathname: '/scenario-learn',
      query: { id: scenario.id, view: 'saved' }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Head>
        <title>Saved Items | AI skills builder</title>
        <meta name="description" content="Your saved scenarios and items" />
      </Head>
      <Header activeTab="learning-coach" />
      <main className="container mx-auto px-4 py-8 pb-48">
        <div className="max-w-3xl mx-auto">
          <button
            className="flex items-center text-blue-700 hover:text-blue-900 mb-8"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Scenarios</h1>
          {savedScenarios.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <p className="text-gray-500">You have no saved scenarios yet. Complete a scenario and click Save to revisit it here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedScenarios.map((scenario) => (
                <div key={scenario.id} className="bg-white rounded-lg p-6 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{scenario.topic}</div>
                    <div className="text-gray-500 text-sm">Saved on {new Date(scenario.dateSaved).toLocaleString()}</div>
                  </div>
                  <button
                    className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow"
                    onClick={() => handleViewScenario(scenario)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedItemsPage;
