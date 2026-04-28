from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers.ai import router as ai_router
from app.routers.auth import router as auth_router
from app.routers.cache import router as cache_router
from app.routers.email import router as email_router
from app.routers.integrations import router as integrations_router
from app.routers.resume import router as resume_router
from app.routers.websocket import router as websocket_router

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router)
app.include_router(auth_router)
app.include_router(cache_router)
app.include_router(email_router)
app.include_router(integrations_router)
app.include_router(resume_router)
app.include_router(websocket_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}
