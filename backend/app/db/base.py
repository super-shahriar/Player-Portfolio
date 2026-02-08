"""
Utility functions for handling MongoDB ObjectId and string conversions.
"""

import logging
from bson import ObjectId
from typing import Any, Optional

# Configure logger for this module
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
handler.setFormatter(formatter)
if not logger.hasHandlers():
    logger.addHandler(handler)


def string_to_objectid(id_str: str) -> Optional[ObjectId]:
    """
    Convert string to MongoDB ObjectId.
    
    Args:
        id_str: String representation of ObjectId
        
    Returns:
        ObjectId if valid, None otherwise
    """
    if not ObjectId.is_valid(id_str):
        logger.warning(f"Invalid ObjectId string: {id_str}")
        return None
    logger.info(f"Converted string to ObjectId: {id_str}")
    return ObjectId(id_str)


def objectid_to_string(obj_id: ObjectId) -> str:
    """
    Convert MongoDB ObjectId to string.
    
    Args:
        obj_id: ObjectId instance
        
    Returns:
        String representation
    """
    result = str(obj_id)
    logger.info(f"Converted ObjectId to string: {result}")
    return result


def convert_id_field(document: dict[str, Any]) -> dict[str, Any]:
    """
    Convert _id field from ObjectId to string in document.
    
    Args:
        document: MongoDB document with _id field
        
    Returns:
        Document with _id converted to id (string)
    """
    if document and "_id" in document:
        old_id = document["_id"]
        document["id"] = str(document.pop("_id"))
        logger.info(f"Converted _id field to id: {old_id} -> {document['id']}")
    else:
        logger.debug("No _id field to convert in document.")
    return document


def prepare_document_for_response(document: Optional[dict[str, Any]]) -> Optional[dict[str, Any]]:
    """
    Prepare MongoDB document for API response.
    Converts _id to id string and handles None case.
    
    Args:
        document: MongoDB document or None
        
    Returns:
        Prepared document or None
    """
    if document is None:
        logger.debug("Document is None, nothing to prepare for response.")
        return None
    logger.info("Preparing document for API response.")
    return convert_id_field(document)
