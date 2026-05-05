from typing import Any

import httpx

from app.config import settings


class ResumeParserService:
    base_url = "https://api.affinda.com/v3"

    async def parse_resume(self, file_bytes: bytes, filename: str) -> dict[str, Any]:
        if not settings.affinda_api_key:
            return self._mock_resume()

        try:
            files = {"file": (filename, file_bytes)}
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    f"{self.base_url}/resumes",
                    headers={"Authorization": f"Bearer {settings.affinda_api_key}"},
                    files=files,
                )
                response.raise_for_status()
                return self._transform_affinda_response(response.json())
        except Exception:
            return self._mock_resume()

    async def parse_resume_from_url(self, url: str) -> dict[str, Any]:
        if not settings.affinda_api_key:
            return self._mock_resume()

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    f"{self.base_url}/resumes",
                    headers={
                        "Authorization": f"Bearer {settings.affinda_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={"url": url},
                )
                response.raise_for_status()
                return self._transform_affinda_response(response.json())
        except Exception:
            return self._mock_resume()

    def _transform_affinda_response(self, data: dict[str, Any]) -> dict[str, Any]:
        payload = data.get("data", {})
        websites = payload.get("websites") or []
        linkedin = next(
            (
                website.get("url")
                for website in websites
                if "linkedin" in str(website.get("url", "")).lower()
            ),
            None,
        )
        return {
            "personalInfo": {
                "name": (payload.get("name") or {}).get("raw", ""),
                "email": (payload.get("emails") or [""])[0],
                "phone": (payload.get("phoneNumbers") or [""])[0],
                "location": (payload.get("location") or {}).get("formatted", ""),
                "linkedin": linkedin,
                "website": websites[0].get("url") if websites else None,
            },
            "summary": payload.get("summary", ""),
            "experience": [
                {
                    "title": item.get("jobTitle"),
                    "company": item.get("organization"),
                    "location": (item.get("location") or {}).get("formatted", ""),
                    "startDate": (item.get("dates") or {}).get("startDate"),
                    "endDate": (item.get("dates") or {}).get("endDate"),
                    "description": item.get("jobDescription"),
                    "current": not (item.get("dates") or {}).get("endDate"),
                }
                for item in payload.get("workExperience", [])
            ],
            "education": [
                {
                    "degree": ((item.get("accreditation") or {}).get("education")),
                    "institution": item.get("organization"),
                    "location": (item.get("location") or {}).get("formatted", ""),
                    "graduationDate": (item.get("dates") or {}).get("completionDate"),
                    "gpa": (item.get("grade") or {}).get("value"),
                }
                for item in payload.get("education", [])
            ],
            "skills": [item.get("name") for item in payload.get("skills", [])],
            "certifications": [
                {
                    "name": item.get("name"),
                    "issuer": item.get("organization"),
                    "date": item.get("date"),
                }
                for item in payload.get("certifications", [])
            ],
            "languages": [
                {
                    "language": item.get("name"),
                    "proficiency": item.get("proficiency"),
                }
                for item in payload.get("languages", [])
            ],
        }

    def _mock_resume(self) -> dict[str, Any]:
        return {
            "personalInfo": {
                "name": "Ahmed Al Maktoum",
                "email": "ahmed.almaktoum@example.com",
                "phone": "+971 50 123 4567",
                "location": "Dubai, UAE",
                "linkedin": "https://linkedin.com/in/ahmedalmaktoum",
            },
            "summary": (
                "Experienced real estate professional with 8+ years in luxury property "
                "sales across Dubai and Abu Dhabi."
            ),
            "experience": [
                {
                    "title": "Senior Real Estate Agent",
                    "company": "Emaar Properties",
                    "location": "Dubai, UAE",
                    "startDate": "2020-01",
                    "endDate": None,
                    "description": "Leading sales for luxury residential properties.",
                    "current": True,
                },
                {
                    "title": "Real Estate Consultant",
                    "company": "Damac Properties",
                    "location": "Dubai, UAE",
                    "startDate": "2016-06",
                    "endDate": "2019-12",
                    "description": "Specialized in off-plan property sales.",
                    "current": False,
                },
            ],
            "education": [
                {
                    "degree": "Bachelor of Business Administration",
                    "institution": "American University of Dubai",
                    "location": "Dubai, UAE",
                    "graduationDate": "2016-05",
                }
            ],
            "skills": [
                "Property Sales",
                "Client Relationship Management",
                "Market Analysis",
                "Negotiation",
                "Arabic & English Fluency",
            ],
            "certifications": [
                {
                    "name": "RERA Certified Agent",
                    "issuer": "Real Estate Regulatory Agency",
                    "date": "2022-01",
                    "expiryDate": "2025-01",
                }
            ],
            "languages": [
                {"language": "Arabic", "proficiency": "Native"},
                {"language": "English", "proficiency": "Fluent"},
            ],
        }
