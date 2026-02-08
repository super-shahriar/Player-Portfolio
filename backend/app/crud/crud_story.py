"""
CRUD operations for Story/Highlight entity (Repository Layer).
Handles database interactions for stories, highlights, and social actions.
"""
from typing import Optional, List
from datetime import datetime, timedelta
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument


class CRUDStory:
    """Repository class for Story CRUD operations."""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        """
        Initialize CRUD with database instance.
        
        Args:
            db: AsyncIOMotorDatabase instance
        """
        self.collection = db["stories"]
    
    async def create_story(self, story_data: dict) -> dict:
        """
        Create a new story or highlight.
        
        Args:
            story_data: Story information
            
        Returns:
            Created story document
        """
        # Set timestamps
        story_data["created_at"] = datetime.utcnow()
        story_data["updated_at"] = datetime.utcnow()
        
        # Initialize engagement fields
        if "likes" not in story_data:
            story_data["likes"] = []
        if "claps" not in story_data:
            story_data["claps"] = []
        if "reactions" not in story_data:
            story_data["reactions"] = []
        if "view_count" not in story_data:
            story_data["view_count"] = 0
        
        # Set expiration for regular stories (24 hours)
        if not story_data.get("is_highlight", False):
            story_data["expires_at"] = datetime.utcnow() + timedelta(hours=24)
            story_data["is_active"] = True
        else:
            # Highlights don't expire
            story_data["expires_at"] = None
            story_data["is_active"] = True
        
        # Insert
        result = await self.collection.insert_one(story_data)
        created_story = await self.collection.find_one({"_id": result.inserted_id})
        
        # Convert _id to id
        created_story["id"] = str(created_story.pop("_id"))
        return created_story
    
    async def get_story(self, story_id: str, increment_view: bool = False) -> Optional[dict]:
        """
        Get a story by ID.
        
        Args:
            story_id: Story ObjectId as string
            increment_view: Whether to increment view count
            
        Returns:
            Story document or None
        """
        if not ObjectId.is_valid(story_id):
            return None
        
        if increment_view:
            # Atomically increment view count
            story = await self.collection.find_one_and_update(
                {"_id": ObjectId(story_id)},
                {"$inc": {"view_count": 1}},
                return_document=ReturnDocument.AFTER
            )
        else:
            story = await self.collection.find_one({"_id": ObjectId(story_id)})
        
        if story:
            story["id"] = str(story.pop("_id"))
            return story
        return None
    
    async def get_active_stories(
        self,
        athlete_id: str,
        include_expired: bool = False
    ) -> List[dict]:
        """
        Get all active stories for an athlete.
        
        Args:
            athlete_id: Athlete's ID
            include_expired: Include expired stories
            
        Returns:
            List of story documents
        """
        query = {
            "athlete_id": athlete_id,
            "is_highlight": False
        }
        
        if not include_expired:
            query["$or"] = [
                {"expires_at": {"$gt": datetime.utcnow()}},
                {"expires_at": None}
            ]
        
        cursor = self.collection.find(query).sort("created_at", -1)
        stories = await cursor.to_list(length=100)
        
        # Convert _id to id
        for story in stories:
            story["id"] = str(story.pop("_id"))
        
        return stories
    
    async def get_highlights(self, athlete_id: str) -> List[dict]:
        """
        Get all highlights for an athlete.
        
        Args:
            athlete_id: Athlete's ID
            
        Returns:
            List of highlight documents
        """
        query = {
            "athlete_id": athlete_id,
            "is_highlight": True
        }
        
        cursor = self.collection.find(query).sort("created_at", -1)
        highlights = await cursor.to_list(length=100)
        
        # Convert _id to id
        for highlight in highlights:
            highlight["id"] = str(highlight.pop("_id"))
        
        return highlights
    
    async def add_like(self, story_id: str, user_id: str) -> bool:
        """
        Add a like to a story.
        
        Args:
            story_id: Story ID
            user_id: User ID
            
        Returns:
            True if successful
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(story_id)},
            {
                "$addToSet": {"likes": user_id},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return result.modified_count > 0 or result.matched_count > 0
    
    async def remove_like(self, story_id: str, user_id: str) -> bool:
        """
        Remove a like from a story.
        
        Args:
            story_id: Story ID
            user_id: User ID
            
        Returns:
            True if successful
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(story_id)},
            {
                "$pull": {"likes": user_id},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return result.modified_count > 0 or result.matched_count > 0
    
    async def add_clap(self, story_id: str, user_id: str) -> bool:
        """
        Add a clap to a story.
        
        Args:
            story_id: Story ID
            user_id: User ID
            
        Returns:
            True if successful
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(story_id)},
            {
                "$addToSet": {"claps": user_id},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return result.modified_count > 0 or result.matched_count > 0
    
    async def remove_clap(self, story_id: str, user_id: str) -> bool:
        """
        Remove a clap from a story.
        
        Args:
            story_id: Story ID
            user_id: User ID
            
        Returns:
            True if successful
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        result = await self.collection.update_one(
            {"_id": ObjectId(story_id)},
            {
                "$pull": {"claps": user_id},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return result.modified_count > 0 or result.matched_count > 0
    
    async def add_reaction(self, story_id: str, reaction_data: dict) -> bool:
        """
        Add a reaction to a story.
        
        Args:
            story_id: Story ID
            reaction_data: Reaction information
            
        Returns:
            True if successful
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        reaction_data["created_at"] = datetime.utcnow()
        
        result = await self.collection.update_one(
            {"_id": ObjectId(story_id)},
            {
                "$push": {"reactions": reaction_data},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return result.modified_count > 0
    
    async def delete_story(self, story_id: str) -> bool:
        """
        Delete a story.
        
        Args:
            story_id: Story ID
            
        Returns:
            True if deleted
        """
        if not ObjectId.is_valid(story_id):
            return False
        
        result = await self.collection.delete_one({"_id": ObjectId(story_id)})
        return result.deleted_count > 0
    
    async def cleanup_expired_stories(self) -> int:
        """
        Remove expired stories (older than 24 hours).
        
        Returns:
            Number of stories deleted
        """
        result = await self.collection.delete_many({
            "is_highlight": False,
            "expires_at": {"$lt": datetime.utcnow()}
        })
        
        return result.deleted_count


def get_story_crud(db: AsyncIOMotorDatabase) -> CRUDStory:
    """
    Dependency function to get CRUDStory instance.
    
    Args:
        db: Database instance
        
    Returns:
        CRUDStory instance
    """
    return CRUDStory(db)
