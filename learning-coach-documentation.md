# Learning Coach Page - Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Component Structure](#component-structure)
5. [State Management](#state-management)
6. [Core Features](#core-features)
7. [Data Flow](#data-flow)
8. [Styling & Theming](#styling--theming)
9. [Performance Considerations](#performance-considerations)
10. [Testing Strategy](#testing-strategy)
11. [Deployment](#deployment)
12. [Future Enhancements](#future-enhancements)

## Overview
The Learning Coach is an interactive learning platform that provides personalized learning experiences through multiple modes including Q&A, Scenario-based learning, and Speed learning. It features a responsive design, progress tracking, and adaptive learning paths.

## Technical Stack

### Core Technologies
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS 3.3
- **Icons**: Heroicons v2.2.0
- **Animation**: Framer Motion 12.19.1
- **State Management**: React Context API with useReducer
- **Routing**: Next.js Router
- **Build Tool**: Vite (via Next.js)

### Development Tools
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Type Checking**: TypeScript 5.0+
- **Testing**: Jest with React Testing Library

## Architecture

The application follows a modern React architecture with these key principles:

1. **Component-Based**: UI is broken down into reusable components
2. **Unidirectional Data Flow**: Data flows down, events flow up
3. **Separation of Concerns**: Clear division between UI, logic, and data
4. **Type Safety**: Full TypeScript support for better developer experience
5. **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

### Key Architectural Decisions

1. **Single-Page Application (SPA) with Client-Side Routing**
   - Fast navigation between views
   - Maintained application state during navigation
   - Improved perceived performance

2. **Context API for State Management**
   - Global state for learning progress and user preferences
   - Avoids prop drilling
   - Centralized state updates

3. **Custom Hooks**
   - Reusable logic encapsulation
   - Improved code organization
   - Easier testing

## Component Structure

### Main Components

1. **LearningCoachPage (pages/learning-coach.tsx)**
   - Main container component
   - Manages global state and routing
   - Composes other components together

2. **Header**
   - Navigation and search
   - User profile and notifications
   - Responsive mobile menu

3. **LearningModeSelector**
   - Toggle between Q&A, Scenario, and Speed modes
   - Visual indicators for active mode

4. **StrategicFocusCards**
   - Displays learning topics
   - Interactive cards with progress indicators
   - Priority badges for learning recommendations

5. **LearningPathways**
   - Shows structured learning paths
   - Progress tracking
   - Interactive elements for navigation

### Component Hierarchy

```
LearningCoachPage
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── Search
│   └── UserMenu
├── LearningModeSelector
├── StrategicFocusSection
│   ├── SectionHeader
│   └── StrategicFocusCard[]
└── LearningPathwaysSection
    ├── PathwayCard[]
    └── ProgressIndicator
```

## State Management

### Context Structure

```typescript
interface LearningState {
  learningMode: LearningMode | null;
  topic: string;
  questions: any[];
  currentQuestionIndex: number;
  answeredQuestions: string[];
  nodes: any[];
  links: any[];
  isLoading: boolean;
  error: string | null;
  learnNextTopics: string[];
}

type LearningAction =
  | { type: 'SET_LEARNING_MODE'; payload: LearningMode }
  | { type: 'SET_TOPIC'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: any[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
```

### State Management Flow

1. **Initialization**
   - Load initial state from localStorage or API
   - Set up event listeners

2. **State Updates**
   - User interactions trigger actions
   - Actions update the global state
   - Components re-render with new state

3. **Persistence**
   - Critical state is persisted to localStorage
   - Learning progress is synced with backend

## Core Features

### 1. Learning Modes

#### Q&A Mode
- Interactive question and answer interface
- Follow-up questions and explanations
- Progress tracking

#### Scenario Mode
- Real-world situational learning
- Branching scenarios
- Immediate feedback

#### Speed Mode
- Quick knowledge checks
- Time-based challenges
- Performance metrics

### 2. Progress Tracking

- Visual progress indicators
- Completion badges
- Learning analytics

### 3. Adaptive Learning

- Personalized recommendations
- Difficulty adjustment
- Learning path optimization

## Data Flow

1. **Initial Load**
   ```typescript
   // 1. Load initial data
   useEffect(() => {
     const loadInitialData = async () => {
       dispatch({ type: 'SET_LOADING', payload: true });
       try {
         const [topics, progress] = await Promise.all([
           fetchTopics(),
           fetchUserProgress()
         ]);
         // Update state
       } catch (error) {
         dispatch({ type: 'SET_ERROR', payload: error.message });
       } finally {
         dispatch({ type: 'SET_LOADING', payload: false });
       }
     };
     
     loadInitialData();
   }, []);
   ```

2. **User Interactions**
   ```typescript
   const handleModeChange = (mode: LearningMode) => {
     dispatch({ type: 'SET_LEARNING_MODE', payload: mode });
   };
   ```

3. **Data Fetching**
   - React Query for server state
   - Optimistic updates
   - Error boundaries

## Styling & Theming

### Design System

#### Colors
- Primary: `#2563eb` (Blue 600)
- Secondary: `#4f46e5` (Indigo 600)
- Success: `#10b981` (Emerald 500)
- Warning: `#f59e0b` (Amber 500)
- Danger: `#ef4444` (Red 500)

#### Typography
- Font Family: Inter (System UI)
- Base Size: 16px
- Scale: 1.125 (Major Third)

### Responsive Design

1. **Mobile-First Approach**
   - Base styles target mobile
   - Progressively enhance for larger screens

2. **Breakpoints**
   ```css
   /* Tailwind defaults */
   sm: 640px
   md: 768px
   lg: 1024px
   xl: 1280px
   2xl: 1536px
   ```

### Animation

1. **Page Transitions**
   - Smooth transitions between routes
   - Loading states

2. **Micro-interactions**
   - Button hover/focus states
   - Card hover effects
   - Loading indicators

## Performance Considerations

### Code Splitting
- Dynamic imports for non-critical components
- Route-based code splitting

### Bundle Optimization
- Tree-shaking with ES modules
- Image optimization
- Font optimization

### Caching Strategies
- Service workers for offline support
- Stale-while-revalidate pattern

## Testing Strategy

### Unit Tests
- Component rendering
- State management
- Utility functions

### Integration Tests
- User flows
- State updates
- API interactions

### E2E Tests
- Critical user journeys
- Cross-browser testing
- Performance testing

## Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_TRACKING_ID=UA-XXXXX-X
```

### Deployment Platforms
- Vercel (Recommended)
- Netlify
- AWS Amplify

## Future Enhancements

### Short-term
- [ ] Offline support
- [ ] Dark mode
- [ ] Enhanced analytics

### Long-term
- [ ] AI-powered recommendations
- [ ] Collaborative learning features
- [ ] Mobile app

## Troubleshooting

### Common Issues

1. **State not updating**
   - Check for proper dependency arrays in useEffect
   - Verify action types in reducer

2. **Styling issues**
   - Check for conflicting Tailwind classes
   - Verify purge configuration

3. **Performance problems**
   - Check for unnecessary re-renders
   - Optimize expensive calculations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT

---

*Documentation generated on June 26, 2025*
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## File Structure
```
src/
  pages/
    learning-coach.tsx    # Main page component
  components/
    PriorityBadge.tsx     # Reusable priority badge component
    LearningModeCard.tsx   # Learning mode selection card
    StrategicFocusCard.tsx  # Strategic focus topic card
  types/
    index.ts             # TypeScript type definitions
  styles/
    globals.css          # Global styles
```

## Type Definitions

### Core Types
```typescript
// types/index.ts
export type LearningMode = 'Q&A' | 'Scenario' | 'Speed';
export type Priority = 'high' | 'medium' | 'low';

export interface StrategicFocusCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topicToSet: string;
  learningPath: string;
  tags: string[];
  duration: string;
  priority?: Priority;
}

export interface LearningPathway {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  path?: string;
}
```

## Component Breakdown

### 1. LearningCoachPage (Main Component)
- Manages global state
- Handles routing and navigation
- Composes sub-components

### 2. LearningModeCard
- Displays individual learning mode option
- Handles mode selection
- Shows active state

### 3. StrategicFocusCard
- Displays learning path information
- Shows progress and priority
- Handles click events

### 4. PriorityBadge
- Reusable badge component
- Displays priority level with appropriate styling
- Uses Heroicons for visual indicators

## State Management

### State Hooks
```typescript
// Current selected learning mode
const [currentLearningMode, setCurrentLearningMode] = useState<LearningMode>('Q&A');

// Search query state
const [searchQuery, setSearchQuery] = useState('');

// Carousel state for featured content
const [carouselIndex, setCarouselIndex] = useState(0);
```

## Core Functionality

### 1. Search Submission
```typescript
const handleSearchSubmit = (query: string) => {
  if (!query.trim()) return;
  
  // Persist search data
  setSearchQuery(query);
  sessionStorage.setItem('lastSearchQuery', query);
  sessionStorage.setItem('learningMode', currentLearningMode);
  
  // Determine target route based on learning mode
  const modePath = {
    'Q&A': '/qa-learn',
    'Scenario': '/scenario-learn',
    'Speed': '/speed-learn'
  }[currentLearningMode] || '/qa-learn';
  
  // Navigate with query parameters
  router.push({
    pathname: modePath,
    query: { 
      q: query,
      mode: currentLearningMode.toLowerCase() 
    }
  });
};
```

### 2. Learning Mode Selection
```typescript
const handleModeChange = (mode: LearningMode) => {
  setCurrentLearningMode(mode);
};
```

### 3. Random Mode Selection
```typescript
const handlePickForMe = () => {
  const modes: LearningMode[] = ['Q&A', 'Scenario', 'Speed'];
  const randomMode = modes[Math.floor(Math.random() * modes.length)];
  setCurrentLearningMode(randomMode);
  
  // Focus search input after selection
  const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
  if (searchInput) searchInput.focus();
};
```

## Data Structures

### Learning Modes
```typescript
const learningModes = [
  {
    id: 'Q&A',
    label: 'Q&A Mode',
    description: 'Get answers to your specific questions',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'Scenario',
    label: 'Scenario Mode',
    description: 'Practice with real-world scenarios',
    icon: AcademicCapIcon,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'Speed',
    label: 'Speed Mode',
    description: 'Quick knowledge checks',
    icon: BoltIcon,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
];
```

### Strategic Focus Topics
```typescript
const strategicFocusTopics: StrategicFocusCardData[] = [
  {
    id: 'strategy-1',
    title: 'Developing AI Strategy',
    description: 'Learn how to create an effective AI strategy for your organization',
    icon: AcademicCapIcon,
    topicToSet: 'AI strategy development',
    learningPath: 'Leadership & Strategy',
    tags: ['strategy', 'leadership'],
    duration: '15 min',
    priority: 'high'
  },
  // Additional topics...
];
```

## Styling Approach

### Tailwind CSS Utilities
- **Layout**: Flexbox and Grid for responsive layouts
- **Spacing**: Consistent spacing scale (1 = 0.25rem)
- **Colors**: Semantic color naming (e.g., `bg-blue-100`, `text-gray-800`)
- **Transitions**: Smooth hover and focus states

### Custom Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Primary and secondary variants
- **Badges**: Reusable priority indicators

## Implementation Steps

1. **Setup Project**
   - Initialize Next.js with TypeScript
   - Configure Tailwind CSS
   - Set up project structure

2. **Create Components**
   - Implement core UI components
   - Set up TypeScript types
   - Create reusable utility functions

3. **Implement State Management**
   - Set up React hooks for state
   - Implement event handlers
   - Add data persistence

4. **Add Routing**
   - Set up page routes
   - Implement navigation
   - Handle query parameters

5. **Style Components**
   - Apply Tailwind classes
   - Implement responsive design
   - Add animations and transitions

6. **Test and Refine**
   - Test all interactive elements
   - Verify responsive behavior
   - Optimize performance

## Testing

### Component Tests
- Test rendering of all components
- Verify prop types and default values
- Test interactive elements

### Integration Tests
- Test component interactions
- Verify state changes
- Test routing behavior

### E2E Tests
- Test complete user flows
- Verify data persistence
- Test error states

## Deployment

### Build Command
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=your_api_url_here
NODE_ENV=production
```

## Troubleshooting

### Common Issues
1. **TypeScript Errors**
   - Verify all types are properly defined
   - Check for missing dependencies

2. **Styling Issues**
   - Ensure Tailwind is properly configured
   - Check for conflicting CSS rules

3. **Routing Problems**
   - Verify route paths
   - Check Next.js routing configuration

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Dependencies
- `next`: ^13.0.0
- `react`: ^18.0.0
- `typescript`: ^4.9.0
- `@heroicons/react`: ^2.0.0
- `tailwindcss`: ^3.0.0
