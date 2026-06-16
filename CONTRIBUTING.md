# Contributing

AgencyOS AI is built as a public portfolio SaaS project with production engineering standards.

## Local Workflow

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Run `npm run check` before opening a pull request.

## Pull Request Standards

- Keep changes focused.
- Add tests for business logic.
- Update docs when behavior changes.
- Never commit secrets, `.env` files, private keys, or generated build output.

## Commit Style

Use clear conventional commits:

- `feat: add tenant access foundation`
- `fix: validate invoice totals`
- `docs: document AI workflow`
- `test: cover role permissions`
