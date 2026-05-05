from fastapi import APIRouter

router = APIRouter(prefix="/api/websocket", tags=["websocket"])


@router.get("")
async def websocket_info(userId: str | None = None):
    return {
        "message": "WebSocket endpoint - Use a WebSocket client to connect",
        "endpoint": "ws://localhost:3001/ws",
        "userId": userId,
    }
