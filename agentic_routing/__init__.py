"""
Agentic Routing Framework
~~~~~~~~~~~~~~~~~~~~~~~~~
Production-grade open-source multi-agent routing engine with built-in RAG validation,
async execution support, context evaluation, and security guardrails.

Copyright (c) 2026 Arif Alam. Released under MIT License.
"""

from .core import AgentRouter, RoutingResult, RouterNode
from .async_router import AsyncAgentRouter
from .guardrails import SafetyGuardrail, AuditStatus
from .evaluator import ContextEvaluator
from .adapters import AnthropicAdapter, VectorDBAdapter

__version__ = "1.0.0"
__author__ = "Arif Alam"
__all__ = [
    "AgentRouter",
    "AsyncAgentRouter",
    "RoutingResult",
    "RouterNode",
    "SafetyGuardrail",
    "AuditStatus",
    "ContextEvaluator",
    "AnthropicAdapter",
    "VectorDBAdapter",
]
