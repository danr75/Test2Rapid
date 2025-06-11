# SYSTEM.md

## Global Build Rules for Windsurf AI

1. Follow atomic task list in TASKS.md.
2. Do not skip, combine, or assume tasks.
3. Each task should:
    - Be small, testable, focused on one concern.
    - Have clear start and end.
    - Build minimal code required for that task.
    - Preserve working functionality.
4. Use AI to reduce code volume where appropriate.
5. Use AI agents where applicable to simplify functionality.
6. Write precise, modular, testable code.
7. Do not break existing functionality.
8. After each task: stop. Human will test before proceeding.
9. When fixing bugs: suggest single fix, await human validation before further steps.
10. Always prioritize modular design to allow easy feature expansion.
11. Use placeholder code where external systems are not yet integrated.
12. Respect architecture defined in ARCHITECTURE.md.
13. Never make sweeping changes outside the scope of current task.

## Design Notes

- The primary goal is working, testable prototypes to validate frontend functionality.
- Focus on UI, AI question generation, feedback loop, and mind map visualization.
- Use modern frameworks and libraries suitable for rapid prototyping.
