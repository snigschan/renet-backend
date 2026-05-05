from typing import Any

import httpx

from app.config import settings


class EmailService:
    base_url = "https://api.sendgrid.com/v3"

    async def send_email(self, options: dict[str, Any]) -> bool:
        if not settings.sendgrid_api_key:
            return True

        payload = {
            "personalizations": [
                {
                    "to": [
                        {"email": email}
                        for email in (
                            options["to"] if isinstance(options["to"], list) else [options["to"]]
                        )
                    ],
                    "dynamic_template_data": options.get("dynamicData", {}),
                }
            ],
            "from": {"email": options.get("from", settings.sendgrid_from_email)},
            "subject": options["subject"],
            "content": [{"type": "text/html", "value": options.get("html", options.get("text", ""))}],
            "template_id": options.get("templateId"),
            "attachments": options.get("attachments"),
        }

        try:
            async with httpx.AsyncClient(timeout=20) as client:
                response = await client.post(
                    f"{self.base_url}/mail/send",
                    headers={
                        "Authorization": f"Bearer {settings.sendgrid_api_key}",
                        "Content-Type": "application/json",
                    },
                    json=payload,
                )
                response.raise_for_status()
            return True
        except Exception:
            return False

    async def send_welcome_email(self, to: str, name: str) -> bool:
        return await self.send_email(
            {
                "to": to,
                "subject": "Welcome to RENet - Your Real Estate Career Starts Here",
                "html": self._welcome_template(name),
            }
        )

    async def send_application_confirmation(self, to: str, job_title: str, company: str) -> bool:
        return await self.send_email(
            {
                "to": to,
                "subject": f"Application Received: {job_title} at {company}",
                "html": self._application_template(job_title, company),
            }
        )

    async def send_interview_invitation(
        self,
        to: str,
        candidate_name: str,
        job_title: str,
        interview_date: str,
        interview_link: str,
    ) -> bool:
        return await self.send_email(
            {
                "to": to,
                "subject": f"Interview Invitation: {job_title}",
                "html": self._interview_template(
                    candidate_name, job_title, interview_date, interview_link
                ),
            }
        )

    async def send_job_match_notification(self, to: str, matches: int) -> bool:
        return await self.send_email(
            {
                "to": to,
                "subject": f"{matches} New Job Matches Found on RENet",
                "html": self._job_match_template(matches),
            }
        )

    def _shell(self, title: str, body: str) -> str:
        return f"""
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
              .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
              .header {{ background: linear-gradient(135deg, #D4AF37 0%, #008080 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
              .content {{ background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }}
              .button {{ display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header"><h1>{title}</h1></div>
              <div class="content">{body}</div>
            </div>
          </body>
        </html>
        """

    def _welcome_template(self, name: str) -> str:
        return self._shell(
            "Welcome to RENet!",
            (
                f"<p>Dear {name},</p>"
                "<p>Welcome to RENet, the Middle East's professional network for real estate careers.</p>"
                f'<a href="{settings.app_url}/profile" class="button">Complete Your Profile</a>'
            ),
        )

    def _application_template(self, job_title: str, company: str) -> str:
        return self._shell(
            "Application Received",
            (
                "<p>Your application has been successfully submitted.</p>"
                f"<p><strong>Role:</strong> {job_title}</p>"
                f"<p><strong>Company:</strong> {company}</p>"
                f'<a href="{settings.app_url}/applications" class="button">View Application Status</a>'
            ),
        )

    def _interview_template(
        self, candidate_name: str, job_title: str, interview_date: str, interview_link: str
    ) -> str:
        return self._shell(
            "Interview Invitation",
            (
                f"<p>Dear {candidate_name},</p>"
                f"<p>You have been invited to interview for <strong>{job_title}</strong>.</p>"
                f"<p><strong>Interview Date:</strong> {interview_date}</p>"
                f'<a href="{interview_link}" class="button">Join Interview</a>'
            ),
        )

    def _job_match_template(self, matches: int) -> str:
        return self._shell(
            "New Job Matches!",
            (
                f"<p>Great news. We found <strong>{matches}</strong> new opportunities for you.</p>"
                f'<a href="{settings.app_url}/search" class="button">View Matches</a>'
            ),
        )
