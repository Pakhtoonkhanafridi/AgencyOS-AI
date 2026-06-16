# Prompt Workflow

AgencyOS AI is built through AI-assisted development. The maintainer owns product requirements, review, QA, and release decisions.

## Feature Prompt

```text
Act as a Staff Software Engineer and Product Engineer.

We are building AgencyOS AI, a production SaaS CRM for service agencies.

Task:
Build [FEATURE NAME].

Requirements:
- Review the existing project first.
- Follow the current architecture.
- Use TypeScript.
- Add validation and error handling.
- Add tests for business logic.
- Update documentation.
- Preserve existing behavior.

After coding:
- Run lint, typecheck, tests, and build.
- Fix failures.
- Summarize changed files.
```

## Review Prompt

```text
Act as a senior code reviewer, technical recruiter, and security reviewer.

Review the latest changes for:
- Code quality
- Security
- Maintainability
- Recruiter appeal
- Test coverage
- Documentation gaps

Fix the highest-impact issues directly.
```
