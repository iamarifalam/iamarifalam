"""
Command Line Interface (CLI) for Agentic Routing Framework.
"""

import sys
import argparse
from agentic_routing.core import AgentRouter
from agentic_routing.guardrails import SafetyGuardrail


def main():
    parser = argparse.ArgumentParser(
        description="Agentic Routing CLI - Evaluate and route multi-agent LLM queries."
    )
    parser.add_argument(
        "--query", "-q", type=str, required=True, help="The query string to route."
    )
    parser.add_argument(
        "--audit", "-a", action="store_true", help="Run safety guardrail audit on response."
    )
    
    args = parser.parse_args()

    router = AgentRouter()
    result = router.route_query(args.query)

    print("\n🤖 Agentic Routing Result")
    print("=" * 40)
    print(f"Query:           {result.query}")
    print(f"Selected Node:   {result.selected_node}")
    print(f"Execution Path:  {' -> '.join(result.execution_path)}")
    print(f"Execution Time:  {result.execution_time_ms} ms")
    print(f"Context Found:   {result.context_retrieved}")

    if args.audit:
        guardrail = SafetyGuardrail()
        audit_res = guardrail.audit(result.response)
        print(f"Security Audit:  {audit_res['status']} ({audit_res['reason']})")
    
    print("=" * 40 + "\n")


if __name__ == "__main__":
    main()
