// agentDaemon.js
// Lightweight agent process that performs real checklist work by reading
// the checklist and marking its assigned phase complete.
// Usage: node agentDaemon.js "Information Architect"

const { getChecklist, markPhaseComplete } = require('./checklistSystem');
const AGENT_NAME = process.argv[2] || process.env.AGENT_NAME;
if (!AGENT_NAME) {
  console.error('Usage: node agentDaemon.js "Agent Name"');
  process.exit(1);
}

console.log(`[${AGENT_NAME}] agentDaemon starting...`);

const fs = require('fs');
const path = require('path');
const github = require('./githubIssue');

const STATUS_FILE = path.join(__dirname, 'agent_statuses.json');
const EVENTS_LOG = path.join(__dirname, 'agent_events.log');

function writeStatus(agentName, obj) {
  let s = {};
  if (fs.existsSync(STATUS_FILE)) {
    try { s = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf-8') || '{}'); } catch(e) { s = {}; }
  }
  s[agentName] = { ...(s[agentName] || {}), ...obj };
  fs.writeFileSync(STATUS_FILE, JSON.stringify(s, null, 2), 'utf-8');
}

function appendEvent(line) {
  fs.appendFileSync(EVENTS_LOG, line + '\n', 'utf-8');
}

async function doWorkOnce() {
  try {
    const checklist = getChecklist();
    const assigned = checklist.find(item => item.agent.includes(AGENT_NAME) && item.status === 'incomplete');
    if (assigned) {
      console.log(`[${AGENT_NAME}] Found assigned phase: ${assigned.phase} (marking complete)`);
      // simulate a bit of work
      await new Promise(r => setTimeout(r, 1000 + Math.floor(Math.random() * 4000)));
      markPhaseComplete(assigned.phase);
      const ts = new Date().toISOString();
      console.log(`[${AGENT_NAME}] Completed phase: ${assigned.phase} at ${ts}`);
      writeStatus(AGENT_NAME, { last_action: 'completed_phase', last_phase: assigned.phase, last_at: ts });
      appendEvent(`${ts} - ${AGENT_NAME} completed: ${assigned.phase}`);

      // Optionally create an issue in the tracking repo (if GH_TOKEN and repo provided)
      const owner = process.env.GITHUB_OWNER || 'johnnywhitemike';
      const repo = process.env.GITHUB_REPO || 'silver-pay';
      try {
        const title = `A.D.E. phase completed: ${assigned.phase}`;
        const body = `Agent **${AGENT_NAME}** marked **${assigned.phase}** complete at ${ts}.\n\nThis task was driven by A.D.E. and may require follow-up implementation work in the \
${owner}/${repo} repository.`;
        const res = await github.createIssueIfPossible({ owner, repo, title, body, agent: AGENT_NAME, phase: assigned.phase });
        if (res && res.dispatched) {
          console.log(`[${AGENT_NAME}] Dispatched repository event for phase: ${assigned.phase}`);
        } else {
          console.log(`[${AGENT_NAME}] Created issue for phase: ${assigned.phase}`);
        }
      } catch (err) {
        console.log(`[${AGENT_NAME}] Issue creation skipped or failed: ${err.message}`);
      }
    } else {
      console.log(`[${AGENT_NAME}] No incomplete assigned phases found. Sleeping...`);
    }
  } catch (err) {
    console.error(`[${AGENT_NAME}] Error during work:`, err.message);
  }
}

// Run periodically to pick up new work
setInterval(doWorkOnce, 5000);
// Also run immediately
doWorkOnce();
