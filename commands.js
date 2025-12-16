// commands.js
// Command handler for A.D.E. system commands

const { initializeChecklist, getChecklist } = require('./checklistSystem');
const { PHASES } = require('./checklistSystem');
const { AGENTS } = require('./agentRegistry');
const fs = require('fs');
const path = require('path');

function handleCommand(cmd) {
  switch (cmd) {
    case '/new_project':
      initializeChecklist();
      return 'Checklist reset. New project cycle started.';
    case '/blueprint_visual':
      return 'Blueprint visual: See playground/dashboard.html for project flow.';
    case '/agent_report':
      return agentReport();
    case '/reverse_analysis':
      return 'Reverse analysis: Lessons learned and architecture review placeholder.';
    case '/export_template':
      return 'Export template: Blueprint export placeholder.';
    default:
      return 'Unknown command.';
  }
}

function agentReport() {
  return Object.entries(AGENTS).map(([name, data]) => {
    return `Agent: ${name}\n- Responsibilities:\n  - ${data.responsibilities.join('\n  - ')}`;
  }).join('\n\n');
}

// CLI usage
if (require.main === module) {
  const cmd = process.argv[2];
  if (!cmd) {
    console.log('Usage: node commands.js <command>');
    process.exit(1);
  }
  console.log(handleCommand(cmd));
}

module.exports = { handleCommand };
