"""
MongoDB database connection setup using Motor (async driver).

Theory:
Motor is an asynchronous Python driver for MongoDB, built to integrate seamlessly with async frameworks like
FastAPI and asyncio. Unlike synchronous drivers (like PyMongo), Motor enables non-blocking database operations,
allowing your FastAPI app to handle many requests concurrently without waiting for database responses.
This is ideal for high-performance APIs and real-time applications.

This module defines:
- A MongoDB connection manager class for handling the client and database instance.
- Async functions to connect and disconnect from MongoDB, called on FastAPI startup/shutdown.
- A dependency function to provide the database instance to routes and CRUD logic.
- Logging for connection events.

Usage:
On FastAPI startup, `connect_to_mongodb()` is called to establish the async connection. On shutdown, `close_mongodb_connection()` safely closes it. The `get_database()` function is used as a dependency to inject the database instance into endpoints and repository classes.
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
from typing import Optional, Dict, Any
import logging  #######################################################################################


class MongoDB:
    """
    MongoDB connection manager.
    Holds the Motor async client and database instance.
    Used for managing the application's MongoDB connection lifecycle.
    """

    client: Optional[AsyncIOMotorClient[Dict[str, Any]]] = None
    db: Optional[AsyncIOMotorDatabase[Dict[str, Any]]] = None


mongodb = MongoDB()

# Logger setup
logger = logging.getLogger("mongodb")
handler = logging.StreamHandler()
formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)


async def connect_to_mongodb() -> None:
    """
    Establish an async connection to MongoDB using Motor.
    Called automatically on FastAPI startup.
    Sets up the client and database instance for use throughout the app.
    Logs connection status.
    """
    import ssl

    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = True
    ssl_context.verify_mode = ssl.CERT_REQUIRED

    mongodb.client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        tlsCAFile=None,
        serverSelectionTimeoutMS=5000,
    )
    mongodb.db = mongodb.client[settings.MONGODB_DB_NAME]
    logger.info(f"Connected to MongoDB: {settings.MONGODB_DB_NAME}")


async def close_mongodb_connection() -> None:
    """
    Close the MongoDB async connection.
    Called automatically on FastAPI shutdown.
    Safely closes the client and logs the event.
    """
    if mongodb.client:
        mongodb.client.close()
        logger.info("Closed MongoDB connection")


def get_database() -> Optional[AsyncIOMotorDatabase[Dict[str, Any]]]:
    """
    Dependency function for FastAPI routes and repository classes.
    Returns the Motor async database instance, or None if not connected.
    Use as a dependency injection for database access in endpoints.
    """
    return mongodb.db
