# Public Project Roadmap

This roadmap outlines the major milestones and planned features for the **Agentic Routing Framework**. It follows a quarterly release cadence with semantic versioning.

---

## ✅ Released: v1.0.0 — Foundation (Q3 2026)
- [x] Synchronous `AgentRouter` with cognitive dispatch logic
- [x] Asynchronous `AsyncAgentRouter` with batch query processing
- [x] `SafetyGuardrail` — PII leak + prompt injection interception
- [x] `ContextEvaluator` — RAG grounding + hallucination scoring
- [x] `AnthropicAdapter` — Claude 3.7 Sonnet / Haiku integration
- [x] `VectorDBAdapter` — Similarity search adapter
- [x] `agentic-cli` Terminal tool
- [x] Full test suite (8 tests, 100% pass rate across Python 3.9–3.12)
- [x] GitHub Actions: CI, CodeQL, Linting, Release, Dependabot, Stale
- [x] CODEOWNERS, Pre-commit hooks, Docker Compose
- [x] MIT License, OpenSSF Security Policy, CONTRIBUTING, CODE_OF_CONDUCT

---

## 🚧 In Progress: v1.1.0 — Integrations (Q4 2026)
- [ ] LangGraph native state machine builder integration
- [ ] ChromaDB + Pinecone VectorDB adapters
- [ ] OpenAI GPT-4o / Gemini 1.5 Pro adapter support
- [ ] Multi-agent orchestration with supervisor routing
- [ ] Streaming output support (SSE / WebSocket)
- [ ] REST API server (`FastAPI` based, Docker-ready)

---

## 🔭 Planned: v2.0.0 — Production Scale (Q1 2027)
- [ ] Distributed tracing with OpenTelemetry
- [ ] Redis-backed session state persistence
- [ ] A/B testing framework for agent routing strategies
- [ ] LLM evaluation harness (RAGAS, LangSmith integrations)
- [ ] Production monitoring dashboard (Prometheus + Grafana)
- [ ] Cloud deployment templates (AWS Lambda, GCP Cloud Run, Azure Container Apps)
- [ ] PyPI official package release

---

> 💡 Have a feature request? [Open an issue](https://github.com/iamarifalam/iamarifalam/issues) and label it `enhancement`.
