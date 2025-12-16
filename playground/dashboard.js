// dashboard.js
// Loads checklist and agent data for the dashboard

fetch('../checklist.json')
  .then(r => r.json())
  .then(data => {
    const checklist = data.checklist;
    const ul = document.getElementById('checklist-list');
    checklist.forEach(item => {
      const li = document.createElement('li');
      li.className = 'checklist-item ' + item.status;
      li.textContent = `${item.order}. ${item.phase} → ${item.agent} [${item.status}]`;
      ul.appendChild(li);
    });
  });

fetch('../agents.json')
  .then(r => r.json())
  .then(data => {
    const agents = data.agents;
    const ul = document.getElementById('agent-list');
    agents.forEach(agent => {
      const li = document.createElement('li');
      li.innerHTML = `<b>${agent.name}</b><ul>${agent.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>`;
      ul.appendChild(li);
    });
  });
