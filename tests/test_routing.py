"""
Unit test suite for Agentic Routing Framework.
"""

import pytest
from agentic_routing import AgentRouter, SafetyGuardrail, AuditStatus, ContextEvaluator


def test_agent_router_rag_path():
    router = AgentRouter()
    result = router.route_query("What is the pricing data for vector storage?")
    assert result.selected_node == "VectorDB_RAG"
    assert result.context_retrieved is True
    assert "VectorDB_RAG" in result.execution_path
    assert result.guardrail_passed is True


def test_agent_router_direct_path():
    router = AgentRouter()
    result = router.route_query("Hello AI Agent!")
    assert result.selected_node == "LLM_Generator"
    assert result.context_retrieved is False


def test_safety_guardrail_pass():
    guardrail = SafetyGuardrail()
    audit = guardrail.audit("This is a safe output response.")
    assert audit["passed"] is True
    assert audit["status"] == AuditStatus.PASSED.value


def test_safety_guardrail_pii_failure():
    guardrail = SafetyGuardrail()
    audit = guardrail.audit("Here is the leaked API_KEY: 12345")
    assert audit["passed"] is False
    assert audit["status"] == AuditStatus.FAILED_PII.value


def test_context_evaluator():
    evaluator = ContextEvaluator()
    retrieval = evaluator.evaluate_retrieval("pricing query", ["doc1", "doc2"])
    assert retrieval["sufficient"] is True
    assert retrieval["coverage_score"] == 0.5
