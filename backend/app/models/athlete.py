"""
MongoDB document model for Athlete entity.
Represents the internal BSON structure stored in the database.
"""
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime, timezone
from enum import Enum
from app.models.py_object_id import PydanticObjectId
from bson import ObjectId


class PositionEnum(str, Enum):
    """Volleyball positions."""
    SETTER = "Setter"
    OUTSIDE_HITTER = "Outside Hitter"
    MIDDLE_BLOCKER = "Middle Blocker"
    OPPOSITE = "Opposite"
    LIBERO = "Libero"
    DEFENSIVE_SPECIALIST = "Defensive Specialist"


class PerformanceStats(BaseModel):
    """Nested performance statistics for an athlete."""
    # Physical metrics
    vertical_jump_cm: Optional[float] = Field(None, ge=0, description="Vertical jump in cm")
    approach_jump_cm: Optional[float] = Field(None, ge=0, description="Approach jump in cm")
    block_jump_cm: Optional[float] = Field(None, ge=0, description="Block jump in cm")
    
    # Power metrics
    spike_power_kmh: Optional[float] = Field(None, ge=0, description="Spike power in km/h")
    serve_power_kmh: Optional[float] = Field(None, ge=0, description="Serve power in km/h")
    
    # Speed and agility
    sprint_20m_seconds: Optional[float] = Field(None, ge=0, description="20m sprint time")
    agility_test_seconds: Optional[float] = Field(None, ge=0, description="Agility test time")
    
    # Endurance
    vo2_max: Optional[float] = Field(None, ge=0, description="VO2 max ml/kg/min")
    
    # Technical skills (rated 1-10)
    passing_rating: Optional[int] = Field(None, ge=1, le=10, description="Passing skill 1-10")
    setting_rating: Optional[int] = Field(None, ge=1, le=10, description="Setting skill 1-10")
    hitting_rating: Optional[int] = Field(None, ge=1, le=10, description="Hitting skill 1-10")
    blocking_rating: Optional[int] = Field(None, ge=1, le=10, description="Blocking skill 1-10")
    serving_rating: Optional[int] = Field(None, ge=1, le=10, description="Serving skill 1-10")
    defense_rating: Optional[int] = Field(None, ge=1, le=10, description="Defense skill 1-10")
    
    # Dates for tracking
    last_tested: Optional[datetime] = Field(None, description="Date of last performance test")
    
    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "vertical_jump_cm": 85.5,
                "approach_jump_cm": 95.0,
                "spike_power_kmh": 110.5,
                "passing_rating": 8,
                "hitting_rating": 9
            }
        }
    )


class AthleteModel(BaseModel):
    """
    MongoDB document model for Athlete.
    Represents the internal BSON structure with _id field.
    """
    id: Optional[PydanticObjectId] = Field(default=None, alias="_id")
    
    # Personal information
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[datetime] = None
    
    # Physical attributes
    height_cm: Optional[int] = Field(None, gt=0, lt=300)
    weight_kg: Optional[float] = Field(None, gt=0, lt=300)
    
    # Volleyball info
    position: PositionEnum
    jersey_number: Optional[int] = Field(None, ge=0, le=99)
    school_team: Optional[str] = Field(None, max_length=100, description="School team name")
    college_team: Optional[str] = Field(None, max_length=100, description="College team name")
    university_team: Optional[str] = Field(None, max_length=100, description="University team name")
    current_team: Optional[str] = Field(None, max_length=100, description="Current team name (club/professional)")
    bio: Optional[str] = Field(None, max_length=1000)
    player_photo: Optional[str] = Field(None, description="URL of the player's photo")
    
    # Nested performance stats
    performance_stats: Optional[PerformanceStats] = None
    
    # Status and metadata
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "first_name": "Sarah",
                "last_name": "Johnson",
                "email": "sarah.johnson@example.com",
                "position": "Outside Hitter",
                "height_cm": 185,
                "jersey_number": 12,
                "performance_stats": {
                    "vertical_jump_cm": 85.5,
                    "spike_power_kmh": 110.5,
                    "hitting_rating": 9
                }
            }
        }
    )
