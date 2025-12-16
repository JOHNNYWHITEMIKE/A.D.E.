// agentBus.js
// Simple event/message bus for agent communication and reporting in A.D.E.

class AgentBus {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, agent, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push({ agent, callback });
  }

  publish(event, payload) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(({ agent, callback }) => {
      callback(payload);
    });
  }

  unsubscribe(event, agent) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l.agent !== agent);
  }
}

module.exports = AgentBus;
