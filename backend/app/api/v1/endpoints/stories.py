"""
FastAPI route endpoints for Story/Highlight management.
Handles story uploads, highlights, and story retrieval.
"""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List, Optional
from datetime import datetime, timedelta

from app.db.mongodb import get_database
from app.crud.crud_story import CRUDStory, get_story_crud
from pydantic import BaseModel


router = APIRouter(prefix="/stories", tags=["Stories & Highlights"])


class StoryCreate(BaseModel):
    """Schema for creating a story."""
    athlete_id: str
    story_type: str = "image"
    media_url: str
    caption: Optional[str] = None
    is_highlight: bool = False
    highlight_title: Optional[str] = None


class StoryResponse(BaseModel):
    """Schema for story response."""
    id: str
    athlete_id: str
    story_type: str
    media_url: str
    thumbnail_url: Optional[str] = None
    caption: Optional[str] = None
    is_highlight: bool
    highlight_title: Optional[str] = None
    likes: List[str]
    claps: List[str]
    view_count: int
    is_active: bool
    expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


@router.post(
    "/upload-story",
    response_model=StoryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a new story",
    description="Upload a story (image/video). Stories expire after 24 hours unless marked as highlight."
)
async def upload_story(
    story_data: StoryCreate,
    db = Depends(get_database)
) -> StoryResponse:
    """
    Upload a new story.
    
    Args:
        story_data: Story information
        db: Database dependency
        
    Returns:
        Created story
    """
    crud = get_story_crud(db)
    story = await crud.create_story(story_data.model_dump())
    return StoryResponse(**story)


@router.post(
    "/upload-highlight",
    response_model=StoryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a highlight",
    description="Upload a highlight (permanent story pinned to profile)."
)
async def upload_highlight(
    athlete_id: str = Form(...),
    highlight_title: str = Form(...),
    media_url: str = Form(...),
    story_type: str = Form("image"),
    caption: Optional[str] = Form(None),
    db = Depends(get_database)
) -> StoryResponse:
    """
    Upload a highlight (permanent story).
    
    Args:
        athlete_id: ID of athlete
        highlight_title: Title for highlight
        media_url: URL to media
        story_type: Type of content
        caption: Optional caption
        db: Database dependency
        
    Returns:
        Created highlight
    """
    crud = get_story_crud(db)
    
    story_data = {
        "athlete_id": athlete_id,
        "story_type": story_type,
        "media_url": media_url,
        "caption": caption,
        "is_highlight": True,
        "highlight_title": highlight_title
    }
    
    story = await crud.create_story(story_data)
    return StoryResponse(**story)


@router.get(
    "/athlete/{athlete_id}",
    response_model=List[StoryResponse],
    summary="Get athlete's active stories",
    description="Get all active (non-expired) stories for an athlete."
)
async def get_athlete_stories(
    athlete_id: str,
    include_expired: bool = False,
    db = Depends(get_database)
) -> List[StoryResponse]:
    """
    Get athlete's stories.
    
    Args:
        athlete_id: Athlete's ID
        include_expired: Include expired stories
        db: Database dependency
        
    Returns:
        List of stories
    """
    crud = get_story_crud(db)
    stories = await crud.get_active_stories(athlete_id, include_expired)
    return [StoryResponse(**story) for story in stories]


@router.get(
    "/highlights/{athlete_id}",
    response_model=List[StoryResponse],
    summary="Get athlete's highlights",
    description="Get all highlights (permanent stories) for an athlete."
)
async def get_athlete_highlights(
    athlete_id: str,
    db = Depends(get_database)
) -> List[StoryResponse]:
    """
    Get athlete's highlights.
    
    Args:
        athlete_id: Athlete's ID
        db: Database dependency
        
    Returns:
        List of highlights
    """
    crud = get_story_crud(db)
    highlights = await crud.get_highlights(athlete_id)
    return [StoryResponse(**story) for story in highlights]


@router.get(
    "/{story_id}",
    response_model=StoryResponse,
    summary="Get story by ID",
    description="Retrieve a specific story by its ID and increment view count."
)
async def get_story(
    story_id: str,
    db = Depends(get_database)
) -> StoryResponse:
    """
    Get story by ID and increment view count.
    
    Args:
        story_id: Story ID
        db: Database dependency
        
    Returns:
        Story details
        
    Raises:
        HTTPException: 404 if not found
    """
    crud = get_story_crud(db)
    story = await crud.get_story(story_id, increment_view=True)
    
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Story with ID {story_id} not found"
        )
    
    return StoryResponse(**story)


@router.delete(
    "/{story_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete story",
    description="Delete a story or highlight."
)
async def delete_story(
    story_id: str,
    db = Depends(get_database)
) -> None:
    """
    Delete a story.
    
    Args:
        story_id: Story ID
        db: Database dependency
        
    Raises:
        HTTPException: 404 if not found
    """
    crud = get_story_crud(db)
    deleted = await crud.delete_story(story_id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Story with ID {story_id} not found"
        )
