from pathlib import Path
import sys
import os
import pytest

# Ensure `backend` is on sys.path so `app` package can be imported when running tests
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import MongoClient

from app.db.mongodb import connect_to_mongodb, close_mongodb_connection, mongodb as mongodb_manager


@pytest.mark.asyncio
async def test_connect_to_mongodb():
    # Ensure sensible defaults for CI/local testing
    os.environ.setdefault("MONGODB_URL", "mongodb://localhost:27017")
    os.environ.setdefault("MONGODB_DB_NAME", "volleyball_portfolio_test")

    # If MongoDB isn't available locally, skip the test (useful for dev environments)
    try:
        MongoClient(os.environ["MONGODB_URL"], serverSelectionTimeoutMS=2000).server_info()
    except Exception:
        pytest.skip(f"MongoDB not available at {os.environ['MONGODB_URL']}, skipping integration test")

    # Connect
    await connect_to_mongodb()

    try:
        assert isinstance(mongodb_manager.client, AsyncIOMotorClient)
        assert isinstance(mongodb_manager.db, AsyncIOMotorDatabase)

        # Basic DB operation: list collection names (should not raise)
        await mongodb_manager.db.list_collection_names()
    finally:
        # Clean up connection
        await close_mongodb_connection()
