// githubIssue.js — minimal helper to create GitHub issues when GH_TOKEN is provided
const https = require('https');

function request(options, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
        } else {
          reject(new Error(`GitHub API error ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function createIssueDirect({ owner, repo, title, body }) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_API_TOKEN || process.env.GH_PERSONAL_TOKEN;
  if (!token) throw new Error('GH token not available in environment; set GH_TOKEN to enable auto-issues');

  const payload = JSON.stringify({ title, body });
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/issues`,
    method: 'POST',
    headers: {
      'User-Agent': 'ade-agent/1.0',
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  return request(options, payload);
}

async function dispatchRepositoryEvent({ owner, repo, event_type, client_payload }) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_API_TOKEN || process.env.GH_PERSONAL_TOKEN;
  if (!token) throw new Error('GH token not available in environment; set GH_TOKEN to enable repository dispatch');

  const payload = JSON.stringify({ event_type, client_payload });
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/dispatches`,
    method: 'POST',
    headers: {
      'User-Agent': 'ade-agent/1.0',
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  return request(options, payload);
}

// Public: prefer repository dispatch (runs on GitHub Actions) for auditable issue creation.
// Fallbacks to direct issue creation if dispatch is disabled or fails.
async function createIssueIfPossible({ owner, repo, title, body, agent, phase }) {
  const useDispatch = (process.env.USE_REPO_DISPATCH || 'true').toLowerCase() === 'true';
  if (useDispatch) {
    try {
      const client_payload = { title, body, agent, phase, created_by: 'A.D.E.' };
      await dispatchRepositoryEvent({ owner, repo, event_type: 'ade_phase_completed', client_payload });
      return { dispatched: true };
    } catch (err) {
      // Fall back to direct issue creation
      console.log('Repository dispatch failed, falling back to direct issue creation:', err.message);
    }
  }
  return createIssueDirect({ owner, repo, title, body });
}

module.exports = { createIssueIfPossible, createIssueDirect, dispatchRepositoryEvent };
