import logging
import pytest
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.mongodb import ( ## importing functions from app/db/mongodb.py
    connect_to_mongodb, 
    close_mongodb_connection, 
    get_database,
    mongodb
)

# Configure logger
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@pytest.mark.asyncio
async def test_mongodb_lifecycle():
    """
    Tests the full lifecycle: connection, usage, and disconnection.
    """
    logger.info("Starting MongoDB lifecycle test")
    
    # 1. Test Initial State
    logger.info("Testing initial state: client and db should be None")
    assert mongodb.client is None
    assert mongodb.db is None
    logger.info("✓ Initial state verified")

    # 2. Test Connection
    logger.info("Connecting to MongoDB...")
    await connect_to_mongodb()
    logger.info("✓ MongoDB connected successfully")
    
    assert mongodb.client is not None
    assert mongodb.db is not None
    
    # Verify we can actually ping the database
    # This ensures the MONGODB_URL in settings is correct
    logger.info("Pinging MongoDB...")
    ping_result = await mongodb.db.command("ping") # type: ignore
    assert ping_result["ok"] == 1.0
    logger.info("✓ MongoDB ping successful")

    # 3. Test Dependency Injection Function
    logger.info("Testing dependency injection get_database()")
    db_instance = get_database()
    assert isinstance(db_instance, AsyncIOMotorDatabase)
    assert db_instance.name is not None
    logger.info(f"✓ Database instance retrieved: {db_instance.name}")

    # 4. Test Disconnection
    logger.info("Disconnecting from MongoDB...")
    await close_mongodb_connection()
    logger.info("✓ MongoDB disconnected successfully")
    # Note: Motor client.close() is synchronous internally, 
    # but we call our async wrapper.
    
    # In Motor, closing the client doesn't nullify the object, 
    # it just shuts down the socket pools.