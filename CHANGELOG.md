# Changelog

All notable changes to the **Agentic Routing Framework** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-29

### Added
- **Core Router**: Synchronous `AgentRouter` class with dynamic node dispatch and query routing logic.
- **Async Engine**: `AsyncAgentRouter` for high-throughput batch query processing.
- **Safety Guardrails**: `SafetyGuardrail` module for intercepting PII leaks and prompt injection attacks.
- **Evaluator**: `ContextEvaluator` for RAG grounding and factual consistency checking.
- **Adapters**: `AnthropicAdapter` (Claude 3.7 Sonnet) and `VectorDBAdapter`.
- **CLI**: `agentic-cli` terminal utility.
- **Documentation**: Comprehensive `API_REFERENCE.md`, `BENCHMARKS.md`, `EXAMPLES.md`, and `ARCHITECTURE.md`.
- **CI/CD**: GitHub Actions matrix test runners for Python 3.9–3.12 and stale issue automation.
- **Open Source Governance**: MIT License, Security Policy, Contribution Guide, Code of Conduct, and Issue/PR Templates.
