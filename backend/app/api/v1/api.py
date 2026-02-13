"""
API v1 router aggregation.
Combines all endpoint routers for version 1 of the API.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import athletes, stats, stories, actions

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(athletes.router)
api_router.include_router(stats.router)
api_router.include_router(stories.router)
api_router.include_router(actions.router)
