"""
Utility functions for handling MongoDB ObjectId and string conversions.
"""
from bson import ObjectId
from typing import Any, Optional


def string_to_objectid(id_str: str) -> Optional[ObjectId]:
    """
    Convert string to MongoDB ObjectId.
    
    Args:
        id_str: String representation of ObjectId
        
    Returns:
        ObjectId if valid, None otherwise
    """
    if not ObjectId.is_valid(id_str):
        return None
    return ObjectId(id_str)


def objectid_to_string(obj_id: ObjectId) -> str:
    """
    Convert MongoDB ObjectId to string.
    
    Args:
        obj_id: ObjectId instance
        
    Returns:
        String representation
    """
    return str(obj_id)


def convert_id_field(document: dict) -> dict:
    """
    Convert _id field from ObjectId to string in document.
    
    Args:
        document: MongoDB document with _id field
        
    Returns:
        Document with _id converted to id (string)
    """
    if document and "_id" in document:
        document["id"] = str(document.pop("_id"))
    return document


def prepare_document_for_response(document: Optional[dict]) -> Optional[dict]:
    """
    Prepare MongoDB document for API response.
    Converts _id to id string and handles None case.
    
    Args:
        document: MongoDB document or None
        
    Returns:
        Prepared document or None
    """
    if document is None:
        return None
    return convert_id_field(document)
