// agentRegistry.js
// Defines agent roles, responsibilities, and collaboration logic for A.D.E.

const AGENTS = {
  'Information Architect': {
    responsibilities: [
      'Designs and governs information architecture',
      'Defines data semantics, workflows, and schemas',
      'Ensures compliance with project management methodologies',
      'Creates visual project management maps',
      'Interfaces with Blueprint Designer',
      'Trained in PMBOK, Agile, Scrum, BPMN, UML, ERD, ontology modeling'
    ]
  },
  'Blueprint Designer': {
    responsibilities: [
      'Converts architecture into visual, reusable templates',
      'Designs UI/UX, data flow, and execution timeline visualization',
      'Maintains blueprint pattern library'
    ]
  },
  'Project Manager': {
    responsibilities: [
      'Oversees checklist-driven automation flow',
      'Delegates tasks and verifies completion',
      'Reports updates to Central Assistant'
    ]
  },
  'Central Assistant': {
    responsibilities: [
      'Monitors and validates progress',
      'Synchronizes agents',
      'Acts as status monitor and resolves errors'
    ]
  },
  'Load Balancer': {
    responsibilities: [
      'Distributes workloads',
      'Prevents overutilization and idle states',
      'Ensures agent synchronization'
    ]
  },
  'Reverse Engineer': {
    responsibilities: [
      'Evaluates completed projects for lessons learned',
      'Reverse-engineers structure and dependencies',
      'Provides feedback to Information Architect'
    ]
  }
};

function getAgentResponsibilities(agentName) {
  return AGENTS[agentName]?.responsibilities || [];
}

function listAgents() {
  return Object.keys(AGENTS);
}

module.exports = {
  AGENTS,
  getAgentResponsibilities,
  listAgents
};
