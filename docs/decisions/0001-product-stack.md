# TDR 0001: Product Stack

## Status

Accepted

## Context

The product needs to demonstrate full-stack SaaS delivery, AI integration, secure multi-tenancy, and blockchain audit infrastructure without becoming too broad to finish.

## Decision

Use Next.js, TypeScript, Supabase, OpenAI, Stripe, Solidity, Foundry, Vercel, Vitest, Playwright, and GitHub Actions.

## Rationale

- Next.js gives a fast path to full-stack product delivery.
- Supabase provides Postgres, Auth, and RLS for SaaS tenancy.
- OpenAI enables practical AI workflows with server-side control.
- Stripe supports real monetization.
- Solidity and Foundry cover blockchain proof-of-audit features.
- Vercel and GitHub Actions keep deployment and CI straightforward.

## Consequences

- The project starts as a modular monolith.
- The backend can be extracted later if scale requires it.
- Security must focus strongly on tenant isolation and server-only secrets.
