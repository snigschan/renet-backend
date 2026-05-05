from fastapi import APIRouter, HTTPException, Query

from app.services.certification import CertificationService
from app.services.matterport import MatterportService
from app.services.zillow import ZillowService

router = APIRouter(prefix="/api/integrations", tags=["integrations"])
zillow_service = ZillowService()
matterport_service = MatterportService()
certification_service = CertificationService()


@router.get("/zillow")
async def zillow(action: str = Query(...), region: str = "Dubai", address: str | None = None):
    if action == "trends":
        return {"trends": await zillow_service.get_market_trends(region)}
    if action == "valuation" and address:
        return {"valuation": await zillow_service.get_property_valuation(address)}
    raise HTTPException(status_code=400, detail="Invalid action or missing parameters")


@router.get("/matterport")
async def matterport(id: str | None = None):
    if id:
        return {"tour": await matterport_service.get_tour_by_id(id)}
    return {"tours": await matterport_service.get_tours()}


@router.get("/certification")
async def certification(number: str = Query(...), type: str = Query(...)):
    return {"result": await certification_service.verify_certification(number, type)}
