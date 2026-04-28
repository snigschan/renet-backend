from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.ai import AIService

router = APIRouter(prefix="/api/ai", tags=["ai"])
service = AIService()


@router.post("/generate-image")
async def generate_image(payload: dict):
    prompt = payload.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Missing prompt")
    return await service.generate_image(prompt, payload.get("style"), payload.get("quality"))


@router.post("/virtual-staging")
async def virtual_staging(image: UploadFile = File(...), style: str | None = Form(default=None)):
    if not image:
        raise HTTPException(status_code=400, detail="Missing image")
    return await service.virtual_stage(style)


@router.post("/match-jobs")
async def match_jobs(payload: dict):
    return await service.match_jobs(
        payload.get("userProfile"),
        payload.get("preferences"),
        payload.get("location"),
    )


@router.post("/match-candidates")
async def match_candidates(payload: dict):
    return await service.match_candidates(
        payload.get("jobRequirements"),
        payload.get("companyProfile"),
        payload.get("location"),
        payload.get("salaryRange"),
    )


@router.post("/optimize-profile")
async def optimize_profile(payload: dict):
    return await service.optimize_profile(
        payload.get("currentProfile") or payload.get("profile"),
        payload.get("targetRole"),
        payload.get("location"),
    )


@router.post("/search-insights")
async def search_insights(payload: dict):
    return await service.search_insights(
        payload.get("userProfile"),
        payload.get("searchQuery"),
        payload.get("location"),
    )
