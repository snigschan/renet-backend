import json
import time
from dataclasses import dataclass, field
from threading import Lock
from typing import Any


@dataclass
class CacheEntry:
    data: Any
    expires_at: float
    tags: list[str] = field(default_factory=list)


class RedisCache:
    def __init__(self, default_ttl: int = 3600) -> None:
        self.default_ttl = default_ttl
        self._store: dict[str, str] = {}
        self._lock = Lock()

    async def get(self, key: str) -> Any | None:
        with self._lock:
            raw_value = self._store.get(key)

        if raw_value is None:
            return None

        parsed = json.loads(raw_value)
        if parsed["expires_at"] < time.time():
            await self.delete(key)
            return None

        return parsed["data"]

    async def set(
        self,
        key: str,
        value: Any,
        ttl: int | None = None,
        tags: list[str] | None = None,
    ) -> bool:
        expires_at = time.time() + (ttl or self.default_ttl)
        payload = json.dumps(
            {
                "data": value,
                "expires_at": expires_at,
                "tags": tags or [],
            }
        )
        with self._lock:
            self._store[key] = payload
        return True

    async def delete(self, key: str) -> bool:
        with self._lock:
            self._store.pop(key, None)
        return True

    async def invalidate_by_tag(self, tag: str) -> int:
        removed = 0
        keys_to_remove: list[str] = []

        with self._lock:
            for key, raw_value in self._store.items():
                parsed = json.loads(raw_value)
                if tag in parsed.get("tags", []):
                    keys_to_remove.append(key)

            for key in keys_to_remove:
                self._store.pop(key, None)
                removed += 1

        return removed

    async def clear(self) -> bool:
        with self._lock:
            self._store.clear()
        return True


cache_instance = RedisCache()

