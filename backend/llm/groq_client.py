import os
import json
import logging
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv
from groq import Groq, APIError, RateLimitError, APITimeoutError

load_dotenv()

logger = logging.getLogger(__name__)

class GroqClientWrapper:
    """
    Robust Groq LLM client wrapper featuring:
    - Primary model (openai/gpt-oss-120b) with automatic fallback (qwen/qwen3-32b)
    - Retry mechanisms for network/rate-limit issues
    - Dedicated JSON extraction and validation for reliable structured responses
    - Tool/function calling error resilience
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        primary_model: Optional[str] = None,
        fallback_model: Optional[str] = None
    ):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not found in environment or passed arguments.")
        
        self.client = Groq(api_key=self.api_key)
        self.primary_model = primary_model or os.getenv("GROQ_PRIMARY_MODEL", "openai/gpt-oss-120b")
        self.fallback_model = fallback_model or os.getenv("GROQ_FALLBACK_MODEL", "openai/gpt-oss-20b")

    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.2,
        max_tokens: int = 2048,
        response_format: Optional[Dict[str, str]] = None,
        tools: Optional[List[Dict[str, Any]]] = None,
        tool_choice: Optional[str] = None,
        max_retries: int = 2
    ) -> Dict[str, Any]:
        """
        Executes a chat completion with primary model and automatic fallback on failure.
        """
        models_to_try = [self.primary_model, self.fallback_model]

        for model in models_to_try:
            for attempt in range(max_retries + 1):
                try:
                    logger.info(f"Calling Groq model={model} (attempt {attempt + 1})")
                    kwargs: Dict[str, Any] = {
                        "model": model,
                        "messages": messages,
                        "temperature": temperature,
                        "max_tokens": max_tokens
                    }
                    if response_format:
                        kwargs["response_format"] = response_format
                    if tools:
                        kwargs["tools"] = tools
                        if tool_choice:
                            kwargs["tool_choice"] = tool_choice

                    response = self.client.chat.completions.create(**kwargs)
                    choice = response.choices[0]
                    message = choice.message

                    return {
                        "model_used": model,
                        "content": message.content,
                        "tool_calls": getattr(message, "tool_calls", None),
                        "finish_reason": choice.finish_reason
                    }
                except (APIError, RateLimitError, APITimeoutError) as e:
                    logger.warning(f"Groq API error on model {model}, attempt {attempt + 1}: {e}")
                    if attempt == max_retries and model == models_to_try[-1]:
                        logger.error("All Groq models and retries exhausted.")
                        raise e
                except Exception as e:
                    logger.warning(f"Unexpected error calling {model}: {e}")
                    if attempt == max_retries and model == models_to_try[-1]:
                        raise e
                    break # try next model if unexpected fatal format error

        raise RuntimeError("Failed to obtain response from Groq LLM.")

    def structured_json_completion(
        self,
        system_prompt: str,
        user_prompt: str,
        schema_hint: Optional[str] = None,
        temperature: float = 0.1
    ) -> Dict[str, Any]:
        """
        Guarantees parsed JSON output even with open models by combining json_object format
        and programmatic cleanup fallback.
        """
        augmented_system_prompt = system_prompt
        if schema_hint:
            augmented_system_prompt += f"\nYou must output strictly valid JSON matching this schema:\n{schema_hint}"
        augmented_system_prompt += "\nRespond only with valid JSON. Do not include markdown code block wrappers (```json) or outside commentary."

        messages = [
            {"role": "system", "content": augmented_system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        # Try with response_format={"type": "json_object"}
        try:
            res = self.chat_completion(
                messages=messages,
                temperature=temperature,
                response_format={"type": "json_object"}
            )
            raw_text = res["content"].strip()
            return self._clean_and_parse_json(raw_text)
        except Exception as e:
            logger.warning(f"JSON mode failed or returned invalid JSON ({e}). Retrying with prompt enforcement...")
            # Fallback without format enforcement, parsing cleaned text
            res = self.chat_completion(messages=messages, temperature=temperature)
            return self._clean_and_parse_json(res["content"])

    def _clean_and_parse_json(self, raw_text: str) -> Dict[str, Any]:
        """Cleans potential markdown fences or stray tokens and parses JSON."""
        cleaned = raw_text.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        elif cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            return json.loads(cleaned)
        except json.JSONDecodeError as err:
            # Last ditch attempt: extract substring between first { and last }
            start = cleaned.find("{")
            end = cleaned.rfind("}")
            if start != -1 and end != -1 and end > start:
                return json.loads(cleaned[start:end+1])
            raise ValueError(f"Could not parse valid JSON from LLM response: {raw_text[:200]}...") from err
