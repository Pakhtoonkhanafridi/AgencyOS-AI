# Security Model

## Current Focus

The first security layer is tenant access control. A user must have an organization membership before accessing organization-owned records.

## Roles

| Role | Intent |
| --- | --- |
| owner | Full workspace and billing control |
| admin | Operational administration without ownership transfer |
| manager | Team and CRM operations |
| agent | Assigned client and task execution |
| viewer | Read-only visibility |

## Production Requirements

- App-level authorization checks
- Supabase RLS policies
- Server-side validation
- AI route rate limits
- Stripe webhook verification
- No private data on-chain
