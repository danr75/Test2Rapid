import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
interface Node {
  id: string;
  label: string;
  group?: number;
  type: 'central' | 'topic' | 'question' | 'subtopic'; // Made type non-optional and added 'central'
  expanded?: boolean;
  parentId?: string;
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
  learnNextTopics: string[];
}

type LearningAction =
  | { type: 'SET_TOPIC'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_CURRENT_QUESTION_INDEX'; payload: number }
  | { type: 'ADD_ANSWERED_QUESTION'; payload: string }
  | { type: 'ADD_NODE'; payload: Node }
  | { type: 'ADD_LINK'; payload: Link }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_SUBTOPICS'; payload: { parentId: string, subtopics: Node[] } }
  | { type: 'SET_TOPIC_EXPANDED'; payload: string }
  | { type: 'UPDATE_NODE'; payload: { id: string; newLabel: string } }
  | { type: 'CLEAR_MIND_MAP' }
  | { type: 'ADD_TO_LEARN_NEXT'; payload: string }
  | { type: 'SET_TOPIC_FOR_LEARNING'; payload: string }
  | { type: 'START_QUEUED_TOPIC'; payload: string };

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
  learnNextTopics: [],
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
    case 'ADD_SUBTOPICS':
      // Add new subtopic nodes
      const newNodes = [...state.nodes];
      // Mark the parent topic as expanded
      const updatedNodes = newNodes.map(node => 
        node.id === action.payload.parentId 
          ? { ...node, expanded: true } 
          : node
      );
      
      return { 
        ...state, 
        nodes: [...updatedNodes, ...action.payload.subtopics],
        // Add links from parent to each subtopic
        links: [
          ...state.links,
          ...action.payload.subtopics.map(subtopic => ({
            source: action.payload.parentId,
            target: subtopic.id
          }))
        ]
      };
    case 'SET_TOPIC_EXPANDED':
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload ? { ...node, expanded: true } : node
        )
      };
    case 'CLEAR_MIND_MAP':
      return {
        ...state,
        nodes: [],
        links: []
      };
    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload.id
            ? { ...node, label: action.payload.newLabel }
            : node
        ),
      };
    case 'ADD_TO_LEARN_NEXT':
      if (state.learnNextTopics.includes(action.payload) || state.topic === action.payload) {
        return state; // Avoid duplicates or adding current topic
      }
      return {
        ...state,
        learnNextTopics: [...state.learnNextTopics, action.payload],
      };
    case 'SET_TOPIC_FOR_LEARNING':
      return {
        ...state,
        topic: action.payload,
        questions: [],
        currentQuestionIndex: 0,
        answeredQuestions: [],
        nodes: [],
        links: [],
        isLoading: false,
        error: null,
      };
    case 'START_QUEUED_TOPIC':
      return {
        ...state,
        topic: action.payload,
        questions: [],
        currentQuestionIndex: 0,
        answeredQuestions: [],
        nodes: [],
        links: [],
        isLoading: false,
        error: null,
        learnNextTopics: state.learnNextTopics.filter(
          topic => topic !== action.payload
        ),
      };
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
