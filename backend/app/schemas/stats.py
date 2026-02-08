"""
Pydantic schemas for Performance Stats entity.
Handles request/response validation for athlete statistics.
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class StatsBase(BaseModel):
    """Base schema for performance statistics."""
    athlete_id: str = Field(..., description="Reference to athlete ID")
    season: str = Field(..., min_length=1, max_length=20, description="e.g., '2025-2026'")
    matches_played: int = Field(default=0, ge=0)
    
    # Attack stats
    total_attacks: int = Field(default=0, ge=0)
    successful_attacks: int = Field(default=0, ge=0)
    attack_errors: int = Field(default=0, ge=0)
    
    # Serve stats
    total_serves: int = Field(default=0, ge=0)
    aces: int = Field(default=0, ge=0)
    service_errors: int = Field(default=0, ge=0)
    
    # Block stats
    total_blocks: int = Field(default=0, ge=0)
    solo_blocks: int = Field(default=0, ge=0)
    block_assists: int = Field(default=0, ge=0)
    
    # Dig stats
    digs: int = Field(default=0, ge=0)
    
    # Set stats (for setters)
    assists: int = Field(default=0, ge=0)
    
    # Reception stats
    receptions: int = Field(default=0, ge=0)
    reception_errors: int = Field(default=0, ge=0)
    
    # Additional info
    notes: Optional[str] = Field(None, max_length=500)


class StatsCreate(StatsBase):
    """Schema for creating new performance stats."""
    pass


class StatsUpdate(BaseModel):
    """Schema for updating performance stats (all fields optional)."""
    season: Optional[str] = Field(None, min_length=1, max_length=20)
    matches_played: Optional[int] = Field(None, ge=0)
    
    total_attacks: Optional[int] = Field(None, ge=0)
    successful_attacks: Optional[int] = Field(None, ge=0)
    attack_errors: Optional[int] = Field(None, ge=0)
    
    total_serves: Optional[int] = Field(None, ge=0)
    aces: Optional[int] = Field(None, ge=0)
    service_errors: Optional[int] = Field(None, ge=0)
    
    total_blocks: Optional[int] = Field(None, ge=0)
    solo_blocks: Optional[int] = Field(None, ge=0)
    block_assists: Optional[int] = Field(None, ge=0)
    
    digs: Optional[int] = Field(None, ge=0)
    assists: Optional[int] = Field(None, ge=0)
    
    receptions: Optional[int] = Field(None, ge=0)
    reception_errors: Optional[int] = Field(None, ge=0)
    
    notes: Optional[str] = Field(None, max_length=500)


class StatsInDB(StatsBase):
    """Schema for stats as stored in database."""
    id: str = Field(..., alias="_id")
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(populate_by_name=True)


class StatsResponse(StatsBase):
    """Schema for stats response with calculated metrics."""
    id: str
    created_at: datetime
    updated_at: datetime
    
    # Calculated fields
    attack_percentage: Optional[float] = None
    serve_percentage: Optional[float] = None
    reception_percentage: Optional[float] = None
    
    model_config = ConfigDict(from_attributes=True)


class StatsWithCalculations(StatsResponse):
    """Extended stats response with all calculated percentages."""
    
    @staticmethod
    def calculate_attack_percentage(successful: int, errors: int, total: int) -> Optional[float]:
        """Calculate attack efficiency percentage."""
        if total == 0:
            return None
        return round((successful - errors) / total * 100, 2)
    
    @staticmethod
    def calculate_serve_percentage(aces: int, errors: int, total: int) -> Optional[float]:
        """Calculate serve efficiency percentage."""
        if total == 0:
            return None
        return round((total - errors) / total * 100, 2)
    
    @staticmethod
    def calculate_reception_percentage(receptions: int, errors: int) -> Optional[float]:
        """Calculate reception efficiency percentage."""
        total = receptions + errors
        if total == 0:
            return None
        return round((receptions / total) * 100, 2)
