import os
import sys
from dotenv import load_dotenv

# Ensure backend can be imported
sys.path.insert(0, os.path.abspath("."))

load_dotenv()
from backend.llm.groq_client import GroqClientWrapper

def test_groq():
    print("Testing Groq Client with key from .env...")
    client = GroqClientWrapper()

    # 1. Plain chat completion test
    print("\n1. Testing Chat Completion...")
    res = client.chat_completion(
        messages=[{"role": "user", "content": "Respond with 'GROQ_ONLINE' and your model name in 5 words or less."}],
        max_tokens=30
    )
    print(f"-> Success! Model used: {res['model_used']}")
    print(f"-> Response: {res['content'].strip()}")

    # 2. Structured JSON completion test
    print("\n2. Testing Structured JSON Completion...")
    json_res = client.structured_json_completion(
        system_prompt="You are a data extraction bot. Output valid JSON.",
        user_prompt="Extract: Acme Corp raised $10M in Series A led by Vertex Ventures.",
        schema_hint='{"company": string, "round": string, "amount": string, "lead_investor": string}'
    )
    print(f"-> Success! Parsed JSON:")
    print(json_res)

if __name__ == "__main__":
    test_groq()
