"""
Application configuration settings.
"""
from pydantic_settings import BaseSettings
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

class Settings(BaseSettings):
    """Application settings with environment variables support."""
    
    # Application
    APP_NAME: str = "Volleyball Portfolio API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "volleyball_portfolio"
    
    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

async def connect_to_mongo():
    """Initialize MongoDB connection on app startup"""
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URL)  # ← Uses URI from .env
    db = client[settings.MONGODB_DB_NAME]  # ← Uses DB name from .env
    print(f"✅ Connected to MongoDB: {settings.MONGODB_DB_NAME}")

async def close_mongo_connection():
    """Close MongoDB connection on app shutdown"""
    global client
    if client:
        client.close()
        print("❌ Disconnected from MongoDB")
