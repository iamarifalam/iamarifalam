# Contributing to Agentic Routing Framework

First off — **thank you!** 🎉  
Whether it's a typo fix, a new test, or a full feature — every contribution makes this project better for thousands of AI engineers worldwide.

---

## 🧭 First Time? Start Here

👉 **[See our curated Good First Issues list](GOOD_FIRST_ISSUES.md)**  
We have tasks for **all skill levels** — from 15-minute doc fixes to 2-hour feature builds.

💬 **Have questions before you start?**  
Open a [GitHub Discussion](https://github.com/iamarifalam/iamarifalam/discussions) — Arif personally responds!

---

## ⚡ Setup in 2 Commands

```bash
git clone https://github.com/iamarifalam/iamarifalam.git && cd iamarifalam
make dev    # installs everything: dependencies + pre-commit hooks + linting tools
```

Verify it all works:
```bash
make test   # should show: 8 passed
make lint   # should show: no issues
```

---

## 🚀 Contribution Workflow

### 1. Pick an Issue
- Browse [Good First Issues](GOOD_FIRST_ISSUES.md) or [open issues](https://github.com/iamarifalam/iamarifalam/issues).
- Comment **"I'd like to work on this!"** to claim it (prevents duplicate work).

### 2. Fork & Branch
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/iamarifalam.git
cd iamarifalam
git checkout -b fix/your-descriptive-branch-name
```

### 3. Code & Test
- Make your changes
- Add or update tests in `tests/test_routing.py`
- Run the full suite: `make test`
- Lint your code: `make lint && make format-check`

### 4. Commit (Conventional Commits)
We use [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat: add OpenAI GPT-4o adapter"
git commit -m "fix: correct keyword matching in router"
git commit -m "docs: improve async router usage example"
git commit -m "test: add SafetyGuardrail injection test"
```

### 5. Open a Pull Request
- Push to your fork and open a PR targeting `main`
- Fill out the PR template
- Our CI pipeline runs automatically — it must pass before merging
- Arif will personally review and respond within 48h ⚡

---

## ✅ PR Checklist

Before submitting, ensure:
- [ ] `make test` — all 8 tests pass
- [ ] `make lint` — no linting errors
- [ ] New functionality has a corresponding test
- [ ] Documentation is updated if behavior changed
- [ ] Commit messages follow conventional commit format

---

## 🏷️ Issue Labels Guide

| Label | Meaning |
|:---|:---|
| `good first issue` | Perfect for first-time contributors |
| `help wanted` | We actively need help here |
| `enhancement` | New feature or improvement |
| `bug` | Something is broken |
| `documentation` | Docs-only change |
| `security` | Security-sensitive change — extra review required |

---

## 📜 Code of Conduct
All interactions must follow our [Code of Conduct](.github/CODE_OF_CONDUCT.md).

---

*Questions? Open a [GitHub Discussion](https://github.com/iamarifalam/iamarifalam/discussions) or DM [@arifalam4u](https://twitter.com/arifalam4u) on X.*
