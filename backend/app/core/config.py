"""
Application configuration settings.
"""

import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from motor.motor_asyncio import AsyncIOMotorClient


class Settings(BaseSettings):
    """Application settings with environment variables support."""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )

    # Application
    APP_NAME: str = "Volleyball Portfolio API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # MongoDB
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = "volleyball_portfolio"

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
        "http://192.168.1.108:3000",
        "http://192.168.1.108:8000",
    ]


settings = Settings()


async def connect_to_mongo():
    """Initialize MongoDB connection on app startup"""
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)  # type: ignore # ← Uses URI from .env
    db = client[settings.MONGODB_DB_NAME]  # type: ignore # ← Uses DB name from .env
    print(f"✅ Connected to MongoDB: {settings.MONGODB_DB_NAME}")


async def close_mongo_connection():
    """Close MongoDB connection on app shutdown"""
    global client
    if client:
        client.close()
        print("❌ Disconnected from MongoDB")
