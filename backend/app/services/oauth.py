from urllib.parse import urlencode

import httpx

from app.config import settings


class OAuthService:
    providers = {
        "google": {
            "client_id": lambda: settings.google_client_id,
            "client_secret": lambda: settings.google_client_secret,
            "redirect_uri": lambda: f"{settings.app_url}/api/auth/oauth/callback/google",
            "auth_url": "https://accounts.google.com/o/oauth2/v2/auth",
            "token_url": "https://oauth2.googleapis.com/token",
            "scope": "openid profile email",
        },
        "linkedin": {
            "client_id": lambda: settings.linkedin_client_id,
            "client_secret": lambda: settings.linkedin_client_secret,
            "redirect_uri": lambda: f"{settings.app_url}/api/auth/oauth/callback/linkedin",
            "auth_url": "https://www.linkedin.com/oauth/v2/authorization",
            "token_url": "https://www.linkedin.com/oauth/v2/accessToken",
            "scope": "openid profile email",
        },
    }

    def get_authorization_url(self, provider: str, state: str) -> str | None:
        config = self.providers.get(provider)
        if not config:
            return None

        params = {
            "client_id": config["client_id"](),
            "redirect_uri": config["redirect_uri"](),
            "response_type": "code",
            "scope": config["scope"],
            "state": state,
        }
        return f'{config["auth_url"]}?{urlencode(params)}'

    async def exchange_code(self, provider: str, code: str) -> dict:
        config = self.providers.get(provider)
        if not config:
            raise ValueError("Invalid provider")

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(
                config["token_url"],
                data={
                    "client_id": config["client_id"](),
                    "client_secret": config["client_secret"](),
                    "code": code,
                    "redirect_uri": config["redirect_uri"](),
                    "grant_type": "authorization_code",
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            response.raise_for_status()
            return response.json()
