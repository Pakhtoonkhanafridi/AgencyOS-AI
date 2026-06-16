# AgencyOS AI

AI-native CRM SaaS for service agencies with client management, workflow automation, billing, analytics, and blockchain audit proofs.

## Current Status

**Day 2 build update: 2026-06-16**

The project now includes the SaaS foundation and a tenant access control model. This is the first security-critical domain layer required before building client records, invoices, AI summaries, and blockchain audit proofs.

## Business Problem

Small service agencies often run client data, deals, invoices, notes, and documents across spreadsheets, chat apps, and disconnected CRMs. AgencyOS AI centralizes agency operations and adds practical AI assistance for faster client service.

## Key Features Planned

- Multi-tenant agency workspaces
- Role-based access control
- Clients, leads, deals, tasks, notes, and activity timeline
- AI client summaries and message drafting
- Invoice and subscription billing
- Analytics for revenue, pipeline, and team performance
- Blockchain proof records for important client documents and actions

## Tech Stack

| Area | Stack |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js route handlers |
| Database/Auth | Supabase Postgres, Supabase Auth, RLS |
| AI | OpenAI Responses API |
| Payments | Stripe |
| Blockchain | Solidity and EVM proof registry |
| Quality | Vitest, Playwright, ESLint, GitHub Actions |

## Engineering Highlights

- Multi-tenant architecture from the start
- Explicit role and permission matrix
- Tests for authorization boundaries
- Public PRD, architecture, roadmap, and build log
- CI workflow included from the first public branch
- Secrets documented through `.env.example` and excluded by `.gitignore`

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
```

## API Surface

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Runtime health check |

## Documentation

- [Product Requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [12-Month Roadmap](docs/ROADMAP.md)
- [Build Log](docs/BUILD_LOG.md)
- [Security Model](docs/SECURITY_MODEL.md)
- [Prompt Workflow](docs/PROMPT_WORKFLOW.md)

## Suggested GitHub Description

AI-native CRM SaaS for service agencies with role-based access, workflow automation, billing, analytics, and blockchain audit proofs.

## Suggested Topics

`nextjs`, `typescript`, `supabase`, `openai`, `saas`, `crm`, `rbac`, `solidity`

## License

MIT
