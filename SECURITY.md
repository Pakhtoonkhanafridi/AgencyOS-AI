# Security Policy

## Security Principles

- Keep service role keys server-side only.
- Never commit `.env`, API keys, wallet private keys, or database credentials.
- Enforce tenant boundaries in both application logic and database RLS.
- Store blockchain hashes only, never private customer documents.
- Validate all external input before persistence or AI provider calls.

## Reporting

Do not open a public issue for sensitive vulnerabilities. Contact the maintainer privately with reproduction steps, impact, and suggested remediation.
