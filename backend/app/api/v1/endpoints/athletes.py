"""
FastAPI route endpoints for Athlete management (Controller Layer).
Handles HTTP requests and delegates business logic to CRUD layer.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Any, Dict, List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.mongodb import get_database
from app.crud.crud_athlete import CRUDAthlete, get_athlete_crud
from app.schemas.athlete import AthleteCreate, AthleteUpdate, AthleteResponse
from app.models.athlete import PerformanceStats
import logging

logger = logging.getLogger("athletes")
handler = logging.StreamHandler()
formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

router = APIRouter(prefix="/athletes", tags=["Athletes"])

DatabaseType = AsyncIOMotorDatabase[Dict[str, Any]]


def _ensure_db(db: Optional[DatabaseType]) -> DatabaseType:
    """Ensure the MongoDB dependency is available."""
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection is not available"
        )
    return db


@router.post(
    "/",
    response_model=AthleteResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new athlete",
    description="Create a new athlete profile with basic information. Performance stats are initialized empty."
)
async def create_athlete(
    athlete_data: AthleteCreate,
    db: Optional[DatabaseType] = Depends(get_database)
) -> AthleteResponse:
    logger.info("POST /athletes called")
    """
    Create a new athlete.
    
    Args:
        athlete_data: Athlete information from request body
        db: Database dependency
        
    Returns:
        Created athlete with generated ID
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    athlete = await crud.create_athlete(athlete_data)
    
    # Convert to response model
    return AthleteResponse(
        id=str(athlete.id),
        **athlete.model_dump(exclude={"id"})
    )


@router.get(
    "/{athlete_id}",
    response_model=AthleteResponse,
    summary="Get athlete by ID",
    description="Retrieve a single athlete's profile by their unique ID."
)
async def get_athlete(
    athlete_id: str,
    db: Optional[DatabaseType] = Depends(get_database)
) -> AthleteResponse:
    logger.info(f"GET /athletes/{athlete_id} called")
    """
    Get athlete by ID.
    
    Args:
        athlete_id: Athlete's ObjectId as string
        db: Database dependency
        
    Returns:
        Athlete profile
        
    Raises:
        HTTPException: 404 if athlete not found
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    athlete = await crud.get_athlete(athlete_id)
    
    if not athlete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Athlete with ID {athlete_id} not found"
        )
    
    return AthleteResponse(
        id=str(athlete.id),
        **athlete.model_dump(exclude={"id"})
    )


@router.get(
    "/",
    response_model=List[AthleteResponse],
    summary="List all athletes",
    description="Retrieve a list of athletes with optional filtering and pagination."
)
async def list_athletes(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Maximum number of records to return"),
    position: Optional[str] = Query(None, description="Filter by position"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    db: Optional[DatabaseType] = Depends(get_database)
) -> List[AthleteResponse]:
    logger.info("GET /athletes called")
    """
    List athletes with filtering and pagination.
    
    Args:
        skip: Number of records to skip (pagination)
        limit: Maximum records to return
        position: Optional position filter
        is_active: Optional active status filter
        db: Database dependency
        
    Returns:
        List of athlete profiles
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    athletes = await crud.get_athletes(
        skip=skip,
        limit=limit,
        position=position,
        is_active=is_active
    )
    
    return [
        AthleteResponse(
            id=str(athlete.id),
            **athlete.model_dump(exclude={"id"})
        )
        for athlete in athletes
    ]


@router.patch(
    "/{athlete_id}",
    response_model=AthleteResponse,
    summary="Update athlete information",
    description="Update an athlete's basic information. Use the performance endpoint to update stats."
)
async def update_athlete(
    athlete_id: str,
    athlete_update: AthleteUpdate,
    db: Optional[DatabaseType] = Depends(get_database)
) -> AthleteResponse:
    """
    Update athlete information.
    
    Args:
        athlete_id: Athlete's ObjectId as string
        athlete_update: Fields to update
        db: Database dependency
        
    Returns:
        Updated athlete profile
        
    Raises:
        HTTPException: 404 if athlete not found
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    athlete = await crud.update_athlete(athlete_id, athlete_update)
    
    if not athlete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Athlete with ID {athlete_id} not found"
        )
    
    return AthleteResponse(
        id=str(athlete.id),
        **athlete.model_dump(exclude={"id"})
    )


@router.patch(
    "/{athlete_id}/performance",
    response_model=AthleteResponse,
    summary="Update athlete performance stats",
    description="Atomically update only the performance statistics (jump, power, speed, ratings) using MongoDB's $set operator."
)
async def update_performance_stats(
    athlete_id: str,
    performance_data: PerformanceStats,
    db: Optional[DatabaseType] = Depends(get_database)
) -> AthleteResponse:
    """
    Update athlete's performance statistics.
    
    This endpoint uses MongoDB's atomic $set operator to update only the
    performance_stats nested document without affecting other athlete data.
    
    Args:
        athlete_id: Athlete's ObjectId as string
        performance_data: Performance metrics to update
        db: Database dependency
        
    Returns:
        Updated athlete profile with new performance stats
        
    Raises:
        HTTPException: 404 if athlete not found, 400 if invalid data
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    
    # Convert to dict for atomic update
    perf_dict: Dict[str, Any] = performance_data.model_dump(exclude_unset=True)
    
    athlete = await crud.update_performance(athlete_id, perf_dict)
    
    if not athlete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Athlete with ID {athlete_id} not found or invalid data"
        )
    
    return AthleteResponse(
        id=str(athlete.id),
        **athlete.model_dump(exclude={"id"})
    )


@router.delete(
    "/{athlete_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete athlete",
    description="Permanently delete an athlete profile from the database."
)
async def delete_athlete(
    athlete_id: str,
    db: Optional[DatabaseType] = Depends(get_database)
) -> None:
    """
    Delete an athlete.
    
    Args:
        athlete_id: Athlete's ObjectId as string
        db: Database dependency
        
    Raises:
        HTTPException: 404 if athlete not found
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    deleted = await crud.delete_athlete(athlete_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Athlete with ID {athlete_id} not found"
        )


@router.get(
    "/count/total",
    response_model=Dict[str, int],
    summary="Count athletes",
    description="Get the total count of athletes, optionally filtered by active status."
)
async def count_athletes(
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    db: Optional[DatabaseType] = Depends(get_database)
) -> Dict[str, int]:
    """
    Count total athletes.
    
    Args:
        is_active: Optional active status filter
        db: Database dependency
        
    Returns:
        Dictionary with count
    """
    database = _ensure_db(db)
    crud: CRUDAthlete = get_athlete_crud(database)
    count = await crud.count_athletes(is_active=is_active)
    
    result: Dict[str, int] = {"count": count}
    return result
