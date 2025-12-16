// main.js
// Entry point for A.D.E. checklist-driven workflow system

const { getChecklist, markPhaseComplete, initializeChecklist } = require('./checklistSystem');
const { AGENTS, getAgentResponsibilities, listAgents } = require('./agentRegistry');

function printChecklist() {
  const checklist = getChecklist();
  console.log('\nA.D.E. Project Checklist:');
  checklist.forEach(item => {
    console.log(`${item.order}. ${item.phase} → ${item.agent} [${item.status}]`);
  });
}

function printAgentRoles() {
  console.log('\nAgent Roles and Responsibilities:');
  listAgents().forEach(agent => {
    console.log(`\n${agent}:`);
    getAgentResponsibilities(agent).forEach(r => console.log(`  - ${r}`));
  });
}

function run() {
  if (getChecklist().length === 0) {
    initializeChecklist();
    console.log('Initialized checklist.');
  }
  printChecklist();
  printAgentRoles();
}

run();
