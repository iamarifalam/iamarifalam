"""
Vector Database Search Adapter.
"""

from typing import List, Dict, Any


class VectorDBAdapter:
    """
    In-memory / Persistent Vector DB Adapter for RAG context retrieval.
    """

    def __init__(self, collection_name: str = "default_collection"):
        self.collection_name = collection_name
        self.documents: List[Dict[str, Any]] = [
            {"id": "doc1", "content": "Vector DB pricing starts at $0.05 per 100k vector queries.", "category": "pricing"},
            {"id": "doc2", "content": "Agentic routing reduces LLM latency by 40% using dynamic shortcuts.", "category": "architecture"},
            {"id": "doc3", "content": "Safety guardrails intercept PII leakage and prompt injection vectors.", "category": "security"},
        ]

    def similarity_search(self, query: str, top_k: int = 2) -> List[Dict[str, Any]]:
        query_words = set(query.lower().split())
        scored_docs = []

        for doc in self.documents:
            doc_words = set(doc["content"].lower().split())
            score = len(query_words.intersection(doc_words))
            scored_docs.append((score, doc))

        scored_docs.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored_docs[:top_k]]
