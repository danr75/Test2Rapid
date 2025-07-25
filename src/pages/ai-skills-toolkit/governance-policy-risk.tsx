'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, ClipboardDocumentListIcon, LightBulbIcon, BookmarkIcon, ShieldCheckIcon, ScaleIcon, ExclamationTriangleIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Layout/Header';

// Mock data - replace with actual data from your API
const cheatSheets = [
  { id: 1, title: 'AI Governance Framework', category: 'Governance' },
  { id: 2, title: 'Risk Assessment Matrix', category: 'Risk' },
  { id: 3, title: 'Policy Development Guide', category: 'Policy' },
];

const templates = [
  { id: 1, title: 'AI Policy Template', category: 'Policy' },
  { id: 2, title: 'Risk Register Template', category: 'Risk' },
  { id: 3, title: 'Governance Framework', category: 'Governance' },
];

const essentials = [
  { id: 1, title: 'Introduction to AI Governance', duration: '5 min' },
  { id: 2, title: 'Key Risk Areas in AI', duration: '8 min' },
  { id: 3, title: 'Policy Development 101', duration: '6 min' },
];

const myNotes = [
  { id: 1, title: 'Meeting Notes - AI Risk Assessment', date: '2023-06-20' },
  { id: 2, title: 'Policy Draft Comments', date: '2023-06-18' },
];

const aiUseCases = [
  {
    id: 1,
    title: 'AI Ethics Framework Implementation',
    description: 'How a financial institution implemented an AI ethics framework across its operations.',
    category: 'Ethics & Compliance',
    icon: ShieldCheckIcon,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    link: '#'
  },
  {
    id: 2,
    title: 'Regulatory Compliance Automation',
    description: 'Automating compliance with AI regulations in the healthcare sector.',
    category: 'Compliance',
    icon: ScaleIcon,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    link: '#'
  },
  {
    id: 3,
    title: 'Risk Mitigation in AI Deployment',
    description: 'Case study on identifying and mitigating risks in AI system deployments.',
    category: 'Risk Management',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    link: '#'
  },
  {
    id: 4,
    title: 'AI Governance in Government',
    description: 'Implementing responsible AI governance in public sector organizations.',
    category: 'Public Sector',
    icon: BeakerIcon,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    link: '#'
  }
];

type TabType = 'cheatsheets' | 'templates' | 'essentials' | 'mynotes' | 'chat' | 'usecases';

const GovernancePolicyRisk = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('cheatsheets');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{sender: string; text: string}>>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `I'm your AI assistant for Governance, Policy & Risk. How can I help you with "${message}"?` 
      }]);
    }, 1000);
    
    setMessage('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cheatsheets':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Cheat Sheets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cheatSheets.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'essentials':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Essentials Refresher</h2>
            <div className="space-y-3">
              {essentials.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <LightBulbIcon className="h-6 w-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.duration} read</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'usecases':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Use Cases & Case Studies</h2>
              <p className="text-gray-600">Explore real-world applications of AI governance, policy, and risk management.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiUseCases.map((useCase) => {
                const Icon = useCase.icon;
                return (
                  <div key={useCase.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      <div className={`w-12 h-12 ${useCase.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${useCase.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                      <p className="text-gray-600 mb-4">{useCase.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {useCase.category}
                        </span>
                        <a 
                          href={useCase.link} 
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          Learn more
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Submit Your Use Case</h3>
              <p className="text-gray-600 mb-4">Have an interesting governance, policy, or risk management use case to share? We'd love to hear about it!</p>
              <button className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-200 text-sm font-medium transition-colors">
                Save your story
              </button>
            </div>
          </div>
        );

      case 'mynotes':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Notes</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                + New Note
              </button>
            </div>
            {myNotes.length > 0 ? (
              <div className="space-y-3">
                {myNotes.map((note) => (
                  <div key={note.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <BookmarkIcon className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{note.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Last updated: {new Date(note.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No notes yet. Create your first note!</p>
              </div>
            )}
          </div>
        );

      case 'chat':
        return (
          <div className="flex flex-col h-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything about Governance, Policy & Risk</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <p>How can I help you with Governance, Policy & Risk today?</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Governance, Policy & Risk | AI Skills Toolkit</title>
        <meta name="description" content="Access essential resources for AI governance, policy development, and risk management. Explore cheat sheets, templates, and expert guidance to implement effective AI governance frameworks." />
      </Head>

      <Header activeTab="learning-coach" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <Link 
              href="/learning-coach#my-toolkit"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Toolkit
            </Link>
            
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">Governance, Policy & Risk</h1>
              <p className="text-gray-600 mt-1">Resources and tools for AI governance and compliance</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
              {[
                { id: 'cheatsheets', name: 'Cheat Sheets', icon: DocumentTextIcon },
                { id: 'templates', name: 'Templates', icon: ClipboardDocumentListIcon },
                { id: 'essentials', name: 'Essentials', icon: LightBulbIcon },
                { id: 'mynotes', name: 'My Notes', icon: BookmarkIcon },
                { id: 'usecases', name: 'Use Cases', icon: BeakerIcon },
                { id: 'chat', name: 'AI Assistant', icon: ChatBubbleLeftRightIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5 inline-block mr-2 -mt-1" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernancePolicyRisk;
