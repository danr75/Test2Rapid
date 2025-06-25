import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, ClipboardDocumentListIcon, LightBulbIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Layout/Header';

// Mock data - replace with actual data from your API
const cheatSheets = [
  { id: 1, title: 'Data Management Best Practices', category: 'Data' },
  { id: 2, title: 'AI Model Development Guide', category: 'AI' },
  { id: 3, title: 'Tech Stack Components', category: 'Technology' },
];

const templates = [
  { id: 1, title: 'Data Pipeline Template', category: 'Data' },
  { id: 2, title: 'Model Evaluation Framework', category: 'AI' },
  { id: 3, title: 'Technical Requirements Doc', category: 'Documentation' },
];

const essentials = [
  { id: 1, title: 'Data Fundamentals', duration: '6 min' },
  { id: 2, title: 'AI Model Lifecycle', duration: '8 min' },
  { id: 3, title: 'Technical Architecture Patterns', duration: '7 min' },
];

const myNotes = [
  { id: 1, title: 'Data Pipeline Notes', date: '2023-06-20' },
  { id: 2, title: 'Tech Stack Evaluation', date: '2023-06-18' },
];

type TabType = 'cheatsheets' | 'templates' | 'essentials' | 'mynotes' | 'chat';

const DataTechCapable = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('cheatsheets');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{sender: string; text: string}>>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `I'm your AI assistant for Data & Tech Capabilities. How can I help you with "${message}"?` 
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
                    <DocumentTextIcon className="h-6 w-6 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
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
                    <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
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

      case 'essentials':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Essential Learning</h2>
            <div className="space-y-4">
              {essentials.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <LightBulbIcon className="h-6 w-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-sm text-gray-500">{item.duration} read</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Start
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="space-y-4">
              {myNotes.map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{note.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Last updated: {note.date}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="flex flex-col h-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything about Data & Tech Capabilities</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <p>How can I help you with Data & Tech Capabilities today?</p>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'}`}
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
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
        <title>Data & Tech Capable | Interactive Learning Hub</title>
        <meta name="description" content="Explore data and technology capabilities resources" />
      </Head>
      
      <Header activeTab="learning-coach" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Toolkit
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Data & Tech Capable</h1>
              <p className="text-gray-600 mt-1">Resources and tools for technical capabilities</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {[
                { id: 'cheatsheets', label: 'Cheat Sheets', icon: DocumentTextIcon },
                { id: 'templates', label: 'Templates', icon: ClipboardDocumentListIcon },
                { id: 'essentials', label: 'Essentials', icon: LightBulbIcon },
                { id: 'mynotes', label: 'My Notes', icon: BookmarkIcon },
                { id: 'chat', label: 'AI Assistant', icon: ChatBubbleLeftRightIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className={`h-5 w-5 mr-2 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataTechCapable;
