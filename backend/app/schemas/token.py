"""
Pydantic schemas for authentication and JWT tokens.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional


class Token(BaseModel):
    """JWT token response."""

    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Data extracted from JWT token."""

    user_id: Optional[str] = None
    email: Optional[str] = None


class LoginRequest(BaseModel):
    """Login request schema."""

    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    """Login response with token and user info."""

    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class RegisterRequest(BaseModel):
    """User registration request."""

    email: EmailStr
    password: str
    first_name: str
    last_name: str
    confirm_password: str
