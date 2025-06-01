import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
interface Node {
  id: string;
  label: string;
  group?: number;
}

interface Link {
  source: string;
  target: string;
}

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

interface LearningState {
  topic: string;
  questions: Question[];
  currentQuestionIndex: number;
  answeredQuestions: string[];
  nodes: Node[];
  links: Link[];
  isLoading: boolean;
  error: string | null;
}

type LearningAction =
  | { type: 'SET_TOPIC'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_CURRENT_QUESTION_INDEX'; payload: number }
  | { type: 'ADD_ANSWERED_QUESTION'; payload: string }
  | { type: 'ADD_NODE'; payload: Node }
  | { type: 'ADD_LINK'; payload: Link }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: LearningState = {
  topic: '',
  questions: [],
  currentQuestionIndex: 0,
  answeredQuestions: [],
  nodes: [],
  links: [],
  isLoading: false,
  error: null,
};

// Create context
const LearningContext = createContext<{
  state: LearningState;
  dispatch: React.Dispatch<LearningAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const learningReducer = (state: LearningState, action: LearningAction): LearningState => {
  switch (action.type) {
    case 'SET_TOPIC':
      return { ...state, topic: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_CURRENT_QUESTION_INDEX':
      return { ...state, currentQuestionIndex: action.payload };
    case 'ADD_ANSWERED_QUESTION':
      return {
        ...state,
        answeredQuestions: [...state.answeredQuestions, action.payload],
      };
    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.payload] };
    case 'ADD_LINK':
      return { ...state, links: [...state.links, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Provider component
interface LearningProviderProps {
  children: ReactNode;
}

export const LearningProvider: React.FC<LearningProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  return (
    <LearningContext.Provider value={{ state, dispatch }}>
      {children}
    </LearningContext.Provider>
  );
};

// Custom hook for using the context
export const useLearning = () => useContext(LearningContext);

export default LearningContext;
