# Gig Platform Discovery — API Documentation & Usage

## Project Overview

**Gig Platform Discovery & Monetization Engine**  
A comprehensive system for indexing, classifying, and exposing 100+ gig economy platforms with automation-readiness flags and monetization strategies.

**Status**: ✅ Complete (All 8 A.D.E. phases)  
**Scope**: 100+ platforms, 40+ metadata fields, 87 live probes, 6 OpenAPI specs  
**Audience**: AI agents, platform scouts, monetization strategists, API consumers

## API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. Get All Gig Platforms
```http
GET /api/gig-platforms
```
**Response**: Array of all 100+ platforms with full metadata  
**Fields**: name, regions, category, earnings, automation_friendly, monetization_play, etc.

#### 2. Filter by Automation Readiness
```http
GET /api/gig-platforms?automation_friendly=true
```
**Response**: Platforms suitable for bot/automation (surveys, testing panels)  
**Count**: ~15 platforms

#### 3. Filter by Category
```http
GET /api/gig-platforms?category=Online%20Surveys
```
**Categories**: Delivery, Freelance, Education, Online Surveys, Pet Services, Rental, etc.

#### 4. Filter by Region
```http
GET /api/gig-platforms?regions=United%20States
```
**Response**: Platforms operating in specified region

#### 5. Get Platform by Name
```http
GET /api/gig-platforms/{name}
```
**Example**: `/api/gig-platforms/Upwork`

### Response Schema

```json
{
  "name": "string",
  "regions": ["string"],
  "category": "string",
  "description": "string",
  "website": "string",
  "average_earnings": "string",
  "payment_methods": ["string"],
  "verification_required": "boolean",
  "payout_frequency": "string",
  "background_check": "boolean",
  "insurance_provided": "boolean|string",
  "average_rating": "float",
  "active_users": "string",
  "founded_year": "integer",
  "agent_automation_friendly": "boolean",
  "monetization_play": "string",
  ...
}
```

## Platform Classifications

### Automation-Ready (True)
Suitable for bot/agent automation:
- Online Surveys (Branded Surveys, Survey Junkie, Opinion Outpost, etc.)
- User Testing (Userbrain, Userlytics, UserTesting, etc.)
- Micro-Tasks (Clickworker, Amazon Mechanical Turk, etc.)

**Monetization Play**: Bot-enabled throughput + multi-panel arbitrage

### Automation-Limited (False)
Require human execution:
- Delivery (DoorDash, Uber Eats, Instacart, etc.)
- Rideshare (Uber, Lyft, Bolt, etc.)
- Freelance (Upwork, Fiverr, Freelancer, etc.)
- Education (Preply, Superprof, Udemy, etc.)
- Pet/Childcare (Rover, Sitly, Babysits, etc.)
- Rental (Airbnb, VRBO, etc.)

**Monetization Plays**: Vary by segment (route batching, proposal factory, dynamic pricing, etc.)

## Enrichment Data

All 100+ platforms include:
- Verified earnings range
- Payment method support
- Verification/background check requirements
- Insurance coverage details
- Founded year & headquarters
- Supported languages
- Platform type & skill level
- Demand level & growth trend

## API Discovery Results

**Static Analysis**: Scanned 7 repositories, found 9 internal API endpoints  
**Live Probing**: Tested 87 gig platform URLs, recovered 6 public specs:
- Preply (openapi.json + openapi.yaml)
- UberEats (api.json)
- Thumbtack (openapi.yaml)
- PetBacker (swagger.json)
- Postmates (api.json)

**Manifest Location**: `/api-discovery-output/combined_api_manifest.json`

## Integration Examples

### Python (Requests)
```python
import requests

resp = requests.get("http://localhost:8000/api/gig-platforms?automation_friendly=true")
surveys = resp.json()
for platform in surveys:
    print(f"{platform['name']}: {platform['monetization_play']}")
```

### JavaScript (Fetch)
```javascript
fetch("/api/gig-platforms?category=Delivery")
  .then(r => r.json())
  .then(platforms => {
    platforms.forEach(p => console.log(p.name, p.monetization_play));
  });
```

### cURL
```bash
curl -s "http://localhost:8000/api/gig-platforms?automation_friendly=true" | jq '.[].name'
```

## Key Metrics

| Metric | Value |
|--------|-------|
| Total Platforms | 100+ |
| Automation-Ready | ~15 |
| Regions Covered | 20+ |
| Enrichment Fields | 40+ |
| API Specs Discovered | 6 |
| Internal Endpoints Found | 9 |
| Categories | 15+ |

## Next Steps

1. **Gateway Integration**: Auto-generate rate limiting & auth rules from discovered specs
2. **Agent Workflows**: Deploy monetization bots on automation-friendly platforms
3. **Continuous Discovery**: Add CI/cron job to re-scan endpoints monthly
4. **Marketplace**: Build UI for platform comparison & filtering
5. **Analytics**: Track agent performance per platform/category

## Support

For questions or additions, consult:
- Architecture: `artifacts/architecture-plan.md`
- Workflow: `artifacts/workflow-blueprint.md`
- Lessons Learned: `artifacts/vectorized-knowledge-update.md`

