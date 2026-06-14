# Prompt Engineering Workflow

This project is intentionally built through AI-assisted development. The maintainer acts as Product Owner, Prompt Engineer, QA reviewer, and release owner.

## Rule

AI can write the implementation, but the maintainer owns requirements, review, testing, and product decisions.

## Feature Prompt Template

```text
Act as a Staff Software Engineer and Product Engineer.

We are building AgencyOS AI, a production SaaS CRM for service agencies.

Task:
Build [FEATURE NAME].

Before coding:
1. Review the existing codebase.
2. Identify the right files and architecture.
3. Explain the implementation plan briefly.

Implementation requirements:
- Use TypeScript.
- Follow existing project patterns.
- Add validation, error handling, loading states, and empty states.
- Add tests where practical.
- Update documentation if behavior changes.
- Preserve existing behavior unless a bug is clearly present.

After coding:
1. Run lint, typecheck, test, and build.
2. Fix failures.
3. Summarize changed files.
4. Explain how to verify manually.
```

## Review Prompt Template

```text
Act as a senior code reviewer and technical recruiter.

Review this feature for:
- Code quality
- Security
- Maintainability
- Scalability
- Recruiter appeal
- Missing tests
- Documentation gaps

Then fix the highest-impact issues directly.
```

## Release Prompt Template

```text
Act as a release engineer.

Prepare this project for release:
- Run quality checks.
- Review environment variables.
- Update README and CHANGELOG.
- Confirm no secrets are committed.
- Create a clean commit message.
- Prepare a release summary for LinkedIn and GitHub.
```

## Weekly Cadence

- Monday: plan one feature
- Tuesday and Wednesday: implement through Codex
- Thursday: test and fix
- Friday: documentation and screenshots
- Saturday: article or LinkedIn post
- Sunday: roadmap review
