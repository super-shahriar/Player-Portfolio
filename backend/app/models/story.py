"""
MongoDB document model for Story/Highlight entity.
Represents stories, highlights, and social interactions (likes, claps).
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
from app.models.py_object_id import PydanticObjectId


class StoryType(str, Enum):
    """Type of story content."""

    IMAGE = "image"
    VIDEO = "video"
    TEXT = "text"
    HIGHLIGHT = "highlight"


class Reaction(BaseModel):
    """User reaction to a story."""

    user_id: str = Field(..., description="ID of user who reacted")
    reaction_type: str = Field(..., description="Type: 'like', 'clap', 'fire', etc.")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(populate_by_name=True)


class StoryModel(BaseModel):
    """
    MongoDB document model for Story/Highlight.
    Stores media content, interactions, and metadata.
    """

    id: Optional[PydanticObjectId] = Field(default=None, alias="_id")

    # Ownership
    athlete_id: str = Field(..., description="Reference to athlete who posted")

    # Content
    story_type: StoryType = Field(default=StoryType.IMAGE)
    media_url: str = Field(..., description="URL to media (Cloudinary, S3, etc.)")
    thumbnail_url: Optional[str] = Field(None, description="Thumbnail for videos")
    caption: Optional[str] = Field(None, max_length=500)

    # Highlight metadata
    is_highlight: bool = Field(default=False, description="Pinned to profile")
    highlight_title: Optional[str] = Field(None, max_length=100)

    # Engagement
    likes: List[str] = Field(
        default_factory=list, description="List of user IDs who liked"
    )
    claps: List[str] = Field(
        default_factory=list, description="List of user IDs who clapped"
    )
    reactions: List[Reaction] = Field(default_factory=list)
    view_count: int = Field(default=0, ge=0)

    # Visibility
    is_active: bool = Field(
        default=True, description="Stories expire, highlights don't"
    )
    expires_at: Optional[datetime] = Field(
        None, description="Story expiration (24 hours)"
    )

    # Metadata
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )  # pyright: ignore[reportDeprecated]
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "athlete_id": "507f1f77bcf86cd799439012",
                "story_type": "image",
                "media_url": "https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg",
                "caption": "Great practice session today! 🏐",
                "is_highlight": False,
                "likes": ["user1_id", "user2_id"],
                "claps": ["user3_id"],
                "view_count": 125,
                "is_active": True,
            }
        },
    )
