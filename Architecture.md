# ARCHITECTURE.md

## High-Level Architecture

### Components

1. **Frontend UI**
   - Topic Input Component
   - Question Display Component
   - Answer Feedback Modal
   - Mind Map Visualization Component

2. **AI Question Generator**
   - Calls GPT-4 or equivalent model API.
   - Returns question text, correct answer, incorrect options, and explanations.

3. **State Manager**
   - Manages current session state, topic, question progression, and mind map data.
   - For prototype: localStorage-based state management.

4. **Backend (Optional for future scaling)**
   - User authentication (future)
   - Persistent database storage (future)
   - Analytics & usage tracking (future)

### Data Flow

- User submits topic.
- AI generates MCQ.
- User answers.
- Feedback displayed.
- State manager updates progress.
- Mind map updated.
- Next question generated.

### UI Logic

- Fully modular components for rapid iteration.
- Minimal external dependencies.
- Follow UI visual reference for consistent look/feel.

### Dev Stack

- Use modern web framework suitable for Windsurf AI agent control (e.g. Flet, React, Streamlit, or equivalent).
- Responsive design baked in from start.
- Modular code to simplify future scaling.

