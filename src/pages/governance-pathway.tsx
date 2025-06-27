'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const GovernancePathway = () => {
  const router = useRouter();

  // Handle scroll to section when the component mounts
  useEffect(() => {
    if (window.location.hash === '#learning-pathways') {
      const element = document.getElementById('learning-pathways');
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="learning-coach" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <Link 
            href="/learning-coach#learning-pathways"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Learning Coach
          </Link>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Governance, Policy & Risk</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rapid Test Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Rapid Test</h3>
                <p className="text-gray-600 text-sm mb-4">Quickly assess your knowledge with our rapid test module</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                  Start Test
                </button>
              </div>
            </div>

            {/* Essentials Refresher Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Essentials Refresher</h3>
                <p className="text-gray-600 text-sm mb-4">Review key concepts and essential information</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                  View Content
                </button>
              </div>
            </div>

            {/* Structured Learn Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Structured Learn</h3>
                <p className="text-gray-600 text-sm mb-4">Follow a guided learning path at your own pace</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                  Begin Learning
                </button>
              </div>
            </div>

            {/* Templates/How To Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Templates / How To</h3>
                <p className="text-gray-600 text-sm mb-4">Access ready-to-use templates and guides</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                  View Resources
                </button>
              </div>
            </div>

            {/* Cheat Sheets Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Cheat Sheets</h3>
                <p className="text-gray-600 text-sm mb-4">Quick reference guides and key information at a glance</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full font-medium">
                  View Sheets
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernancePathway;
