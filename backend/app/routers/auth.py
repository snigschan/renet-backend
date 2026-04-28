import secrets

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from app.services.oauth import OAuthService

router = APIRouter(prefix="/api/auth/oauth", tags=["auth"])
service = OAuthService()


@router.get("")
async def oauth_redirect(provider: str):
    authorization_url = service.get_authorization_url(provider, secrets.token_urlsafe(16))
    if not authorization_url:
        raise HTTPException(status_code=400, detail="Invalid provider")
    return RedirectResponse(authorization_url)


@router.post("")
async def oauth_exchange(payload: dict):
    provider = payload.get("provider")
    code = payload.get("code")
    if not provider or not code:
        raise HTTPException(status_code=400, detail="Missing provider or code")
    token_data = await service.exchange_code(provider, code)
    return {
        "success": True,
        "accessToken": token_data.get("access_token"),
        "provider": provider,
    }
