# FAANG-Grade Development & Engineering Guide

Welcome to the internal engineering guide for the **Agentic Routing Framework**. This guide outlines development setup, code quality standards, testing protocols, and release management.

---

## 🛠️ Environment Setup

### 1. Clone & Initialize Virtual Environment
```bash
git clone https://github.com/iamarifalam/iamarifalam.git
cd iamarifalam

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -e .[dev]
```

---

## 🧪 Testing & Code Quality Protocols

### Running the Test Suite
All PRs must maintain 100% test pass rate across supported Python runtimes (3.9 - 3.12):
```bash
pytest tests/ --cov=agentic_routing
```

### Static Type Checking & Linting
We enforce strict typing with `mypy` and code formatting with `black` & `ruff`:
```bash
mypy agentic_routing/
black --check agentic_routing/ tests/
ruff check agentic_routing/
```

---

## 🚀 Release Process

Releases follow [Semantic Versioning 2.0.0](https://semver.org/). To cut a release:

1. Update `__version__` in `agentic_routing/__init__.py` and `version` in `pyproject.toml`.
2. Document release changes in `CHANGELOG.md`.
3. Create and push a signed git tag:
   ```bash
   git tag -a v1.0.1 -m "v1.0.1 release"
   git push origin v1.0.1
   ```
4. Automated GitHub Actions (`release.yml`) will build wheel distributions and publish GitHub Release notes.
