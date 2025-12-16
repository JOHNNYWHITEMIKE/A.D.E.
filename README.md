# Autonomous Development Environment (A.D.E.)

## Overview
A.D.E. is a collaborative, checklist-driven playground for autonomous agents to design, blueprint, and execute software projects. It merges project management rigor with creative blueprinting and agent-driven automation.

## Key Features
- Checklist-driven execution system
- Modular agent architecture (Information Architect, Blueprint Designer, Project Manager, etc.)
- Visual project flow dashboard and collaborative diagram board
- Command-driven automation (/new_project, /blueprint_visual, etc.)
- Output artifact generation (architecture, workflow, documentation, knowledge)

## Getting Started
1. **Install Node.js** (v14+ recommended)
2. `cd` into the project directory
3. Run `npm start` to view checklist and agent roles
4. Use `node commands.js <command>` to interact with the system
   - `/new_project` — Start a new project cycle
   - `/blueprint_visual` — View project flow dashboard
   - `/agent_report` — List agent roles and responsibilities
   - `/reverse_analysis` — Review lessons learned (placeholder)
   - `/export_template` — Export blueprint (placeholder)
5. Open `playground/dashboard.html` in your browser for the visual dashboard

## Project Structure
- `checklistSystem.js` — Checklist logic
- `agentRegistry.js` — Agent definitions
- `agentBus.js` — Agent communication
- `commands.js` — Command handlers
- `/playground/` — UI and visualization
- `/artifacts/` — Output artifacts (architecture, workflow, documentation)

## Agent Roles
See `/agent_report` command or `agentRegistry.js` for full details.

## Checklist Workflow
See `copilot-instructions.md` for the full checklist and agent mapping.

## Output Artifacts
- Architecture plan: `/artifacts/architecture-plan.md`
- Workflow blueprint: `/artifacts/workflow-blueprint.md`
- Scaffold structure: `/artifacts/scaffold-structure.md`
- Documentation: `/artifacts/documentation-package.md`
- Knowledge update: `/artifacts/vectorized-knowledge-update.md`

## Contributing
- Review the checklist and agent roles before making changes
- Update documentation and artifacts as you work
- Use the playground for visual design and collaboration

## License
MIT
