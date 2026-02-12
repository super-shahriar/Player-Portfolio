# Example migration script
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["volleyball_portfolio"]
athletes_collection = db["athletes"]

# Add player_photo field to all documents
athletes_collection.update_many({}, {"$set": {"player_photo": None}})