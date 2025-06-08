import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useLearning } from '@/store/LearningContext';
import { InformationCircleIcon, FlagIcon, LightBulbIcon, CheckCircleIcon, ChevronRightIcon, ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/react/24/outline';

// --- Data Structures for Dynamic Scenarios ---
interface DynamicScenarioOption {
  id: string;
  text: string;
}

interface DynamicScenarioStep {
  id: string;
  stepNumber: number;
  title: string;
  questionText: string;
  options: DynamicScenarioOption[];
  correctOptionId: string;
  feedbackCorrect: string;
  feedbackTip: string;
}

interface DynamicScenarioData {
  id: string;
  topic: string;
  objective: string;
  overallContext: string;
  overallGoal: string;
  steps: DynamicScenarioStep[];
}

// --- Mock Data for the Dynamic Scenario ---
const mockDynamicLlmScenario: DynamicScenarioData = {
  id: 'llm-choice-scenario-1',
  topic: 'Choosing an LLM for a Project',
  objective: 'To understand the key factors in selecting an LLM and apply them to a practical decision-making process.',
  overallContext: 'You are a tech lead at a startup. Your team needs to integrate a Large Language Model (LLM) for a new customer support chatbot feature. Budget is a consideration, as is the ease of integration and the model\'s capabilities for understanding nuanced customer queries.',
  overallGoal: 'Select the most suitable LLM based on a series of practical considerations and justify your choice.',
  steps: [
    {
      id: 'step1',
      stepNumber: 1,
      title: "Step 1: Clearly Define Project Requirements & Scope",
      questionText: "Your team is eager to start. What's the most crucial first action to ensure the LLM selection process is effective?",
      options: [
        { id: 'a', text: "Immediately start testing popular LLMs like GPT-4o mini and Llama 3." },
        { id: 'b', text: "Hold a workshop to define specific chatbot features, performance metrics, and budget constraints." },
      ],
      correctOptionId: 'b',
      feedbackCorrect: "Correct! Defining clear requirements (features, performance, budget) upfront prevents wasted effort and ensures the chosen LLM aligns with actual needs.",
      feedbackTip: "A detailed requirements document acts as your compass throughout the selection process. Consider aspects like response time, accuracy, supported languages, and data handling policies.",
    },
    {
      id: 'step2',
      stepNumber: 2,
      title: "Step 2: Research & Shortlist Potential LLM Candidates",
      questionText: "With requirements defined, how do you approach identifying potential LLMs?",
      options: [
        { id: 'a', text: "Focus only on the most well-known, large-scale commercial models." },
        { id: 'b', text: "Research a mix of open-source and commercial models, comparing them against your defined requirements." },
      ],
      correctOptionId: 'b',
      feedbackCorrect: "Excellent! A broad search considering both open-source and commercial options against your specific needs is key to finding the best fit.",
      feedbackTip: "Look at model benchmarks, community support (for open-source), pricing models, and integration complexity. Create a comparison matrix.",
    },
    {
      id: 'step3',
      stepNumber: 3,
      title: "Step 3: Evaluate and Pilot Test Top Candidates",
      questionText: "You've shortlisted 2-3 promising LLMs. What's the next practical step?",
      options: [
        { id: 'a', text: "Select the LLM with the most features listed on its website." },
        { id: 'b', text: "Develop small pilot projects or proof-of-concepts for each shortlisted LLM to test real-world performance on your specific use cases." },
      ],
      correctOptionId: 'b',
      feedbackCorrect: "Spot on! Pilot testing is crucial to see how LLMs perform with your actual data and use cases, beyond marketing claims.",
      feedbackTip: "Define clear success criteria for your pilot tests. Evaluate not just the output quality, but also ease of use, developer experience, and any unexpected challenges.",
    },
  ],
};

const ScenarioLearnPage: React.FC = () => {
  const { state: learningContextState } = useLearning();

  const [currentScenario, setCurrentScenario] = useState<DynamicScenarioData>(mockDynamicLlmScenario);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [revealedSteps, setRevealedSteps] = useState<DynamicScenarioStep[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [scenarioCompleted, setScenarioCompleted] = useState<boolean>(false);

  const currentStepData = !scenarioCompleted && currentScenario.steps[currentStepIndex] ? currentScenario.steps[currentStepIndex] : null;
  const isCorrect = currentStepData && selectedOptionId === currentStepData.correctOptionId;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowFeedback(true);
    
    // If the option is correct, automatically proceed after a delay
    if (currentStepData && optionId === currentStepData.correctOptionId) {
      console.log('Correct answer selected, setting timeout to advance');
      // Wait 500ms before proceeding to the next step
      setTimeout(() => {
        console.log('Timeout triggered, advancing to next step');
        const newRevealedSteps = [...revealedSteps, currentStepData];
        setRevealedSteps(newRevealedSteps);

        if (currentStepIndex < currentScenario.steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
          setSelectedOptionId(null);
          setShowFeedback(false);
        } else {
          setScenarioCompleted(true); // All steps completed
        }
      }, 1000);
    }
  };

  // handleNextStep function removed as we now handle progression directly in the setTimeout

  // Scenario Completion View
  if (scenarioCompleted) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 sm:py-16">
            <main className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">Scenario Complete!</h2>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Objective:</h3>
                  <p className="text-muted-foreground mb-4">{currentScenario.objective}</p>
                  
                  {/* Steps list directly under objective */}
                  {revealedSteps.map((step, index) => {
                    // Generate descriptive text based on step ID/title
                    let stepDescription = '';
                    
                    if (step.id === 'step1') {
                      stepDescription = 'Define clear project needs and constraints to guide your LLM selection process with specific performance requirements and budget parameters.';
                    } else if (step.id === 'step2') {
                      stepDescription = 'Research both open-source and commercial LLM options to create a balanced comparison based on your specific requirements.';
                    } else if (step.id === 'step3') {
                      stepDescription = 'Test shortlisted LLMs with real-world examples to verify their actual performance against marketing claims.';
                    } else {
                      stepDescription = 'Complete this step successfully by choosing the optimal path forward based on careful analysis.';
                    }
                    
                    return (
                      <div key={index} className="mb-4">
                        <p className="font-semibold text-foreground">{step.title}</p>
                        <p className="text-muted-foreground text-sm">{stepDescription}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:justify-between">
                  {/* Do Again button - left aligned */}
                  <button
                    onClick={() => {
                      // Reset the scenario state
                      setCurrentStepIndex(0);
                      setRevealedSteps([]);
                      setSelectedOptionId(null);
                      setShowFeedback(false);
                      setScenarioCompleted(false);
                    }}
                    className="w-40 flex items-center justify-center gap-2 py-3 px-6 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors mb-4 sm:mb-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Do Again
                  </button>
                  
                  {/* Hub button - right aligned */}
                  <Link href="/" passHref>
                    <button className="w-40 flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Hub
                    </button>
                  </Link>
                </div>
            </main>
        </div>
    );
  }
  
  // Current Step View (if scenario is not completed and currentStepData exists)
  if (!currentStepData) {
    // Fallback for unexpected state, should ideally be covered by scenarioCompleted
    return <div className="min-h-screen flex items-center justify-center">Loading scenario step...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>{`Scenario: ${currentScenario.topic} - ${learningContextState.topic || 'Interactive Learning'}`}</title>
        <meta name="description" content={`Interactive scenario on ${currentScenario.topic} for ${learningContextState.topic || 'your selected topic'}`} />
      </Head>

      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Updated Heading and Hub Button Container */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              {learningContextState.topic ? learningContextState.topic : currentScenario.topic}
            </h1>
            <Link href="/">
              <button className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 font-medium py-2 px-4 rounded-md shadow-sm flex items-center space-x-2 transition-colors duration-150">
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Hub</span>
              </button>
            </Link>
          </div>

          {/* Objective Block */}
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">Objective</h2>
            <p className="text-muted-foreground">{currentScenario.objective}</p>
          </div>



          {/* Current Decision Point Block */}
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border mb-8">
            <div className="flex items-start mb-4">
              <h3 className="text-xl font-semibold text-foreground">
                <span className="mr-2">{currentStepData.stepNumber}.</span>{currentStepData.questionText}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {currentStepData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback && !!isCorrect} /* <-- FIXED TS ERROR & MODIFIED LOGIC */
                  className={`w-full p-4 rounded-md border text-left transition-all duration-150 
                    ${showFeedback && selectedOptionId === option.id ? 
                      (isCorrect ? 'bg-green-500 border-green-600 text-white ring-2 ring-green-400 ring-offset-2 ring-offset-background' : 'bg-red-500 border-red-600 text-white ring-2 ring-red-400 ring-offset-2 ring-offset-background') :
                      'bg-background hover:bg-muted border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                    /* Apply different styles if options are disabled due to correctness vs other reasons if needed */
                    /* For now, the existing disabled:opacity-50 should cover it when isCorrect is true */
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <span className={`font-semibold mr-2 ${showFeedback && selectedOptionId === option.id ? 'text-white' : 'text-primary'}`}>
                        {option.id.toUpperCase()})
                      </span>
                      {option.text}
                    </div>
                    {showFeedback && selectedOptionId === option.id && (
                      isCorrect ? <CheckCircleIcon className="h-5 w-5 text-white" /> : <XCircleIcon className="h-5 w-5 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Inline Tip display area */}
          {showFeedback && !isCorrect && currentStepData && (
            <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-700 mb-8">
              <div className="flex items-start">
                <LightBulbIcon className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Tip:</h4>
                  <p>{currentStepData.feedbackTip}</p>
                </div>
              </div>
            </div>
          )}

          {/* "Next Step" Button Area is removed since we're auto-proceeding after a delay */}

          {/* Revealed Steps Display Area - MOVED HERE */}
          {revealedSteps.length > 0 && (
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Progress:</h2>
              <ul className="space-y-3">
                {revealedSteps.map((step, index) => (
                  <li key={index} className="p-3 bg-background rounded-md border border-border shadow-sm">
                    <p className="font-semibold text-primary">{step.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {/* Old Hub link location removed */}
        </div>
      </main>
    </div>
  );
};

export default ScenarioLearnPage;