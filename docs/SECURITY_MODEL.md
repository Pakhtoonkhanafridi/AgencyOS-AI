# Security Model

## Key Risks

| Risk | Mitigation |
| --- | --- |
| Tenant data leakage | Organization-scoped tables and Row Level Security |
| Exposed secrets | `.env` ignored, server-only keys documented |
| AI data over-sharing | Send minimum necessary context to AI routes |
| Blockchain privacy leak | Store hashes only, never private content |
| Payment manipulation | Stripe webhooks verified server-side |
| Role escalation | Membership role checks on server routes |

## Data Handling

Client data is private by default. AI outputs must be treated as derived customer data. Blockchain records must contain only non-reversible hashes and metadata safe for public inspection.

## Production Checklist

- [ ] Enable Supabase RLS on all tenant-owned tables
- [ ] Add server-side authorization checks
- [ ] Add request validation to all API routes
- [x] Add baseline rate limiting to AI routes
- [x] Add baseline HTTP security headers
- [x] Keep AI and proof logic in testable server-side modules
- [ ] Verify Stripe webhook signatures
- [ ] Rotate keys before launch
- [ ] Add dependency scanning
- [ ] Add security review before blockchain mainnet usage
