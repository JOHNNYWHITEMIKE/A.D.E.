// checklistSystem.js
// Core logic for checklist-driven workflow in A.D.E.

const fs = require('fs');
const path = require('path');

const CHECKLIST_PATH = path.join(__dirname, 'copilot-instructions.md');

const PHASES = [
  { phase: 'Clarify Project Requirements', agent: 'Information Architect' },
  { phase: 'Scaffold the Project', agent: 'Project Manager' },
  { phase: 'Customize the Project', agent: 'Blueprint Designer + Architect' },
  { phase: 'Install Required Extensions', agent: 'Load Balancer' },
  { phase: 'Compile the Project', agent: 'Project Manager' },
  { phase: 'Create and Run Task', agent: 'Central Assistant' },
  { phase: 'Launch the Project', agent: 'Central Assistant + Load Balancer' },
  { phase: 'Ensure Documentation is Complete', agent: 'Reverse Engineer + Architect' }
];

function getChecklist() {
  if (!fs.existsSync(CHECKLIST_PATH)) return [];
  const content = fs.readFileSync(CHECKLIST_PATH, 'utf-8');
  return PHASES.map((p, i) => ({
    ...p,
    status: content.includes(`- [x] ${p.phase}`) ? 'complete' : 'incomplete',
    order: i + 1
  }));
}

function markPhaseComplete(phaseName) {
  let content = fs.readFileSync(CHECKLIST_PATH, 'utf-8');
  const regex = new RegExp(`- \[ \] ${phaseName}`);
  content = content.replace(regex, `- [x] ${phaseName}`);
  fs.writeFileSync(CHECKLIST_PATH, content, 'utf-8');
}

function initializeChecklist() {
  const lines = PHASES.map(p => `- [ ] ${p.phase} → ${p.agent}`);
  fs.writeFileSync(CHECKLIST_PATH, lines.join('\n'), 'utf-8');
}

module.exports = {
  getChecklist,
  markPhaseComplete,
  initializeChecklist,
  PHASES
};
