# System Design Case Study

## Title

Designing AgencyOS AI: A Multi-Tenant AI CRM For Service Agencies

## Status

Draft. This document will be expanded as the product ships.

## Problem

Service agencies need one workspace for clients, pipeline, operations, billing, AI assistance, and auditability.

## Requirements

### Functional

- Manage clients, deals, tasks, invoices, and activity history.
- Generate AI summaries and drafts from structured customer context.
- Support multiple organizations and user roles.
- Create verifiable proof hashes for important records.

### Non-Functional

- Secure tenant isolation.
- Fast dashboard reads.
- Reliable billing workflows.
- Low AI cost per user action.
- Clear audit trail.

## High-Level Design

AgencyOS AI uses a modular monolith architecture with server-side route handlers, Supabase Postgres, and isolated feature modules.

## Tradeoffs

- Modular monolith over microservices for faster delivery and simpler deployment.
- Supabase over custom auth to reduce operational burden.
- Blockchain hashes over raw on-chain documents to protect privacy.
- Prompt evaluation before fine-tuning to keep the AI system practical.

## Future Sections

- Database scaling plan
- AI evaluation strategy
- Cost model
- Failure modes
- Observability plan
- Security review
