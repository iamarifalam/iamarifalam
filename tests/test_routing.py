"""
Unit test suite for Agentic Routing Framework.
"""

import pytest
from agentic_routing import (
    AgentRouter,
    AsyncAgentRouter,
    SafetyGuardrail,
    AuditStatus,
    ContextEvaluator,
    AnthropicAdapter,
    VectorDBAdapter,
)


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


import asyncio

def test_async_agent_router():
    async def run_test():
        async_router = AsyncAgentRouter()
        result = await async_router.route_query_async("Fetch price stats asynchronously")
        assert result.selected_node == "AsyncVectorDB"
        assert result.context_retrieved is True

        batch_results = await async_router.route_batch_async(["query 1", "price query 2"])
        assert len(batch_results) == 2

    asyncio.run(run_test())


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


def test_anthropic_adapter():
    adapter = AnthropicAdapter(model_name="claude-3-7-sonnet-20250219")
    res = adapter.generate("Explain multi-agent state machines")
    assert res["status"] == "ready"
    assert res["model"] == "claude-3-7-sonnet-20250219"


def test_vector_db_adapter():
    vdb = VectorDBAdapter()
    docs = vdb.similarity_search("vector pricing")
    assert len(docs) > 0
    assert "pricing" in docs[0]["content"].lower()
