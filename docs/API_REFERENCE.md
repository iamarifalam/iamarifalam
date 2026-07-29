# API Reference Manual

Welcome to the complete API reference manual for the **Agentic Routing Framework**.

---

## 📦 `agentic_routing.core`

### `AgentRouter`
The central synchronizing class for node registration and query routing.

```python
class AgentRouter:
    def register_node(self, node: RouterNode) -> None: ...
    def add_route(self, source_node: str, destination_nodes: List[str]) -> None: ...
    def route_query(self, query: str, context: Optional[Dict[str, Any]] = None) -> RoutingResult: ...
```

### `RoutingResult`
Data structure returned after query execution.

| Property | Type | Description |
| :--- | :--- | :--- |
| `query` | `str` | Original input query |
| `selected_node` | `str` | Winning dispatch target node |
| `execution_path` | `List[str]` | Execution chain trace |
| `context_retrieved` | `bool` | Whether vector DB RAG was invoked |
| `guardrail_passed` | `bool` | Safety evaluation status |
| `execution_time_ms` | `float` | Pipeline execution time in milliseconds |

---

## ⚡ `agentic_routing.async_router`

### `AsyncAgentRouter`
Asynchronous multi-agent router for high-throughput microservices.

```python
class AsyncAgentRouter:
    async def route_query_async(self, query: str, context: Optional[Dict[str, Any]] = None) -> RoutingResult: ...
    async def route_batch_async(self, queries: List[str]) -> List[RoutingResult]: ...
```

---

## 🛡️ `agentic_routing.guardrails`

### `SafetyGuardrail`
Evaluates model response strings against PII disclosure and prompt injection patterns.

```python
class SafetyGuardrail:
    def __init__(self, block_pii: bool = True, block_injection: bool = True): ...
    def audit(self, text: str) -> Dict[str, Any]: ...
```

---

## 🔍 `agentic_routing.evaluator`

### `ContextEvaluator`
Ground-truth context relevance and hallucination scorer.

```python
class ContextEvaluator:
    def evaluate_retrieval(self, query: str, retrieved_docs: List[str]) -> Dict[str, Any]: ...
    def evaluate_hallucination(self, generated_text: str, context_docs: List[str]) -> Dict[str, Any]: ...
```
