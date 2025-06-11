import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import { DocumentTextIcon, LinkIcon, DocumentArrowUpIcon, UserIcon, AcademicCapIcon, UserGroupIcon, PlayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const SkillTrackerPage: React.FC = () => {
  const router = useRouter();
  
  // Tab management
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'text'>('upload');
  const [activeRole, setActiveRole] = useState<'ai-basics' | 'user' | 'decision-maker' | 'leader'>('ai-basics');
  
  // File upload handling
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Handle capability test button click
  const handleTestCapability = (capability: string) => {
    router.push({
      pathname: '/speed-learn',
      query: { topic: capability }
    });
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Skill Tracker | Digital Executive Advisor</title>
        <meta name="description" content="Strategic Learning Platform" />
      </Head>

      <Header activeTab="skill-tracker" />

      {/* Page content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Skills Profile Generator - REPLACED with clean screenshot-matching block */}
          <div className="mb-10">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-start gap-3 mb-6">
  <span className="text-purple-600 mt-1">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </span>
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Build AI skills for your current or target role</h1>
    <p className="text-gray-500 text-base mb-8 mt-1">Upload files, provide URLs, or paste content to customise your personal learning hub</p>
  </div>
</div>
              <div className="flex gap-2 mb-8 justify-center">
                <button
                  className={`flex items-center gap-2 px-8 py-4 border rounded-lg font-medium text-gray-700 text-base ${activeTab === 'upload' ? 'bg-white border-gray-300 shadow-sm' : 'bg-gray-50 border-gray-100'}`}
                  onClick={() => setActiveTab('upload')}
                >
                  <DocumentArrowUpIcon className="h-5 w-5 text-gray-600" />
                  File Upload
                </button>
                <button
                  className={`flex items-center gap-2 px-8 py-4 border rounded-lg font-medium text-gray-700 text-base ${activeTab === 'url' ? 'bg-white border-gray-300 shadow-sm' : 'bg-gray-50 border-gray-100'}`}
                  onClick={() => setActiveTab('url')}
                >
                  <LinkIcon className="h-5 w-5 text-gray-600" />
                  URL Analysis
                </button>
                <button
                  className={`flex items-center gap-2 px-8 py-4 border rounded-lg font-medium text-gray-700 text-base ${activeTab === 'text' ? 'bg-white border-gray-300 shadow-sm' : 'bg-gray-50 border-gray-100'}`}
                  onClick={() => setActiveTab('text')}
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                  Text Input
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl bg-white flex flex-col items-center justify-center py-16">
                {activeTab === 'upload' && (
                  <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                    <ArrowUpTrayIcon className="h-16 w-16 text-gray-300 mb-4" />
                    <input type="file" multiple hidden id="file-upload" />
                    <p className="text-lg text-gray-600 mb-1">Drop your files here or click to browse</p>
                    <p className="text-sm text-gray-400">Supports PDF, DOC, TXT, and more</p>
                  </label>
                )}
                {activeTab === 'url' && (
                  <div className="flex flex-col items-center w-full max-w-md">
                    <input
                      type="url"
                      placeholder="Enter URL to analyze"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                      Analyze URL
                    </button>
                  </div>
                )}
                {activeTab === 'text' && (
                  <div className="flex flex-col items-center w-full max-w-md">
                    <textarea
                      placeholder="Paste text content here..."
                      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                      Analyze Text
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Explore General Skills Section */}
          <div className="mb-10 mt-12 bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AcademicCapIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Build AI skills starting at your chosen level</h2>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 mb-6">Select a role below to explore the key capabilities and generate a personalized skills assessment</p>
              {/* Role Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-8">
                <button 
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg ${activeRole === 'ai-basics' ? 'border-gray-300 shadow-sm' : 'border-gray-100'}`}
                  onClick={() => setActiveRole('ai-basics')}
                >
                  <AcademicCapIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">AI Basics</span>
                </button>
                <button 
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg ${activeRole === 'user' ? 'border-gray-300 shadow-sm' : 'border-gray-100'}`}
                  onClick={() => setActiveRole('user')}
                >
                  <UserIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">User</span>
                </button>
                <button 
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg ${activeRole === 'decision-maker' ? 'border-gray-300 shadow-sm' : 'border-gray-100'}`}
                  onClick={() => setActiveRole('decision-maker')}
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Decision Maker</span>
                </button>
                <button 
                  className={`flex items-center justify-center gap-2 p-4 border rounded-lg ${activeRole === 'leader' ? 'border-gray-300 shadow-sm' : 'border-gray-100'}`}
                  onClick={() => setActiveRole('leader')}
                >
                  <UserGroupIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Leader</span>
                </button>
              </div>
              
              {/* AI Basics Role Content */}
              {activeRole === 'ai-basics' && (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <AcademicCapIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">AI Basics</h4>
                  <p className="text-gray-600 mb-6 text-center">Fundamental AI concepts and tools</p>
                  
                  <div className="w-full">
                    <h5 className="font-medium mb-4">Key Capabilities:</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Understanding Machine Learning basics
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Understanding Machine Learning basics")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI Ethics and Responsible AI
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI Ethics and Responsible AI")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Prompt Engineering fundamentals
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Prompt Engineering fundamentals")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            ChatGPT and language models usage
                          </span>
                          <button 
                            onClick={() => handleTestCapability("ChatGPT and language models usage")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI tool selection and evaluation
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI tool selection and evaluation")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Basic data literacy for AI
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Basic data literacy for AI")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Understanding AI limitations
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Understanding AI limitations")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI workflow integration
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI workflow integration")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                        Generate personalized learning pathways
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* User Role Content */}
              {activeRole === 'user' && (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <UserIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">User</h4>
                  <p className="text-gray-600 mb-6 text-center">AI application usage and basic implementation</p>
                  
                  <div className="w-full">
                    <h5 className="font-medium mb-4">Key Capabilities:</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI-powered productivity tools usage
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI-powered productivity tools usage")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Effective prompt construction
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Effective prompt construction")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Evaluating AI outputs critically
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Evaluating AI outputs critically")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Automating routine tasks
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Automating routine tasks")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Personal workflow optimization
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Personal workflow optimization")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Data-informed decision making
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Data-informed decision making")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Information filtering strategies
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Information filtering strategies")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Visual AI tools application
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Visual AI tools application")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                        Generate personalized learning pathways
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Decision Maker Role Content */}
              {activeRole === 'decision-maker' && (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <DocumentTextIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Decision Maker</h4>
                  <p className="text-gray-600 mb-6 text-center">Strategic AI implementation and governance</p>
                  
                  <div className="w-full">
                    <h5 className="font-medium mb-4">Key Capabilities:</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI business case development
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI business case development")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            ROI analysis for AI initiatives
                          </span>
                          <button 
                            onClick={() => handleTestCapability("ROI analysis for AI initiatives")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Technology vendor assessment
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Technology vendor assessment")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI governance framework creation
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI governance framework creation")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Risk assessment and management
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Risk assessment and management")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Data privacy compliance planning
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Data privacy compliance planning")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Strategic implementation planning
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Strategic implementation planning")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI-driven business transformation
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI-driven business transformation")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                        Generate personalized learning pathways
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Leader Role Content */}
              {activeRole === 'leader' && (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <UserGroupIcon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Leader</h4>
                  <p className="text-gray-600 mb-6 text-center">Leading teams through AI transformation</p>
                  
                  <div className="w-full">
                    <h5 className="font-medium mb-4">Key Capabilities:</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            AI adoption change management
                          </span>
                          <button 
                            onClick={() => handleTestCapability("AI adoption change management")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Building AI-capable teams
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Building AI-capable teams")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Upskilling talent strategies
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Upskilling talent strategies")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Ethical AI leadership principles
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Ethical AI leadership principles")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Strategic AI communication
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Strategic AI communication")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Cross-functional collaboration
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Cross-functional collaboration")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Leading through technological change
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Leading through technological change")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                            Culture development for AI innovation
                          </span>
                          <button 
                            onClick={() => handleTestCapability("Culture development for AI innovation")}
                            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Test
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                        Generate personalized learning pathways
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTrackerPage;
