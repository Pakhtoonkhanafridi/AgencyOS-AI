# Security Policy

## Supported Version

Security fixes are applied to the `main` branch during active development.

## Reporting A Vulnerability

Please do not open public issues for secrets, auth bypasses, payment problems, or data exposure. Contact the maintainer privately and include reproduction steps, impact, and suggested remediation if available.

## Security Principles

- Store secrets only in environment variables.
- Keep Supabase service role keys on the server.
- Use tenant-scoped database queries and Row Level Security.
- Store blockchain hashes only, never raw client documents.
- Validate external input with schema validation.
- Log operational events without exposing private customer data.
