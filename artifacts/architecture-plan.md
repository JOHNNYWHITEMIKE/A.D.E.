# Gig Platform Discovery & Automation Architecture

## Executive Summary
Comprehensive enumeration and enrichment of 100+ gig economy platforms with automation-readiness flags, monetization strategies, and API discovery for downstream integration.

## System Components

### 1. Data Layer
- **Source**: `backend/core/gig_platforms_data.py` (100+ platforms)
- **Enrichment**: `backend/core/gig_platforms_enrichments.py` (research-backed metadata)
- **Normalized Schema**: Unified TypedDict with 40+ fields per platform

### 2. Classification Engine
- **Automation Flags**: Boolean `agent_automation_friendly` per platform
  - High-automation: surveys, testing panels (bot-capable)
  - Low-automation: delivery, rideshare, childcare (human-required)
- **Monetization Plays**: Strategic revenue levers by category
  - Surveys: bot-enabled throughput + multi-panel arbitrage
  - Delivery: route batching + surge targeting
  - Freelance: profile factory + proposal automation + lead scoring
  - Education: course/listing factory + SEO + tutor matching

### 3. API Discovery System
- **Static Analysis**: Code scanning across 7 repositories
- **Spec Fetching**: Probing 87 gig platform URLs for public OpenAPI specs
- **Output**: Combined manifest with discovered endpoints, methods, and schemas

### 4. Integration Points
- FastAPI backend exposing `/api/gig-platforms` discovery endpoints
- API gateway rules generated from discovered endpoints
- Rate limiting, auth validation, and monitoring per endpoint

## Data Flow

```
Research → Enrichment → Normalization → Classification → API Exposure
  └─ Platform metadata
     └─ Default fills by category
        └─ Schema validation
           └─ Automation + monetization flags
              └─ Discovery endpoints / Gateway config
```

## Entities & Relationships

- **GigPlatform**: Core platform record with 40+ metadata fields
- **Enrichment**: Research-backed enhancements (earnings, payment methods, etc.)
- **Classification**: Automation flags + monetization strategies
- **APISpec**: Discovered OpenAPI specs and endpoints
- **DiscoveryEndpoint**: Derived routes for agent access

### Ontology
- **Concepts**: Platform, Category, Automation, Monetization, APIEndpoint
- **Properties**: name, regions, earnings, automation_friendly, monetization_play
- **Dependencies**: Enrichment → Classification → API Exposure

## Automation-Ready Categories

| Category | Automation-Friendly | Play |
|----------|:---:|---|
| Online Surveys | ✅ | Bot throughput + panel arbitrage |
| User Testing | ✅ | Test automation + matching |
| Delivery | ❌ | Route optimization (human-driven) |
| Rideshare | ❌ | Surge timing (human-driven) |
| Freelance | ❌ | Proposal automation + lead scoring |
| Education | ❌ | Content factory + SEO |
| Pet/Childcare | ❌ | Booking + compliance ops |
| Rental | ❌ | Dynamic pricing + calendar sync |

## Success Criteria
- [x] All 100+ platforms indexed with normalized metadata
- [x] Automation-readiness flagged per platform
- [x] Monetization strategies defined per category
- [x] API specs fetched from live endpoints (6 specs recovered)
- [x] Schema supports downstream agent discovery
- [ ] Gateway rules auto-generated and deployed
- [ ] Continuous discovery via CI/cron

## Next Phase: Monetization Engine
Build agent-driven workflows leveraging automation-friendly platforms:
1. Multi-survey arbitrage (panel hopping)
2. Test batching + priority routing
3. Lead aggregation + qualification
4. Dynamic pricing optimization (rentals)
5. Proposal bulk-gen + matching (freelance)

