from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "RENet Python Backend"
    app_env: str = "development"
    app_url: str = "http://localhost:3000"

    google_client_id: str = ""
    google_client_secret: str = ""
    linkedin_client_id: str = ""
    linkedin_client_secret: str = ""

    zillow_api_key: str = ""
    matterport_api_key: str = ""
    certification_api_key: str = ""
    affinda_api_key: str = ""
    sendgrid_api_key: str = ""
    sendgrid_from_email: str = "noreply@renet.com"
    redis_url: str = ""


settings = Settings(
    app_url=__import__("os").environ.get("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
)
