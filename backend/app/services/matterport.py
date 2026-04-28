from typing import Any

import httpx

from app.config import settings


class MatterportService:
    base_url = "https://my.matterport.com/api/v1"

    async def get_tours(self) -> list[dict[str, Any]]:
        if not settings.matterport_api_key:
            return self._mock_tours()

        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(
                    f"{self.base_url}/models",
                    headers={"Authorization": f"Bearer {settings.matterport_api_key}"},
                )
                response.raise_for_status()
                return response.json().get("models", [])
        except Exception:
            return self._mock_tours()

    async def get_tour_by_id(self, model_id: str) -> dict[str, Any] | None:
        if not settings.matterport_api_key:
            return next((tour for tour in self._mock_tours() if tour["id"] == model_id), None)

        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(
                    f"{self.base_url}/models/{model_id}",
                    headers={"Authorization": f"Bearer {settings.matterport_api_key}"},
                )
                response.raise_for_status()
                return response.json()
        except Exception:
            return None

    def _mock_tours(self) -> list[dict[str, Any]]:
        return [
            {
                "id": "SxQL3iGyoDo",
                "name": "Luxury Villa - Dubai Marina",
                "embedUrl": "https://my.matterport.com/show/?m=SxQL3iGyoDo",
                "thumbnailUrl": "/luxury-villa-dubai.png",
                "created": "2024-01-15",
                "propertyAddress": "Dubai Marina, Dubai, UAE",
            },
            {
                "id": "j4RZx7ZGM6T",
                "name": "Penthouse - Burj Khalifa",
                "embedUrl": "https://my.matterport.com/show/?m=j4RZx7ZGM6T",
                "thumbnailUrl": "/penthouse-burj-khalifa.jpg",
                "created": "2024-02-20",
                "propertyAddress": "Downtown Dubai, UAE",
            },
        ]
