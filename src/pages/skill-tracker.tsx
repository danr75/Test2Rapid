import React from 'react';
import Head from 'next/head';
import Header from '@/components/Layout/Header';

const SkillTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Skill Tracker | Digital Executive Advisor</title>
        <meta name="description" content="Strategic Learning Platform" />
      </Head>

      <Header activeTab="skill-tracker" />

      {/* Page content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-primary">Skill Tracker</h1>
          <p className="text-xl text-gray-600 mb-8">This page is coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default SkillTrackerPage;
