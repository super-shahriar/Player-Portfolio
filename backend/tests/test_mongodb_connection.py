from pathlib import Path
import sys
import os
import pytest

# Ensure `backend` is on sys.path so `app` package can be imported when running tests
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import MongoClient

from app.db.mongodb import connect_to_mongodb, close_mongodb_connection, mongodb as mongodb_manager


def _is_mongo_available() -> bool:
    """Check if MongoDB is reachable."""
    try:
        MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000).server_info()
        return True
    except Exception:
        return False


@pytest.fixture
async def mongo_connection():
    """Fixture to setup and teardown MongoDB connection for tests."""
    if not _is_mongo_available():
        pytest.skip("MongoDB not available at mongodb://localhost:27017")
    
    os.environ.setdefault("MONGODB_URL", "mongodb://localhost:27017")
    os.environ.setdefault("MONGODB_DB_NAME", "volleyball_portfolio_test")
    
    await connect_to_mongodb()
    yield mongodb_manager
    await close_mongodb_connection()


@pytest.mark.asyncio
async def test_connect_to_mongodb(mongo_connection):
    """Test basic MongoDB connection."""
    assert isinstance(mongo_connection.client, AsyncIOMotorClient)
    assert isinstance(mongo_connection.db, AsyncIOMotorDatabase)
    assert await mongo_connection.db.list_collection_names() is not None


@pytest.mark.asyncio
async def test_insert_and_find_document(mongo_connection):
    """Test inserting and querying a document."""
    test_collection = mongo_connection.db["test_athletes"]
    
    # Clean up before test
    await test_collection.delete_many({})

    # Insert test document
    test_doc = {
        "first_name": "Test",
        "last_name": "Athlete",
        "email": "test@example.com",
        "position": "Setter",
    }
    result = await test_collection.insert_one(test_doc)
    assert result.inserted_id is not None

    # Find the document
    found_doc = await test_collection.find_one({"first_name": "Test"})
    assert found_doc is not None
    assert found_doc["last_name"] == "Athlete"
    assert found_doc["email"] == "test@example.com"

    # Clean up
    await test_collection.delete_many({})


@pytest.mark.asyncio
async def test_update_document(mongo_connection):
    """Test updating a document."""
    test_collection = mongo_connection.db["test_athletes"]

    # Clean up before test
    await test_collection.delete_many({})

    # Insert document
    test_doc = {
        "first_name": "Update",
        "last_name": "Test",
        "email": "update@example.com",
        "position": "Outside Hitter",
    }
    result = await test_collection.insert_one(test_doc)
    doc_id = result.inserted_id

    # Update document
    await test_collection.update_one(
        {"_id": doc_id},
        {"$set": {"position": "Libero"}}
    )

    # Verify update
    updated_doc = await test_collection.find_one({"_id": doc_id})
    assert updated_doc["position"] == "Libero"

    # Clean up
    await test_collection.delete_many({})
