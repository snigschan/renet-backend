from fastapi import APIRouter, HTTPException

from app.services.email import EmailService

router = APIRouter(prefix="/api/email", tags=["email"])
service = EmailService()


@router.post("/send")
async def send_email(payload: dict):
    email_type = payload.get("type")
    to = payload.get("to")
    data = payload.get("data", {})

    if not email_type or not to:
        raise HTTPException(status_code=400, detail="Missing required fields")

    if email_type == "welcome":
        success = await service.send_welcome_email(to, data.get("name", "there"))
    elif email_type == "application":
        success = await service.send_application_confirmation(
            to, data.get("jobTitle", "Opportunity"), data.get("company", "RENet")
        )
    elif email_type == "interview":
        success = await service.send_interview_invitation(
            to,
            data.get("candidateName", "Candidate"),
            data.get("jobTitle", "Role"),
            data.get("interviewDate", ""),
            data.get("interviewLink", "#"),
        )
    elif email_type == "job-match":
        success = await service.send_job_match_notification(to, int(data.get("matches", 0)))
    else:
        raise HTTPException(status_code=400, detail="Invalid email type")

    return {"success": success}
