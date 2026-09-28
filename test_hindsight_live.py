import sys
import json
import time

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from hindsight_client import Hindsight

def test_live_hindsight():
    print("Connecting to local Hindsight server on http://127.0.0.1:8888...")
    client = Hindsight(base_url="http://127.0.0.1:8888")

    bank_id = "test-bank"
    print(f"Retaining memory in bank '{bank_id}'...")
    res_retain = client.retain(
        bank_id=bank_id,
        content="Acme Corp requested custom SOC2 compliance reporting and a 20% discount on Enterprise tier.",
        tags=["sales", "pricing", "acme"]
    )
    print("-> Retain success:", res_retain)

    # Allow a moment for indexing
    time.sleep(2)

    print("Recalling memories matching 'What did Acme Corp request?'...")
    res_recall = client.recall(
        bank_id=bank_id,
        query="What did Acme Corp request about pricing?"
    )
    print("-> Recall success! Results:")
    print(res_recall)

if __name__ == "__main__":
    test_live_hindsight()
