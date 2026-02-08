"""
CRUD operations for Athlete entity (Repository Layer).
Handles all database interactions for athletes using async Motor driver.
"""
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument

from app.models.athlete import AthleteModel, PerformanceStats
from app.schemas.athlete import AthleteCreate, AthleteUpdate


class CRUDAthlete:
    """Repository class for Athlete CRUD operations."""
    
    def __init__(self, db: AsyncIOMotorDatabase):
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
        # Prepare document
        athlete_dict = athlete_data.model_dump(exclude_unset=True)
        athlete_dict["created_at"] = datetime.utcnow()
        athlete_dict["updated_at"] = datetime.utcnow()
        athlete_dict["performance_stats"] = {}  # Initialize empty stats
        
        # Insert into database
        result = await self.collection.insert_one(athlete_dict)
        
        # Fetch and return created document
        created_athlete = await self.collection.find_one({"_id": result.inserted_id})
        return AthleteModel(**created_athlete)
    
    async def get_athlete(self, athlete_id: str) -> Optional[AthleteModel]:
        """
        Fetch an athlete by ID.
        
        Args:
            athlete_id: String representation of ObjectId
            
        Returns:
            AthleteModel if found, None otherwise
        """
        if not ObjectId.is_valid(athlete_id):
            return None
        
        athlete_doc = await self.collection.find_one({"_id": ObjectId(athlete_id)})
        
        if athlete_doc:
            return AthleteModel(**athlete_doc)
        return None
    
    async def get_athletes(
        self, 
        skip: int = 0, 
        limit: int = 100,
        position: Optional[str] = None,
        is_active: Optional[bool] = None
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
        # Build query filter
        query = {}
        if position:
            query["position"] = position
        if is_active is not None:
            query["is_active"] = is_active
        
        # Execute query
        cursor = self.collection.find(query).skip(skip).limit(limit)
        athletes = await cursor.to_list(length=limit)
        
        return [AthleteModel(**athlete) for athlete in athletes]
    
    async def update_athlete(
        self, 
        athlete_id: str, 
        athlete_update: AthleteUpdate
    ) -> Optional[AthleteModel]:
        """
        Update athlete information.
        
        Args:
            athlete_id: String representation of ObjectId
            athlete_update: AthleteUpdate schema with fields to update
            
        Returns:
            Updated AthleteModel if found, None otherwise
        """
        if not ObjectId.is_valid(athlete_id):
            return None
        
        # Get only fields that were set
        update_data = athlete_update.model_dump(exclude_unset=True)
        
        if not update_data:
            # No fields to update, return current document
            return await self.get_athlete(athlete_id)
        
        # Add updated_at timestamp
        update_data["updated_at"] = datetime.utcnow()
        
        # Update document atomically
        updated_athlete = await self.collection.find_one_and_update(
            {"_id": ObjectId(athlete_id)},
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        
        if updated_athlete:
            return AthleteModel(**updated_athlete)
        return None
    
    async def update_performance(
        self,
        athlete_id: str,
        performance_data: dict
    ) -> Optional[AthleteModel]:
        """
        Atomically update only the performance stats using MongoDB's $set operator.
        
        Args:
            athlete_id: String representation of ObjectId
            performance_data: Dictionary with performance metrics to update
            
        Returns:
            Updated AthleteModel if found, None otherwise
        """
        if not ObjectId.is_valid(athlete_id):
            return None
        
        # Validate performance data with PerformanceStats model
        try:
            perf_stats = PerformanceStats(**performance_data)
            validated_data = perf_stats.model_dump(exclude_unset=True)
        except Exception:
            return None
        
        # Build update query with nested field notation
        update_fields = {
            f"performance_stats.{key}": value 
            for key, value in validated_data.items()
        }
        update_fields["performance_stats.last_tested"] = datetime.utcnow()
        update_fields["updated_at"] = datetime.utcnow()
        
        # Atomically update only the performance stats
        updated_athlete = await self.collection.find_one_and_update(
            {"_id": ObjectId(athlete_id)},
            {"$set": update_fields},
            return_document=ReturnDocument.AFTER
        )
        
        if updated_athlete:
            return AthleteModel(**updated_athlete)
        return None
    
    async def delete_athlete(self, athlete_id: str) -> bool:
        """
        Delete an athlete from the database.
        
        Args:
            athlete_id: String representation of ObjectId
            
        Returns:
            True if deleted, False otherwise
        """
        if not ObjectId.is_valid(athlete_id):
            return False
        
        result = await self.collection.delete_one({"_id": ObjectId(athlete_id)})
        return result.deleted_count > 0
    
    async def count_athletes(self, is_active: Optional[bool] = None) -> int:
        """
        Count total number of athletes.
        
        Args:
            is_active: Filter by active status
            
        Returns:
            Total count of athletes
        """
        query = {}
        if is_active is not None:
            query["is_active"] = is_active
        
        return await self.collection.count_documents(query)


def get_athlete_crud(db: AsyncIOMotorDatabase) -> CRUDAthlete:
    """
    Dependency function to get CRUDAthlete instance.
    
    Args:
        db: Database instance
        
    Returns:
        CRUDAthlete instance
    """
    return CRUDAthlete(db)
