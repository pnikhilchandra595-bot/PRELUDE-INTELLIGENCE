import os
import uuid
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

try:
    from hindsight_client import Hindsight
    HINDSIGHT_AVAILABLE = True
except ImportError:
    HINDSIGHT_AVAILABLE = False

class HindsightMemoryItem:
    def __init__(self, id: str, content: str, tags: Dict[str, Any], created_at: str):
        self.id = id
        self.content = content
        self.tags = tags
        self.created_at = created_at

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "content": self.content,
            "tags": self.tags,
            "created_at": self.created_at
        }

class HindsightClient:
    """
    Unified Hindsight Memory client that connects to either:
    1. Local Hindsight server (http://127.0.0.1:8888)
    2. Cloud Hindsight server (https://api.hindsight.vectorize.io)
    3. Seamless fallback to in-memory store if server is offline
    """
    def __init__(
        self,
        api_url: Optional[str] = None,
        api_key: Optional[str] = None,
        bank_id: str = "marketing-product-hub"
    ):
        self.api_url = api_url or os.getenv("HINDSIGHT_API_URL", "http://127.0.0.1:8888")
        self.api_key = api_key or os.getenv("HINDSIGHT_API_KEY", "")
        self.bank_id = bank_id
        self._real_client = None
        self._mock_memories: List[HindsightMemoryItem] = []

        if HINDSIGHT_AVAILABLE:
            try:
                # Instantiate official SDK client
                self._real_client = Hindsight(
                    base_url=self.api_url,
                    api_key=self.api_key if self.api_key.strip() else None
                )
                logger.info(f"Connected to Hindsight SDK with base_url={self.api_url}")
            except Exception as e:
                logger.warning(f"Could not connect to real Hindsight ({e}). Falling back to mock store.")
                self._real_client = None

        if not self._real_client:
            logger.info("Using in-memory mock store.")
            self._seed_mock_data()

    @property
    def is_live(self) -> bool:
        return self._real_client is not None

    def retain(self, content: str, tags: Optional[Dict[str, Any]] = None) -> str:
        """Stores a memory into Hindsight or mock store."""
        tags = tags or {}
        tag_list = [f"{k}:{v}" for k, v in tags.items()]
        now = datetime.now(timezone.utc).isoformat()

        if self._real_client:
            try:
                res = self._real_client.retain(
                    bank_id=self.bank_id,
                    content=content,
                    tags=tag_list
                )
                memory_id = res.operation_id or f"mem_{uuid.uuid4().hex[:10]}"
                logger.info(f"Retained in Hindsight (bank={self.bank_id}, id={memory_id})")
                return memory_id
            except Exception as e:
                logger.warning(f"Live Hindsight retain failed: {e}. Storing in fallback store.")

        # Fallback store
        memory_id = f"mem_{uuid.uuid4().hex[:10]}"
        item = HindsightMemoryItem(id=memory_id, content=content, tags=tags, created_at=now)
        self._mock_memories.append(item)
        return memory_id

    def recall(
        self,
        query: str,
        filters: Optional[Dict[str, Any]] = None,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Recalls relevant memories using Hindsight semantic search."""
        if self._real_client:
            try:
                tag_list = [f"{k}:{v}" for k, v in filters.items()] if filters else None
                res = self._real_client.recall(
                    bank_id=self.bank_id,
                    query=query,
                    tags=tag_list,
                    max_tokens=2048
                )
                
                results = []
                # Map RecallResult items to standard dictionary shape
                for item in getattr(res, "results", []):
                    results.append({
                        "id": getattr(item, "id", f"mem_{uuid.uuid4().hex[:6]}"),
                        "content": getattr(item, "text", str(item)),
                        "type": getattr(item, "type", "memory"),
                        "tags": filters or {}
                    })

                if results:
                    return results[:limit]
            except Exception as e:
                logger.warning(f"Live Hindsight recall failed: {e}. Falling back to mock store.")

        # Fallback in-memory search
        results = []
        tokens = set(query.lower().split())

        for mem in self._mock_memories:
            if filters:
                match = True
                for k, v in filters.items():
                    if mem.tags.get(k) != v:
                        match = False
                        break
                if not match:
                    continue

            content_lower = mem.content.lower()
            score = sum(1 for t in tokens if t in content_lower)
            results.append((score, mem.to_dict()))

        results.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in results[:limit]]

    def _seed_mock_data(self):
        """Pre-seeds fallback memory."""
        seed_entries = [
            (
                "Competitor ApexCloud announced a surprise 20% price cut on Enterprise tier and added native SOC2 compliance reporting.",
                {"module": "competitive_intel", "entity": "ApexCloud", "event_type": "pricing", "date": "2026-09-15"}
            ),
            (
                "Deep dive blog post 'Migrating Kubernetes Clusters with Zero Downtime' reached 14,200 views and drove 38 qualified enterprise signups.",
                {"module": "content_strategy", "topic": "DevOps", "views": 14200, "conversion_rate": 0.026}
            ),
            (
                "Discovery call with Acme Corp (VP Engineering Sarah Chen). Sarah stressed that current vendor pricing is 25% over budget, and they need SOC2 compliance before Q4 renewal.",
                {"module": "meeting_prep", "contact": "Sarah Chen", "company": "Acme Corp", "date": "2026-09-18"}
            ),
            (
                "Enterprise customer feedback ticket #4092: 'The CSV export in the billing dashboard takes 2 minutes and frequently times out on large datasets.'",
                {"module": "feedback_synthesis", "source": "support_ticket", "sentiment": "negative", "theme": "Billing Performance"}
            )
        ]
        for content, tags in seed_entries:
            item_id = f"mem_seed_{uuid.uuid4().hex[:6]}"
            self._mock_memories.append(HindsightMemoryItem(
                id=item_id,
                content=content,
                tags=tags,
                created_at="2026-09-25T10:00:00Z"
            ))
