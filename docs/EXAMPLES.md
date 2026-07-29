# Production Code Examples

Explore real-world implementation patterns for multi-agent LLM systems using the `agentic-routing-framework`.

---

## 1. Multi-Agent RAG Pipeline with Anthropic Claude

```python
from agentic_routing import AgentRouter, SafetyGuardrail, AnthropicAdapter, VectorDBAdapter

# 1. Setup components
router = AgentRouter()
vdb = VectorDBAdapter(collection_name="enterprise_kb")
claude = AnthropicAdapter(model_name="claude-3-7-sonnet-20250219")
guardrail = SafetyGuardrail(block_pii=True)

# 2. Route user query
query = "What is our vector database query pricing model?"
route_info = router.route_query(query)

# 3. Retrieve context if RAG path selected
if route_info.context_retrieved:
    context_docs = vdb.similarity_search(query)
    context_str = "\n".join([d["content"] for d in context_docs])
    prompt = f"Context:\n{context_str}\n\nUser Question: {query}"
else:
    prompt = query

# 4. Generate & Audit
response_data = claude.generate(prompt)
audit = guardrail.audit(response_data["simulated_response"])

print(f"Status: {audit['status']}")
print(f"Output: {response_data['simulated_response']}")
```

---

## 2. High-Throughput Batch Processing

```python
import asyncio
from agentic_routing import AsyncAgentRouter

async def process_user_traffic():
    async_router = AsyncAgentRouter()
    user_queries = [
        "Fetch database stats",
        "Explain multi-agent state machines",
        "Vector search pricing breakdown",
        "Generate Python function"
    ]
    
    results = await async_router.route_batch_async(user_queries)
    for r in results:
        print(f"Query: '{r.query}' -> Selected: {r.selected_node} ({r.execution_time_ms} ms)")

asyncio.run(process_user_traffic())
```
