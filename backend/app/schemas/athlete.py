"""
Pydantic schemas for Athlete entity.
Handles request/response validation and serialization.
"""
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from enum import Enum


class PositionEnum(str, Enum):
    """Volleyball positions."""
    SETTER = "Setter"
    OUTSIDE_HITTER = "Outside Hitter"
    MIDDLE_BLOCKER = "Middle Blocker"
    OPPOSITE = "Opposite"
    LIBERO = "Libero"
    DEFENSIVE_SPECIALIST = "Defensive Specialist"


class AthleteBase(BaseModel):
    """Base schema for athlete with common fields."""
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[datetime] = None
    height_cm: Optional[int] = Field(None, gt=0, lt=300)
    weight_kg: Optional[float] = Field(None, gt=0, lt=300)
    position: PositionEnum
    jersey_number: Optional[int] = Field(None, ge=0, le=99)
    school_team: Optional[str] = Field(None, max_length=100, description="School team name")
    college_team: Optional[str] = Field(None, max_length=100, description="College team name")
    university_team: Optional[str] = Field(None, max_length=100, description="University team name")
    current_team: Optional[str] = Field(None, max_length=100, description="Current team name (club/professional)")
    bio: Optional[str] = Field(None, max_length=1000)
    is_active: bool = True
    player_photo: Optional[str] = Field(None, description="URL of the player's photo")


class AthleteCreate(AthleteBase):
    """Schema for creating a new athlete."""
    pass


class AthleteUpdate(BaseModel):
    """Schema for updating an athlete (all fields optional)."""
    first_name: Optional[str] = Field(None, min_length=1, max_length=50)
    last_name: Optional[str] = Field(None, min_length=1, max_length=50)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[datetime] = None
    height_cm: Optional[int] = Field(None, gt=0, lt=300)
    weight_kg: Optional[float] = Field(None, gt=0, lt=300)
    position: Optional[PositionEnum] = None
    jersey_number: Optional[int] = Field(None, ge=0, le=99)
    school_team: Optional[str] = Field(None, max_length=100, description="School team name")
    college_team: Optional[str] = Field(None, max_length=100, description="College team name")
    university_team: Optional[str] = Field(None, max_length=100, description="University team name")
    current_team: Optional[str] = Field(None, max_length=100, description="Current team name (club/professional)")
    bio: Optional[str] = Field(None, max_length=1000)
    is_active: Optional[bool] = None
    player_photo: Optional[str] = Field(None, description="URL of the player's photo")


class AthleteInDB(AthleteBase):
    """Schema for athlete as stored in database."""
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(populate_by_name=True)


class AthleteResponse(AthleteBase):
    """Schema for athlete response."""
    id: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
