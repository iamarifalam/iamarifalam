"""
Agentic Routing Framework
~~~~~~~~~~~~~~~~~~~~~~~~~
Production-grade open-source multi-agent routing engine with built-in RAG validation,
context evaluation, and security guardrails.

Copyright (c) 2026 Arif Alam. Released under MIT License.
"""

from .core import AgentRouter, RoutingResult, RouterNode
from .guardrails import SafetyGuardrail, AuditStatus
from .evaluator import ContextEvaluator

__version__ = "1.0.0"
__author__ = "Arif Alam"
__all__ = [
    "AgentRouter",
    "RoutingResult",
    "RouterNode",
    "SafetyGuardrail",
    "AuditStatus",
    "ContextEvaluator",
]
