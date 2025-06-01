# Interactive Learning Hub

An AI-powered learning application that generates interactive quizzes and builds mind maps as users learn.

## Project Overview

Interactive Learning Hub is an educational tool that helps users learn new topics through AI-generated multiple choice questions. As users answer questions correctly, the application builds a visual mind map of concepts, creating an engaging and interactive learning experience.

## Features

- Topic-based learning with AI-generated multiple choice questions
- Immediate feedback on answers with explanations
- Visual mind map that grows as users learn new concepts
- Responsive design that works across desktop, tablet, and mobile
- Clean, modern UI for an engaging user experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/interactive-learning-hub.git
cd interactive-learning-hub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
interactive-learning-hub/
├── public/               # Static assets
│   └── images/           # Image assets
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── Layout/       # Layout components
│   │   ├── MindMap/      # Mind map visualization
│   │   ├── Quiz/         # Quiz interface
│   │   └── UI/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Next.js pages
│   ├── services/         # API and service integrations
│   │   └── ai/           # AI service for question generation
│   ├── store/            # State management
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
└── package.json          # Dependencies and scripts
```

## Technologies Used

- Next.js - React framework for server-rendered applications
- TypeScript - For type safety
- Tailwind CSS - For responsive styling
- D3.js - For mind map visualization
- OpenAI API - For question generation (placeholder for now)

## Development Roadmap

This project follows the development phases outlined in the TASKS.md file:

1. Project Scaffolding (Current)
2. Core UI Components
3. Mind Map Visualization
4. AI Integration
5. Progress Storage
6. Responsive Design
7. Polish & Testing
