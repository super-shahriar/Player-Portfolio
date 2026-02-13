"""
CRUD operations for Athlete entity (Repository Layer).
Handles all database interactions for athletes using async Motor driver.
"""

from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument
import logging

from app.models.athlete import AthleteModel, PerformanceStats
from app.schemas.athlete import AthleteCreate, AthleteUpdate

# Configure logger
logger = logging.getLogger("crud_athlete")
handler = logging.StreamHandler()
formatter = logging.Formatter("[%(asctime)s] %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
if not logger.hasHandlers():
    logger.addHandler(handler)
logger.setLevel(logging.INFO)


DatabaseType = AsyncIOMotorDatabase[Dict[str, Any]]


class CRUDAthlete:
    """Repository class for Athlete CRUD operations."""

    def __init__(self, db: DatabaseType):
        """
        Initialize CRUD with database instance.

        Args:
            db: AsyncIOMotorDatabase instance
        """
        self.collection = db["athletes"]

    async def create_athlete(self, athlete_data: AthleteCreate) -> AthleteModel:
        """
        Create a new athlete document in the database.

        Args:
            athlete_data: AthleteCreate schema with athlete information

        Returns:
            AthleteModel: Created athlete with generated ID
        """
        logger.info(
            f"🟢 CREATE ATHLETE: Starting for {athlete_data.first_name} {athlete_data.last_name}"
        )
        try:
            # Prepare document
            athlete_dict: Dict[str, Any] = athlete_data.model_dump(exclude_unset=True)
            athlete_dict["created_at"] = datetime.now(timezone.utc)
            athlete_dict["updated_at"] = datetime.now(timezone.utc)
            athlete_dict["performance_stats"] = {}  # Initialize empty stats
            athlete_dict["player_photo"] = athlete_dict.get(
                "player_photo", None
            )  # Add this line

            # Insert into database
            result = await self.collection.insert_one(athlete_dict)
            logger.info(f"✅ Inserted athlete with ID: {result.inserted_id}")

            # Fetch and return created document
            created_athlete = await self.collection.find_one(
                {"_id": result.inserted_id}
            )
            if not created_athlete:
                logger.error("❌ Failed to create athlete document")
                raise RuntimeError("Failed to create athlete document")
            logger.info(f"🎉 Athlete {result.inserted_id} created successfully")
            return AthleteModel(**created_athlete)
        except Exception as e:
            logger.error(f"❌ Error creating athlete: {str(e)}")
            raise

    async def get_athlete(self, athlete_id: str) -> Optional[AthleteModel]:
        """
        Fetch an athlete by ID.

        Args:
            athlete_id: String representation of ObjectId

        Returns:
            AthleteModel if found, None otherwise
        """
        logger.info(f"🟢 GET ATHLETE: Fetching athlete_id={athlete_id}")
        try:
            if not ObjectId.is_valid(athlete_id):
                logger.warning(f"⚠️ Invalid ObjectId: {athlete_id}")
                return None

            athlete_doc = await self.collection.find_one({"_id": ObjectId(athlete_id)})

            if athlete_doc:
                logger.info(f"✅ Found athlete: {athlete_id}")
                return AthleteModel(**athlete_doc)
            logger.warning(f"⚠️ Athlete not found: {athlete_id}")
            return None
        except Exception as e:
            logger.error(f"❌ Error fetching athlete {athlete_id}: {str(e)}")
            return None

    async def get_athletes(
        self,
        skip: int = 0,
        limit: int = 100,
        position: Optional[str] = None,
        is_active: Optional[bool] = None,
    ) -> List[AthleteModel]:
        """
        Fetch multiple athletes with optional filtering.

        Args:
            skip: Number of documents to skip (pagination)
            limit: Maximum number of documents to return
            position: Filter by position
            is_active: Filter by active status

        Returns:
            List of AthleteModel instances
        """
        logger.info(
            f"🟢 GET ATHLETES: skip={skip}, limit={limit}, position={position}, is_active={is_active}"
        )
        try:
            # Build query filter
            query = {}
            if position:
                query["position"] = position
            if is_active is not None:
                query["is_active"] = is_active

            logger.info(f"📋 Query filter: {query}")

            # Execute query
            cursor = self.collection.find(query).skip(skip).limit(limit)
            athletes = await cursor.to_list(length=limit)  # type: ignore

            logger.info(f"✅ Retrieved {len(athletes)} athletes")
            return [AthleteModel(**athlete) for athlete in athletes]  # type: ignore
        except Exception as e:
            logger.error(f"❌ Error fetching athletes: {str(e)}")
            return []

    async def update_athlete(
        self, athlete_id: str, athlete_update: AthleteUpdate
    ) -> Optional[AthleteModel]:
        """
        Update athlete information.

        Args:
            athlete_id: String representation of ObjectId
            athlete_update: AthleteUpdate schema with fields to update

        Returns:
            Updated AthleteModel if found, None otherwise
        """
        logger.info(f"🟢 UPDATE ATHLETE: athlete_id={athlete_id}")
        try:
            if not ObjectId.is_valid(athlete_id):
                logger.warning(f"⚠️ Invalid ObjectId for update: {athlete_id}")
                return None

            # Get only fields that were set
            update_data = athlete_update.model_dump(exclude_unset=True)

            if not update_data:
                # No fields to update, return current document
                logger.info(f"ℹ️ No fields to update for athlete {athlete_id}")
                return await self.get_athlete(athlete_id)

            logger.info(f"📝 Updating fields: {list(update_data.keys())}")

            # Add updated_at timestamp
            update_data["updated_at"] = datetime.now(timezone.utc)

            # Add this line to handle player_photo updates
            if "player_photo" in update_data:
                update_data["player_photo"] = update_data["player_photo"]

            # Update document atomically
            updated_athlete = await self.collection.find_one_and_update(
                {"_id": ObjectId(athlete_id)},
                {"$set": update_data},
                return_document=ReturnDocument.AFTER,
            )

            if updated_athlete:
                logger.info(f"✅ Athlete {athlete_id} updated successfully")
                return AthleteModel(**updated_athlete)
            logger.warning(f"⚠️ Athlete not found for update: {athlete_id}")
            return None
        except Exception as e:
            logger.error(f"❌ Error updating athlete {athlete_id}: {str(e)}")
            return None

    async def update_performance(
        self, athlete_id: str, performance_data: Dict[str, Any]
    ) -> Optional[AthleteModel]:
        """
        Atomically update only the performance stats using MongoDB's $set operator.

        Args:
            athlete_id: String representation of ObjectId
            performance_data: Dictionary with performance metrics to update

        Returns:
            Updated AthleteModel if found, None otherwise
        """
        logger.info(f"🟢 UPDATE PERFORMANCE: athlete_id={athlete_id}")
        try:
            if not ObjectId.is_valid(athlete_id):
                logger.warning(
                    f"⚠️ Invalid ObjectId for performance update: {athlete_id}"
                )
                return None

            # Validate performance data with PerformanceStats model
            try:
                perf_stats = PerformanceStats(**performance_data)
                validated_data = perf_stats.model_dump(exclude_unset=True)
                logger.info(
                    f"✅ Performance data validated: {list(validated_data.keys())}"
                )
            except Exception as e:
                logger.error(f"❌ Invalid performance data: {str(e)}")
                return None

            # Build update query with nested field notation
            update_fields = {
                f"performance_stats.{key}": value
                for key, value in validated_data.items()
            }
            update_fields["performance_stats.last_tested"] = datetime.now(timezone.utc)
            update_fields["updated_at"] = datetime.now(timezone.utc)

            logger.info(f"📊 Updating performance stats for athlete {athlete_id}")

            # Atomically update only the performance stats
            updated_athlete = await self.collection.find_one_and_update(
                {"_id": ObjectId(athlete_id)},
                {"$set": update_fields},
                return_document=ReturnDocument.AFTER,
            )

            if updated_athlete:
                logger.info(f"✅ Performance stats updated for athlete {athlete_id}")
                return AthleteModel(**updated_athlete)
            logger.warning(f"⚠️ Athlete not found for performance update: {athlete_id}")
            return None
        except Exception as e:
            logger.error(
                f"❌ Error updating performance for athlete {athlete_id}: {str(e)}"
            )
            return None

    async def delete_athlete(self, athlete_id: str) -> bool:
        """
        Delete an athlete from the database.

        Args:
            athlete_id: String representation of ObjectId

        Returns:
            True if deleted, False otherwise
        """
        logger.info(f"🟢 DELETE ATHLETE: athlete_id={athlete_id}")
        try:
            if not ObjectId.is_valid(athlete_id):
                logger.warning(f"⚠️ Invalid ObjectId for deletion: {athlete_id}")
                return False

            result = await self.collection.delete_one({"_id": ObjectId(athlete_id)})
            if result.deleted_count > 0:
                logger.info(f"✅ Athlete {athlete_id} deleted successfully")
                return True
            logger.warning(f"⚠️ No athlete found to delete: {athlete_id}")
            return False
        except Exception as e:
            logger.error(f"❌ Error deleting athlete {athlete_id}: {str(e)}")
            return False

    async def count_athletes(self, is_active: Optional[bool] = None) -> int:
        """
        Count total number of athletes.

        Args:
            is_active: Filter by active status

        Returns:
            Total count of athletes
        """
        logger.info(f"🟢 COUNT ATHLETES: is_active={is_active}")
        try:
            query = {}
            if is_active is not None:
                query["is_active"] = is_active

            count = await self.collection.count_documents(query)  # type: ignore
            logger.info(f"✅ Total athletes count: {count}")
            return count
        except Exception as e:
            logger.error(f"❌ Error counting athletes: {str(e)}")
            return 0


def get_athlete_crud(db: DatabaseType) -> CRUDAthlete:
    """
    Dependency function to get CRUDAthlete instance.

    Args:
        db: Database instance

    Returns:
        CRUDAthlete instance
    """
    return CRUDAthlete(db)
