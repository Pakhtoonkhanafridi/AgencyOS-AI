# Database Design

## Core Tables

| Table | Purpose |
| --- | --- |
| `organizations` | Agency workspaces |
| `profiles` | Application user profiles |
| `memberships` | Organization membership and roles |
| `clients` | Customer and lead records |
| `deals` | Sales pipeline opportunities |
| `tasks` | Operational work items |
| `activity_events` | Timeline events for audit and collaboration |
| `invoices` | Billing records |
| `ai_artifacts` | AI summaries, drafts, and review outputs |
| `proof_records` | Hashes prepared for blockchain verification |

## Design Principles

- Use UUID primary keys.
- Include `organization_id` on tenant-owned records.
- Add `created_at` and `updated_at` timestamps.
- Keep financial values in integer minor units.
- Use enums or constrained text for statuses.
- Use Row Level Security for tenant isolation.

## First Migration

The initial schema lives in `supabase/migrations/0001_initial_schema.sql`.

## Future Improvements

- Add database indexes after realistic query patterns are measured.
- Add audit triggers for sensitive changes.
- Add read models for dashboard analytics.
- Add retention policies for AI artifacts and uploaded documents.
