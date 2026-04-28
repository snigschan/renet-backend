from datetime import datetime, timezone
from typing import Any
from urllib.parse import quote

import httpx

from app.config import settings


class ZillowService:
    base_url = "https://api.bridgedataoutput.com/api/v2/zillow"

    async def get_market_trends(self, region: str) -> dict[str, Any]:
        if not settings.zillow_api_key:
            return self._mock_market_trends(region)

        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(
                    f"{self.base_url}/market-trends",
                    params={"region": region},
                    headers={"Authorization": f"Bearer {settings.zillow_api_key}"},
                )
                response.raise_for_status()
                return response.json()
        except Exception:
            return self._mock_market_trends(region)

    async def get_property_valuation(self, address: str) -> dict[str, Any]:
        if not settings.zillow_api_key:
            return self._mock_valuation(address)

        try:
            async with httpx.AsyncClient(timeout=15) as client:
                response = await client.get(
                    f"{self.base_url}/valuation?address={quote(address)}",
                    headers={"Authorization": f"Bearer {settings.zillow_api_key}"},
                )
                response.raise_for_status()
                return response.json()
        except Exception:
            return self._mock_valuation(address)

    def _mock_market_trends(self, region: str) -> dict[str, Any]:
        trends = {
            "Dubai": {
                "region": "Dubai, UAE",
                "medianPrice": 1850000,
                "priceChange": 12.5,
                "inventory": 4200,
                "daysOnMarket": 45,
                "forecast": {"nextMonth": 1.2, "nextQuarter": 3.8, "nextYear": 15.2},
            },
            "Riyadh": {
                "region": "Riyadh, Saudi Arabia",
                "medianPrice": 980000,
                "priceChange": 8.3,
                "inventory": 3100,
                "daysOnMarket": 52,
                "forecast": {"nextMonth": 0.9, "nextQuarter": 2.5, "nextYear": 10.8},
            },
        }
        return trends.get(region, trends["Dubai"])

    def _mock_valuation(self, address: str) -> dict[str, Any]:
        return {
            "address": address,
            "estimatedValue": 2150000,
            "valuationRange": {"low": 1950000, "high": 2350000},
            "lastUpdated": datetime.now(timezone.utc).isoformat(),
            "comparables": [
                {"address": "Similar property 1", "price": 2100000, "distance": 0.3},
                {"address": "Similar property 2", "price": 2200000, "distance": 0.5},
                {"address": "Similar property 3", "price": 2050000, "distance": 0.7},
            ],
        }
