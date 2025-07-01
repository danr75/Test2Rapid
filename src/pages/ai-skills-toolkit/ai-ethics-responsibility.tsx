import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, ClipboardDocumentListIcon, LightBulbIcon, BookmarkIcon, ScaleIcon, ShieldCheckIcon, BeakerIcon, ScaleIcon as ScaleIcon2 } from '@heroicons/react/24/outline';
import Header from '@/components/Layout/Header';

// Mock data - replace with actual data from your API
const cheatSheets = [
  { id: 1, title: 'AI Ethics Framework', category: 'Ethics' },
  { id: 2, title: 'Responsible AI Guidelines', category: 'Guidelines' },
  { id: 3, title: 'Bias Mitigation', category: 'Fairness' },
];

const templates = [
  { id: 1, title: 'AI Impact Assessment', category: 'Assessment' },
  { id: 2, title: 'Ethics Review Template', category: 'Review' },
  { id: 3, title: 'AI Policy Template', category: 'Policy' },
];

const essentials = [
  { id: 1, title: 'Introduction to AI Ethics', duration: '5 min' },
  { id: 2, title: 'Bias in AI Systems', duration: '7 min' },
  { id: 3, title: 'AI Governance Best Practices', duration: '6 min' },
];

const myNotes = [
  { id: 1, title: 'Ethics Committee Meeting', date: '2023-06-20' },
  { id: 2, title: 'Responsible AI Principles', date: '2023-06-18' },
];

const aiUseCases = [
  {
    id: 1,
    title: 'AI Ethics in Healthcare',
    description: 'Implementing ethical AI practices in patient diagnosis and care.',
    category: 'Healthcare',
    icon: ShieldCheckIcon,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    link: '#'
  },
  {
    id: 2,
    title: 'Bias Mitigation in Hiring',
    description: 'Reducing algorithmic bias in recruitment and hiring processes.',
    category: 'HR & Recruitment',
    icon: ScaleIcon,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    link: '#'
  },
  {
    id: 3,
    title: 'Responsible AI in Finance',
    description: 'Ensuring fairness and transparency in AI-driven financial services.',
    category: 'Finance',
    icon: ScaleIcon2,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    link: '#'
  },
  {
    id: 4,
    title: 'AI for Social Good',
    description: 'Case studies of AI applications addressing societal challenges.',
    category: 'Social Impact',
    icon: BeakerIcon,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    link: '#'
  }
];

type TabType = 'cheatsheets' | 'templates' | 'essentials' | 'mynotes' | 'chat' | 'usecases';

const AIEthicsResponsibility = () => {
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
        text: `I'm your AI assistant for AI Ethics & Responsibility. How can I help you with "${message}"?` 
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
                    <DocumentTextIcon className="h-6 w-6 text-pink-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">
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

      case 'usecases':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Use Cases & Case Studies</h2>
              <p className="text-gray-600">Explore real-world applications of AI ethics and responsible AI practices.</p>
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
              <p className="text-gray-600 mb-4">Have an interesting AI ethics or responsible AI use case to share? We'd love to hear about it!</p>
              <button className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg border border-blue-200 text-sm font-medium transition-colors">
                Save your story
              </button>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="flex flex-col h-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-500">Ask me anything about AI Ethics & Responsibility</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <p>How can I help you with AI Ethics & Responsibility today?</p>
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
        <title>AI Ethics & Responsibility | AI Skills Toolkit</title>
        <meta name="description" content="Access essential resources for AI ethics and responsible AI development. Explore cheat sheets, templates, and expert guidance to implement ethical AI practices." />
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
              <h1 className="text-3xl font-bold text-gray-900">AI Ethics & Responsibility</h1>
              <p className="text-gray-600 mt-1">Resources and tools for responsible AI development</p>
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
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
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

export default AIEthicsResponsibility;
