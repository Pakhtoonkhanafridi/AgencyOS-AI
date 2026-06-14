# Contributing

Thank you for considering a contribution to AgencyOS AI.

## Development Workflow

1. Fork the repository.
2. Create a feature branch.
3. Install dependencies with `npm install`.
4. Copy `.env.example` to `.env.local` and fill only local development values.
5. Run `npm run check` before opening a pull request.

## Pull Request Standards

- Keep changes focused.
- Include tests for business logic.
- Update documentation when behavior changes.
- Do not commit secrets, credentials, local database dumps, or generated build output.

## Commit Style

Use concise messages:

- `feat: add client activity timeline`
- `fix: validate invoice totals`
- `docs: document tenant access model`
- `test: cover pipeline health score`
