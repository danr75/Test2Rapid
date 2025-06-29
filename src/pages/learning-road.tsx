import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Layout/Header';
import { NavigationTab } from '../components/Layout/Navigation';
import CapabilityBar from '../components/UI/CapabilityBar';

const LearningRoad: React.FC = () => {
  const router = useRouter();
  const activeTab: NavigationTab = 'skill-tracker';
  const [selectedRole, setSelectedRole] = useState<string>('Full Stack Developer');
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [targetPosition, setTargetPosition] = useState<number>(87.5); // Default position at Expert
  const [progressWidth, setProgressWidth] = useState<number>(33); // Current progress width percentage (33% progress)
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  // Check localStorage for assessment completion status and selected role
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('selectedRole') || 'Full Stack Developer';
      const completed = localStorage.getItem('assessmentCompleted') === 'true';
      
      setSelectedRole(storedRole);
      setAssessmentCompleted(completed);
      
      // If assessment is not completed, redirect to skill tracker
      if (!completed) {
        router.push('/skill-tracker');
      }
    }
  }, [router]);

  const handleAssessCapability = () => {
    // Clear assessment completion status to allow re-assessment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('assessmentCompleted');
    }
    router.push('/skill-tracker');
  };

  // Handle mouse down on the target
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Handle mouse up anywhere on the document
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !progressBarRef.current) return;
      
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const percentage = Math.round((x / rect.width) * 100);
      
      // Snap to nearest 25% (Aware, Participate, Lead, Expert, Master)
      const snapPoints = [0, 25, 50, 75, 100];
      const closest = snapPoints.reduce((prev, curr) => 
        Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev
      );
      
      setTargetPosition(closest);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const getPositionPercentage = () => {
    const positions = [0, 25, 50, 75, 100];
    const labels = ['Aware', 'Participate', 'Lead', 'Expert', 'Master'];
    const index = positions.findIndex(pos => pos === targetPosition);
    return labels[index] || 'Expert';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      <Head>
        <title>Learning Road | Interactive Learning Hub</title>
        <meta name="description" content="Your personalized learning journey" />
      </Head>

      {/* Header and Navigation */}
      <Header activeTab={activeTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Content */}
            <div className="space-y-6">
            {/* Combined Experience & Target Card */}
            <div className="w-full bg-white rounded-xl p-6 shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-200 rounded-full opacity-20 -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-200 rounded-full opacity-10 -ml-16 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your progress</h3>
                  
                  {/* Progress Section */}
                  <div className="mt-4">
                    <div className="flex flex-col space-y-1">
                      <div className="relative w-full mb-1">
                        <div 
                          ref={progressBarRef}
                          className="relative h-6 bg-gray-100 rounded-xl overflow-visible cursor-pointer"
                        >
                          {/* Background grid lines - removed */}
                          
                          {/* Vertical dividers */}
                          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
                            <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200" style={{ left: '25%' }}></div>
                            <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200" style={{ left: '50%' }}></div>
                            <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200" style={{ left: '75%' }}></div>
                          </div>
                          
                          {/* Purple progress bar */}
                          <div 
                            className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center rounded-l-xl z-5" 
                            style={{ width: `${progressWidth}%` }}
                          >
                            <span className="ml-auto mr-2 text-white text-xs font-medium">{progressWidth}%</span>
                          </div>
                          
                          {/* Draggable target indicator with pill and connecting line */}
                          <div 
                            className="absolute -top-7 cursor-move select-none" 

                            onMouseDown={handleMouseDown}
                            style={{
                              cursor: isDragging ? 'grabbing' : 'grab',
                              left: `${targetPosition}%`,
                              transform: 'translateX(-50%)',
                              zIndex: 20 
                            }}
                          >
                            <div className="flex flex-col items-center">
                              <span className="bg-violet-200 border border-violet-300 text-violet-900 text-xs font-medium px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap mb-1">
                                Target
                              </span>
                              {/* Connecting line with solid circle - darker purple */}
                              <div className="relative z-10">
                                <div className="w-0.5 h-3 bg-violet-600 mx-auto"></div>
                                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-violet-600 rounded-full z-20"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Level labels - positioned under the lines */}
                        <div className="relative mt-1">
                          <div className="flex text-xs text-gray-600">
                            <div className="absolute left-0 text-center" style={{ width: '25%', left: '12.5%' }}>Aware</div>
                            <div className="absolute left-0 text-center" style={{ width: '25%', left: '37.5%' }}>Participate</div>
                            <div className="absolute left-0 text-center" style={{ width: '25%', left: '62.5%' }}>Lead</div>
                            <div className="absolute left-0 text-center" style={{ width: '25%', left: '87.5%' }}>Expert</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
                {/* Action Buttons - Removed Change Target button */}
              </div>
            </div>

            {/* Stats Section - Modern Design */}
            <div className="w-full mb-6 p-6 rounded-xl bg-white shadow-sm border border-gray-100">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weekly Progress */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl flex flex-col h-full">
                  <h4 className="text-sm font-medium text-gray-600 text-center mb-3">Weekly Progress</h4>
                  <div className="flex-1 flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-blue-600">3%</span>
                      <svg className="w-8 h-8 ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <p className="text-sm font-semibold text-gray-900">On Track</p>
                  </div>
                </div>

                {/* Most Improved */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl flex flex-col h-full">
                  <h4 className="text-sm font-medium text-gray-600 text-center mb-3">Most Improved</h4>
                  <div className="flex-1 flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-green-600">+15%</span>
                      <svg className="w-8 h-8 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <p className="text-sm font-semibold text-gray-900">Workforce</p>
                  </div>
                </div>

                {/* Needs Attention */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-xl flex flex-col h-full">
                  <h4 className="text-sm font-medium text-gray-600 text-center mb-3">Needs Attention</h4>
                  <div className="flex-1 flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-rose-600">-5%</span>
                      <svg className="w-8 h-8 ml-1 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <p className="text-sm font-semibold text-gray-900">Foundations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Bars */}
            <div className="w-full bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Progress to next level</h3>
              </div>
              {/* Frontend Development */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Leadership & Strategy</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                      On Track
                    </span>
                  </div>

                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  
                  {/* Blue progress bar */}
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '85%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">85%</span>
                  </div>
                  
                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>
              
              {/* Governance, Policy & Risk */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Governance, Policy & Risk</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                      On Track
                    </span>
                  </div>

                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '60%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">60%</span>
                  </div>

                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>
              
              {/* DevOps */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Foundations & Ecosystem</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-red-600">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                      Needs Attention
                    </span>
                  </div>

                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '30%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">30%</span>
                  </div>

                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>
              
              {/* Workforce Enablement */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Workforce Enablement</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                      Excelling
                    </span>
                  </div>

                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '63%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">63%</span>
                  </div>

                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>

              {/* Data & Tech Capable */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">Data & Tech Capable</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                      On Track
                    </span>
                  </div>

                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '50%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">50%</span>
                  </div>

                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>

              {/* AI Ethics and Responsibility */}
              <div className="relative mb-6">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">AI Ethics and Responsibility</span>
                    <span className="ml-2 inline-flex items-center text-xs font-medium text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                      On Track
                    </span>
                  </div>
                </div>
                <div className="relative h-6 bg-gray-100 overflow-visible border border-gray-200">
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div 
                    className="absolute top-0 left-0 h-6 bg-blue-500 transition-all duration-300 flex items-center" 
                    style={{ width: '45%' }}
                  >
                    <span className="ml-auto mr-2 text-white text-xs font-medium">45%</span>
                  </div>

                </div>
                {/* Next level indicator */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">Participate</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningRoad;
