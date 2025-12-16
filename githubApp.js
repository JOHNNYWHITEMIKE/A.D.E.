// githubApp.js — helper to exchange GitHub App credentials for an installation token
const https = require('https');
const jwt = require('jsonwebtoken');

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

async function getInstallationToken({ appId, installationId, privateKeyPem }) {
  if (!appId || !installationId || !privateKeyPem) throw new Error('Missing GitHub App credentials');
  // JWT: issued at now, expires in 60s (short lived)
  const now = Math.floor(Date.now() / 1000);
  const payload = { iat: now - 60, exp: now + (60 * 9), iss: appId };
  const token = jwt.sign(payload, privateKeyPem, { algorithm: 'RS256' });

  const options = {
    hostname: 'api.github.com',
    path: `/app/installations/${installationId}/access_tokens`,
    method: 'POST',
    headers: {
      'User-Agent': 'ade-agent/1.0',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    }
  };

  const res = await request(options, null);
  return res.token;
}

module.exports = { getInstallationToken };
