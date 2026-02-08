"""
FastAPI route endpoints for Performance Stats management (Controller Layer).
Handles HTTP requests for athlete statistics and delegates to CRUD layer.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional

from app.db.mongodb import get_database
from app.crud.crud_stats import CRUDStats, get_stats_crud
from app.schemas.stats import StatsCreate, StatsUpdate, StatsResponse


router = APIRouter(prefix="/stats", tags=["Performance Stats"])


@router.post(
    "/",
    response_model=StatsResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create performance stats",
    description="Create a new performance statistics record for an athlete."
)
async def create_stats(
    stats_data: StatsCreate,
    db = Depends(get_database)
) -> StatsResponse:
    """
    Create new performance statistics.
    
    Args:
        stats_data: Stats information from request body
        db: Database dependency
        
    Returns:
        Created stats with calculated percentages
        
    Raises:
        HTTPException: 400 if invalid athlete ID
    """
    crud = get_stats_crud(db)
    
    try:
        stats = await crud.create_stats(stats_data)
        return StatsResponse(**stats)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/{stats_id}",
    response_model=StatsResponse,
    summary="Get stats by ID",
    description="Retrieve specific performance statistics by their unique ID."
)
async def get_stats(
    stats_id: str,
    db = Depends(get_database)
) -> StatsResponse:
    """
    Get stats by ID.
    
    Args:
        stats_id: Stats ObjectId as string
        db: Database dependency
        
    Returns:
        Stats with calculated percentages
        
    Raises:
        HTTPException: 404 if stats not found
    """
    crud = get_stats_crud(db)
    stats = await crud.get_stats(stats_id)
    
    if not stats:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Stats with ID {stats_id} not found"
        )
    
    return StatsResponse(**stats)


@router.get(
    "/athlete/{athlete_id}",
    response_model=List[StatsResponse],
    summary="Get all stats for an athlete",
    description="Retrieve all performance statistics for a specific athlete, optionally filtered by season."
)
async def get_athlete_stats(
    athlete_id: str,
    season: Optional[str] = Query(None, description="Filter by season (e.g., '2025-2026')"),
    db = Depends(get_database)
) -> List[StatsResponse]:
    """
    Get all stats for a specific athlete.
    
    Args:
        athlete_id: Athlete's ObjectId as string
        season: Optional season filter
        db: Database dependency
        
    Returns:
        List of stats with calculated percentages
    """
    crud = get_stats_crud(db)
    stats_list = await crud.get_stats_by_athlete(athlete_id, season)
    
    return [StatsResponse(**stats) for stats in stats_list]


@router.patch(
    "/{stats_id}",
    response_model=StatsResponse,
    summary="Update performance stats",
    description="Update specific fields in a performance statistics record."
)
async def update_stats(
    stats_id: str,
    stats_update: StatsUpdate,
    db = Depends(get_database)
) -> StatsResponse:
    """
    Update performance statistics.
    
    Args:
        stats_id: Stats ObjectId as string
        stats_update: Fields to update
        db: Database dependency
        
    Returns:
        Updated stats with recalculated percentages
        
    Raises:
        HTTPException: 404 if stats not found
    """
    crud = get_stats_crud(db)
    stats = await crud.update_stats(stats_id, stats_update)
    
    if not stats:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Stats with ID {stats_id} not found"
        )
    
    return StatsResponse(**stats)


@router.delete(
    "/{stats_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete stats",
    description="Permanently delete a performance statistics record."
)
async def delete_stats(
    stats_id: str,
    db = Depends(get_database)
) -> None:
    """
    Delete performance statistics.
    
    Args:
        stats_id: Stats ObjectId as string
        db: Database dependency
        
    Raises:
        HTTPException: 404 if stats not found
    """
    crud = get_stats_crud(db)
    deleted = await crud.delete_stats(stats_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Stats with ID {stats_id} not found"
        )
