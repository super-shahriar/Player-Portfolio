"""
CRUD operations for Performance Stats entity (Repository Layer).
Handles database interactions for athlete statistics using async Motor driver.
"""
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument

from app.schemas.stats import StatsCreate, StatsUpdate, StatsResponse, StatsWithCalculations


DatabaseType = AsyncIOMotorDatabase[Dict[str, Any]]
StatsDocument = Dict[str, Any]


class CRUDStats:
    """Repository class for Stats CRUD operations."""
    
    def __init__(self, db: DatabaseType):
        """
        Initialize CRUD with database instance.
        
        Args:
            db: AsyncIOMotorDatabase instance
        """
        self.collection = db["stats"]
    
    async def create_stats(self, stats_data: StatsCreate) -> StatsDocument:
        """
        Create a new stats document in the database.
        
        Args:
            stats_data: StatsCreate schema with statistics information
            
        Returns:
            Created stats document with generated ID
        """
        # Verify athlete exists
        athlete_id = stats_data.athlete_id
        if not ObjectId.is_valid(athlete_id):
            raise ValueError("Invalid athlete ID")
        
        # Prepare document
        stats_dict: StatsDocument = stats_data.model_dump(exclude_unset=True)
        stats_dict["created_at"] = datetime.now(timezone.utc)
        stats_dict["updated_at"] = datetime.now(timezone.utc)
        
        # Insert into database
        result = await self.collection.insert_one(stats_dict)
        
        # Fetch and return created document
        created_stats = await self.collection.find_one({"_id": result.inserted_id})
        if not created_stats:
            raise RuntimeError("Failed to create stats document")
        created_stats["id"] = str(created_stats.pop("_id"))
        
        return self._add_calculated_fields(created_stats)
    
    async def get_stats(self, stats_id: str) -> Optional[StatsDocument]:
        """
        Fetch stats by ID.
        
        Args:
            stats_id: String representation of ObjectId
            
        Returns:
            Stats document if found, None otherwise
        """
        if not ObjectId.is_valid(stats_id):
            return None
        
        stats_doc = await self.collection.find_one({"_id": ObjectId(stats_id)})
        
        if stats_doc:
            stats_doc["id"] = str(stats_doc.pop("_id"))
            return self._add_calculated_fields(stats_doc)
        return None
    
    async def get_stats_by_athlete(
        self,
        athlete_id: str,
        season: Optional[str] = None
    ) -> List[StatsDocument]:
        """
        Fetch all stats for a specific athlete.
        
        Args:
            athlete_id: String representation of athlete ObjectId
            season: Optional season filter
            
        Returns:
            List of stats documents
        """
        query = {"athlete_id": athlete_id}
        if season:
            query["season"] = season
        
        cursor = self.collection.find(query).sort("created_at", -1)
        stats_list = await cursor.to_list(length=100)
        
        result: List[StatsDocument] = []
        for stats in stats_list:
            stats["id"] = str(stats.pop("_id"))
            result.append(self._add_calculated_fields(stats))
        
        return result
    
    async def update_stats(
        self,
        stats_id: str,
        stats_update: StatsUpdate
    ) -> Optional[StatsDocument]:
        """
        Update statistics information.
        
        Args:
            stats_id: String representation of ObjectId
            stats_update: StatsUpdate schema with fields to update
            
        Returns:
            Updated stats document if found, None otherwise
        """
        if not ObjectId.is_valid(stats_id):
            return None
        
        # Get only fields that were set
        update_data = stats_update.model_dump(exclude_unset=True)
        
        if not update_data:
            return await self.get_stats(stats_id)
        
        # Add updated_at timestamp
        update_data["updated_at"] = datetime.now(timezone.utc)
        
        # Update document atomically
        updated_stats = await self.collection.find_one_and_update(
            {"_id": ObjectId(stats_id)},
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        
        if updated_stats:
            updated_stats["id"] = str(updated_stats.pop("_id"))
            return self._add_calculated_fields(updated_stats)
        return None
    
    async def delete_stats(self, stats_id: str) -> bool:
        """
        Delete stats from the database.
        
        Args:
            stats_id: String representation of ObjectId
            
        Returns:
            True if deleted, False otherwise
        """
        if not ObjectId.is_valid(stats_id):
            return False
        
        result = await self.collection.delete_one({"_id": ObjectId(stats_id)})
        return result.deleted_count > 0
    
    def _add_calculated_fields(self, stats_doc: StatsDocument) -> StatsDocument:
        """
        Add calculated percentage fields to stats document.
        
        Args:
            stats_doc: Raw stats document
            
        Returns:
            Stats document with calculated fields
        """
        # Calculate attack percentage
        if stats_doc.get("total_attacks", 0) > 0:
            stats_doc["attack_percentage"] = StatsWithCalculations.calculate_attack_percentage(
                stats_doc.get("successful_attacks", 0),
                stats_doc.get("attack_errors", 0),
                stats_doc["total_attacks"]
            )
        else:
            stats_doc["attack_percentage"] = None
        
        # Calculate serve percentage
        if stats_doc.get("total_serves", 0) > 0:
            stats_doc["serve_percentage"] = StatsWithCalculations.calculate_serve_percentage(
                stats_doc.get("aces", 0),
                stats_doc.get("service_errors", 0),
                stats_doc["total_serves"]
            )
        else:
            stats_doc["serve_percentage"] = None
        
        # Calculate reception percentage
        total_receptions = stats_doc.get("receptions", 0) + stats_doc.get("reception_errors", 0)
        if total_receptions > 0:
            stats_doc["reception_percentage"] = StatsWithCalculations.calculate_reception_percentage(
                stats_doc.get("receptions", 0),
                stats_doc.get("reception_errors", 0)
            )
        else:
            stats_doc["reception_percentage"] = None
        
        return stats_doc


def get_stats_crud(db: DatabaseType) -> CRUDStats:
    """
    Dependency function to get CRUDStats instance.
    
    Args:
        db: Database instance
        
    Returns:
        CRUDStats instance
    """
    return CRUDStats(db)
