from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.resume_parser import ResumeParserService

router = APIRouter(prefix="/api/resume", tags=["resume"])
service = ResumeParserService()


@router.post("/parse")
async def parse_resume(file: UploadFile | None = File(default=None), url: str | None = Form(default=None)):
    if file is None and not url:
        raise HTTPException(status_code=400, detail="No file or URL provided")

    if file is not None:
        file_bytes = await file.read()
        parsed_resume = await service.parse_resume(file_bytes, file.filename or "resume.pdf")
    else:
        parsed_resume = await service.parse_resume_from_url(url or "")

    return {"parsedResume": parsed_resume}
