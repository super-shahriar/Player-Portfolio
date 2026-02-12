import pytest
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.mongodb import (
    mongodb, 
    connect_to_mongodb, 
    close_mongodb_connection, 
    get_database
)

@pytest.mark.asyncio
async def test_mongodb_lifecycle():
    """
    Tests the full lifecycle: connection, usage, and disconnection.
    """
    # 1. Test Initial State
    assert mongodb.client is None
    assert mongodb.db is None

    # 2. Test Connection
    await connect_to_mongodb()
    
    assert mongodb.client is not None
    assert mongodb.db is not None
    
    # Verify we can actually ping the database
    # This ensures the MONGODB_URL in settings is correct
    ping_result = await mongodb.db.command("ping") # type: ignore
    assert ping_result["ok"] == 1.0

    # 3. Test Dependency Injection Function
    db_instance = get_database()
    assert isinstance(db_instance, AsyncIOMotorDatabase)
    assert db_instance.name is not None

    # 4. Test Disconnection
    await close_mongodb_connection()
    # Note: Motor client.close() is synchronous internally, 
    # but we call our async wrapper.
    
    # In Motor, closing the client doesn't nullify the object, 
    # it just shuts down the socket pools.