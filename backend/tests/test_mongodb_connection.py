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


@pytest.mark.asyncio
async def test_insert_and_find_document():
    """Test inserting and querying a document."""
    os.environ.setdefault("MONGODB_URL", "mongodb://localhost:27017")
    os.environ.setdefault("MONGODB_DB_NAME", "volleyball_portfolio_test")

    # Check Mongo availability
    try:
        MongoClient(os.environ["MONGODB_URL"], serverSelectionTimeoutMS=2000).server_info()
    except Exception:
        pytest.skip("MongoDB not available, skipping integration test")

    # Connect
    await connect_to_mongodb()

    try:
        test_collection = mongodb_manager.db["test_athletes"]
        
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
        assert result.inserted_id is not None, "Document should be inserted with ID"

        # Find the document
        found_doc = await test_collection.find_one({"first_name": "Test"})
        assert found_doc is not None, "Document should be found"
        assert found_doc["last_name"] == "Athlete", "Last name should match"
        assert found_doc["email"] == "test@example.com", "Email should match"

        # Clean up
        await test_collection.delete_many({})
    finally:
        # Clean up connection
        await close_mongodb_connection()


@pytest.mark.asyncio
async def test_update_document():
    """Test updating a document."""
    os.environ.setdefault("MONGODB_URL", "mongodb://localhost:27017")
    os.environ.setdefault("MONGODB_DB_NAME", "volleyball_portfolio_test")

    # Check Mongo availability
    try:
        MongoClient(os.environ["MONGODB_URL"], serverSelectionTimeoutMS=2000).server_info()
    except Exception:
        pytest.skip("MongoDB not available, skipping integration test")

    # Connect
    await connect_to_mongodb()

    try:
        test_collection = mongodb_manager.db["test_athletes"]

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
        assert updated_doc["position"] == "Libero", "Position should be updated"

        # Clean up
        await test_collection.delete_many({})
    finally:
        # Clean up connection
        await close_mongodb_connection()
