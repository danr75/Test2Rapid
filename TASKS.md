# TASKS.md

## Phase 1: Scaffold Project

- Initialize project repository.
- Set up frontend framework (e.g. React, Flet, or equivalent rapid prototyping tool).
- Create project file structure following ARCHITECTURE.md.

## Phase 2: Core UI

- Build landing screen: "What would you like to learn today?" + input box + suggested topic tags.
- Build question screen: display topic, question text, 3 answer buttons (card style).
- Build feedback screen: green correct modal / red incorrect modal with learning tip/explanation.
- Build continue button to load next question.

## Phase 3: Mind Map

- Build simple dynamic mind map component.
- Add nodes when correct answer is submitted.
- Allow nodes to be clickable to review learning tip.

## Phase 4: AI Integration

- Integrate GPT-4 (or mock service) to generate MCQs.
- Generate 1 correct + 2 incorrect options per question.
- Generate short feedback explanations per answer.

## Phase 5: Progress Storage

- Implement basic state management to store user progress and mind map state (localStorage acceptable for prototype).

## Phase 6: Responsive Design

- Apply responsive styling to work across desktop, tablet, mobile.

## Phase 7: Polish & Test

- Smooth transitions.
- Clean modern design matching visual reference.
- Prepare for iterative user testing and feedback.
