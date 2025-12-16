// agentDemo.js
// Demonstrates agent communication and reporting using AgentBus

const AgentBus = require('./agentBus');
const { listAgents } = require('./agentRegistry');

const bus = new AgentBus();

// Example: Each agent subscribes to a status update event
listAgents().forEach(agent => {
  bus.subscribe('status-update', agent, payload => {
    console.log(`[${agent}] received status update:`, payload);
  });
});

// Example: Project Manager publishes a status update
bus.publish('status-update', {
  phase: 'Scaffold the Project',
  status: 'in-progress',
  by: 'Project Manager'
});

// Example: Central Assistant publishes a completion event
bus.publish('status-update', {
  phase: 'Scaffold the Project',
  status: 'complete',
  by: 'Central Assistant'
});
