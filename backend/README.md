# Python Backend

This directory contains a FastAPI port of the backend logic that previously lived in Next.js route handlers under `app/api`.

## Run locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then point the Next.js frontend at the Python service:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Environment variables

Set any of these only if you want the live integrations instead of the built-in demo fallbacks:

- `NEXT_PUBLIC_APP_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `ZILLOW_API_KEY`
- `MATTERPORT_API_KEY`
- `CERTIFICATION_API_KEY`
- `AFFINDA_API_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `REDIS_URL`
