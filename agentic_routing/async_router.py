"""
Asynchronous Agent Router module using Python asyncio.
"""

import asyncio
import time
from typing import Dict, Any, List, Optional
from .core import RoutingResult, RouterNode


class AsyncAgentRouter:
    """
    High-concurrency Asynchronous Agent Router for latency-critical multi-agent systems.
    """

    def __init__(self):
        self.nodes: Dict[str, RouterNode] = {}

    def register_node(self, node: RouterNode) -> None:
        self.nodes[node.name] = node

    async def route_query_async(self, query: str, context: Optional[Dict[str, Any]] = None) -> RoutingResult:
        start_time = time.time()
        execution_path = ["AsyncInputNode"]
        
        # Simulate async vector DB lookup and safety evaluation in parallel
        await asyncio.sleep(0.001)

        if any(keyword in query.lower() for keyword in ["price", "cost", "data", "retrieval", "search"]):
            execution_path.extend(["AsyncVectorDB", "AsyncLLMGenerator", "AsyncSafetyGuardrail", "AsyncOutputNode"])
            selected_node = "AsyncVectorDB"
            retrieved = True
        else:
            execution_path.extend(["AsyncLLMGenerator", "AsyncSafetyGuardrail", "AsyncOutputNode"])
            selected_node = "AsyncLLMGenerator"
            retrieved = False

        duration = round((time.time() - start_time) * 1000, 2)
        
        return RoutingResult(
            query=query,
            selected_node=selected_node,
            execution_path=execution_path,
            context_retrieved=retrieved,
            guardrail_passed=True,
            response=f"Async routed query through path: {' -> '.join(execution_path)}",
            execution_time_ms=duration
        )

    async def route_batch_async(self, queries: List[str]) -> List[RoutingResult]:
        """Process a batch of queries concurrently."""
        tasks = [self.route_query_async(q) for q in queries]
        return await asyncio.gather(*tasks)
