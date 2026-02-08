"""
FastAPI route endpoints for social actions (likes, claps, reactions).
Handles user interactions with stories and content.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional

from app.db.mongodb import get_database
from app.crud.crud_story import CRUDStory, get_story_crud


router = APIRouter(prefix="/actions", tags=["Social Actions"])


class LikeRequest(BaseModel):
    """Request to like a story."""
    story_id: str
    user_id: str


class ClapRequest(BaseModel):
    """Request to clap for a story."""
    story_id: str
    user_id: str


class ReactionRequest(BaseModel):
    """Request to add a reaction to a story."""
    story_id: str
    user_id: str
    reaction_type: str = "like"  # like, clap, fire, heart, etc.


class ActionResponse(BaseModel):
    """Response for action."""
    success: bool
    message: str
    total_likes: Optional[int] = None
    total_claps: Optional[int] = None
    total_reactions: Optional[int] = None


@router.post(
    "/like",
    response_model=ActionResponse,
    summary="Like a story",
    description="Add or remove a like from a story."
)
async def like_story(
    request: LikeRequest,
    db = Depends(get_database)
) -> ActionResponse:
    """
    Like or unlike a story.
    
    Args:
        request: Like request with story_id and user_id
        db: Database dependency
        
    Returns:
        Action response with updated like count
    """
    crud = get_story_crud(db)
    
    # Check if story exists
    story = await crud.get_story(request.story_id)
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Story not found"
        )
    
    # Toggle like
    likes = story.get("likes", [])
    if request.user_id in likes:
        # Unlike
        result = await crud.remove_like(request.story_id, request.user_id)
        message = "Like removed"
    else:
        # Like
        result = await crud.add_like(request.story_id, request.user_id)
        message = "Story liked"
    
    if result:
        updated_story = await crud.get_story(request.story_id)
        return ActionResponse(
            success=True,
            message=message,
            total_likes=len(updated_story.get("likes", []))
        )
    
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to update like"
    )


@router.post(
    "/clap",
    response_model=ActionResponse,
    summary="Clap for a story",
    description="Add or remove a clap from a story."
)
async def clap_story(
    request: ClapRequest,
    db = Depends(get_database)
) -> ActionResponse:
    """
    Clap or unclap a story.
    
    Args:
        request: Clap request with story_id and user_id
        db: Database dependency
        
    Returns:
        Action response with updated clap count
    """
    crud = get_story_crud(db)
    
    # Check if story exists
    story = await crud.get_story(request.story_id)
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Story not found"
        )
    
    # Toggle clap
    claps = story.get("claps", [])
    if request.user_id in claps:
        # Remove clap
        result = await crud.remove_clap(request.story_id, request.user_id)
        message = "Clap removed"
    else:
        # Add clap
        result = await crud.add_clap(request.story_id, request.user_id)
        message = "Story clapped"
    
    if result:
        updated_story = await crud.get_story(request.story_id)
        return ActionResponse(
            success=True,
            message=message,
            total_claps=len(updated_story.get("claps", []))
        )
    
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to update clap"
    )


@router.post(
    "/reaction",
    response_model=ActionResponse,
    summary="Add a reaction",
    description="Add a custom reaction (like, clap, fire, heart, etc.) to a story."
)
async def add_reaction(
    request: ReactionRequest,
    db = Depends(get_database)
) -> ActionResponse:
    """
    Add a reaction to a story.
    
    Args:
        request: Reaction request
        db: Database dependency
        
    Returns:
        Action response
    """
    crud = get_story_crud(db)
    
    # Check if story exists
    story = await crud.get_story(request.story_id)
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Story not found"
        )
    
    # Add reaction
    reaction_data = {
        "user_id": request.user_id,
        "reaction_type": request.reaction_type
    }
    
    result = await crud.add_reaction(request.story_id, reaction_data)
    
    if result:
        updated_story = await crud.get_story(request.story_id)
        return ActionResponse(
            success=True,
            message=f"Reaction '{request.reaction_type}' added",
            total_reactions=len(updated_story.get("reactions", []))
        )
    
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to add reaction"
    )


@router.delete(
    "/unlike/{story_id}/{user_id}",
    response_model=ActionResponse,
    summary="Remove like",
    description="Remove a like from a story."
)
async def unlike_story(
    story_id: str,
    user_id: str,
    db = Depends(get_database)
) -> ActionResponse:
    """
    Remove a like from a story.
    
    Args:
        story_id: Story ID
        user_id: User ID
        db: Database dependency
        
    Returns:
        Action response
    """
    crud = get_story_crud(db)
    result = await crud.remove_like(story_id, user_id)
    
    if result:
        updated_story = await crud.get_story(story_id)
        return ActionResponse(
            success=True,
            message="Like removed",
            total_likes=len(updated_story.get("likes", []))
        )
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Story not found or like not present"
    )
