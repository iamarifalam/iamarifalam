"""
Safety Guardrail module for auditing PII leaks and prompt injections.
"""

from typing import Dict, Any, List
from enum import Enum


class AuditStatus(Enum):
    PASSED = "PASSED"
    FAILED_PII = "FAILED_PII"
    FAILED_PROMPT_INJECTION = "FAILED_PROMPT_INJECTION"
    FAILED_HALLUCINATION = "FAILED_HALLUCINATION"


class SafetyGuardrail:
    """
    Automated security evaluator that checks generated model outputs against safety parameters.
    """

    def __init__(self, block_pii: bool = True, block_injection: bool = True):
        self.block_pii = block_pii
        self.block_injection = block_injection
        self.pii_keywords = ["ssn", "password", "api_key", "secret", "private_key"]
        self.injection_patterns = ["ignore previous instructions", "system prompt override"]

    def audit(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()

        if self.block_pii and any(k in text_lower for k in self.pii_keywords):
            return {
                "status": AuditStatus.FAILED_PII.value,
                "passed": False,
                "reason": "Detected potential PII leak or credential exposure."
            }

        if self.block_injection and any(p in text_lower for p in self.injection_patterns):
            return {
                "status": AuditStatus.FAILED_PROMPT_INJECTION.value,
                "passed": False,
                "reason": "Detected prompt injection attack vector."
            }

        return {
            "status": AuditStatus.PASSED.value,
            "passed": True,
            "reason": "All security audits passed successfully."
        }
