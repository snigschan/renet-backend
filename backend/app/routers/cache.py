from fastapi import APIRouter, HTTPException, Query

from app.services.cache import cache_instance

router = APIRouter(prefix="/api/cache", tags=["cache"])


@router.get("")
async def cache_get(
    action: str = Query(...), key: str | None = None, tag: str | None = None
):
    if action == "get" and key:
        return {"value": await cache_instance.get(key)}
    if action == "delete" and key:
        return {"success": await cache_instance.delete(key)}
    if action == "invalidate" and tag:
        return {"count": await cache_instance.invalidate_by_tag(tag)}
    if action == "clear":
        return {"success": await cache_instance.clear()}
    raise HTTPException(status_code=400, detail="Invalid action")


@router.post("")
async def cache_set(payload: dict):
    key = payload.get("key")
    value = payload.get("value")
    if not key or value is None:
        raise HTTPException(status_code=400, detail="Missing key or value")
    return {
        "success": await cache_instance.set(
            key,
            value,
            ttl=payload.get("ttl"),
            tags=payload.get("tags"),
        )
    }
