"""
Custom PyObjectId type for handling MongoDB ObjectId in Pydantic models.
Converts BSON ObjectId to string for JSON serialization.
"""
from bson import ObjectId
from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from typing import Any, Annotated


class PyObjectId(ObjectId):
    """
    Custom ObjectId type that integrates with Pydantic V2.
    Handles MongoDB _id field conversion to/from string.
    """
    
    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        source_type: Any,
        handler: Any,
    ) -> core_schema.CoreSchema:
        """Define how Pydantic should validate and serialize this type."""
        return core_schema.union_schema(
            [
                # Validate as ObjectId
                core_schema.is_instance_schema(ObjectId),
                # Validate as string and convert to ObjectId
                core_schema.chain_schema(
                    [
                        core_schema.str_schema(),
                        core_schema.no_info_plain_validator_function(cls.validate),
                    ]
                ),
            ],
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x),
                info_arg=False,
                return_schema=core_schema.str_schema(),
            ),
        )
    
    @classmethod
    def validate(cls, v: Any) -> ObjectId:
        """
        Validate and convert input to ObjectId.
        
        Args:
            v: Input value (string or ObjectId)
            
        Returns:
            ObjectId instance
            
        Raises:
            ValueError: If value cannot be converted to ObjectId
        """
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise ValueError("Invalid ObjectId")
    
    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        """Define JSON schema for OpenAPI documentation."""
        return {"type": "string", "example": "507f1f77bcf86cd799439011"}


# Type alias for use in models
PydanticObjectId = Annotated[PyObjectId, ...]
