---
title: "Git Commit Message Best Practices"
author: Lulu Zhang
pubDate: 2026-05-26
description: "A complete guide to writing industry-standard git commit messages with clear structure, real examples, and practical engineering workflows."
tags: ["git", "frontend", "workflow", "best-practices", "engineering", "career"]
image:
  url: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=2286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt: "Terminal showing git log with clean commit history."
---

Writing commit messages is not just about recording changes. In real engineering workflows, commit history is treated as a **communication layer between developers over time**.

A well-structured commit history helps with:

- Debugging production issues faster
- Making code reviews more efficient
- Automating changelog generation
- Long-term maintainability
- Clear team collaboration

---

## 1. Standard Commit Format (Conventional Commits)

Most modern engineering teams follow the **Conventional Commits** specification:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

A real example:

```
feat(auth): add Google OAuth login support

Integrated Google OAuth 2.0 using passport-google-oauth20.
Users can now sign in with their Google account on the login page.

Closes #142
```

---

## 2. Commit Types — What Each One Means

| Type       | When to use it                                   |
| ---------- | ------------------------------------------------ |
| `feat`     | A new feature visible to the user                |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes only                       |
| `style`    | Formatting, missing semicolons — no logic change |
| `refactor` | Code restructure without changing behavior       |
| `perf`     | Performance improvement                          |
| `test`     | Adding or updating tests                         |
| `chore`    | Build process, dependency updates, tooling       |
| `ci`       | CI/CD config changes                             |
| `revert`   | Reverting a previous commit                      |

---

## 3. The Golden Rules

**Write in imperative mood — like a command.**

```bash
# ✅ Good
feat(cart): add quantity selector to product card
fix(api): handle null response from payment gateway
refactor(utils): extract date formatting into helper

# ❌ Bad
added quantity selector
fixed a bug
some refactoring
```

Think of it this way: your commit message completes the sentence _"If applied, this commit will..."_

- ✅ `feat(nav): add mobile hamburger menu` → _"If applied, this commit will add mobile hamburger menu"_
- ❌ `added hamburger menu` → doesn't read as an instruction

---

## 4. Scope — Be Specific

The scope (the part in parentheses) tells your team **where** the change happened.

```bash
feat(auth): ...        # authentication system
fix(dashboard): ...    # dashboard page
chore(deps): ...       # dependencies
style(button): ...     # Button component
test(api/user): ...    # user API tests
```

Keep scopes consistent across your team. If your repo uses `auth`, don't mix in `authentication`.

---

## 5. Writing a Good Body

For non-trivial changes, add a body after a blank line. Explain **why**, not **what** — the diff already shows what changed.

```
refactor(store): replace Redux with Zustand for cart state

Redux was adding significant boilerplate for a relatively simple
cart state that only needed local UI management. Zustand reduces
the setup to a single file and removes the need for action
creators and reducers entirely.

No behavior changes — all cart operations remain identical.
```

---

## 6. Referencing Issues and PRs

Most teams link commits to tickets automatically:

```bash
fix(checkout): prevent double submission on slow networks

Closes #88
Refs #102
Co-authored-by: Jane Doe <jane@example.com>
```

GitHub and GitLab will auto-close the linked issue when this commit lands on the main branch.

---

## 7. Real Workflow Example

Here's what a clean feature branch looks like from start to finish:

```bash
# Start your branch
git checkout -b feat/user-avatar-upload

# Work incrementally, commit as you go
git commit -m "feat(avatar): add file input to profile settings page"
git commit -m "feat(avatar): upload image to S3 on form submit"
git commit -m "feat(avatar): display uploaded avatar in nav and profile"
git commit -m "test(avatar): add unit tests for upload handler"
git commit -m "fix(avatar): handle unsupported file type with error message"

# Before merging, clean up if needed
git rebase -i origin/main
```

After merging, your `git log` tells a clear story — no detective work needed.

---

## 8. Bad Commits to Avoid

```bash
# ❌ These destroy your history
git commit -m "fix"
git commit -m "wip"
git commit -m "asdfgh"
git commit -m "changes"
git commit -m "update stuff"
git commit -m "final"
git commit -m "FINAL FINAL"
```

These are useless to anyone — including future you at 2am debugging a production incident.

---

## 9. Enforce It with Tooling

Don't rely on discipline alone. Automate the standard:

```bash
# Install commitlint + husky
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

```js
// commitlint.config.js
export default {
  extends: ["@commitlint/config-conventional"],
};
```

```bash
# Set up the commit-msg hook
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

Now if anyone on the team pushes a bad commit message, the hook rejects it before it goes anywhere.

---

## Summary

| Rule                               | Why it matters                             |
| ---------------------------------- | ------------------------------------------ |
| Use Conventional Commits format    | Enables automation, clarity, consistency   |
| Write in imperative mood           | Reads as intent, not description           |
| Add a body for non-trivial changes | Explains the _why_ behind decisions        |
| Use consistent scopes              | Makes filtering and searching history easy |
| Link to issues                     | Creates traceability across tools          |
| Enforce with commitlint + husky    | Removes reliance on team discipline        |

Clean commit history is a sign of a professional engineering team. It costs 30 extra seconds per commit and saves hours during every incident, review, and onboarding.
